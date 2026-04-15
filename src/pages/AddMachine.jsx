import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { QRCodeCanvas } from 'qrcode.react'
import { createMachine } from '../services/apiService'
import '../styles/pages.css'

function AddMachine() {
  const [formData, setFormData] = useState({
    machineName: '',
    serialNumber: '',
    manufacturerName: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [createdMachine, setCreatedMachine] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.machineName || !formData.serialNumber || !formData.manufacturerName) {
      setError('Please fill all fields')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      const payload = {
        name: formData.machineName,
        serialNumber: formData.serialNumber,
        manufacturer: formData.manufacturerName,
      }

      const response = await createMachine(payload)
      const machineId = response?.id || response?.machineId || response?.data?.id || 'Not provided'

      setCreatedMachine({
        id: machineId,
        ...response,
        serialNumber: payload.serialNumber,
      })

      setFormData({
        machineName: '',
        serialNumber: '',
        manufacturerName: '',
      })
    } catch (apiError) {
      setError(apiError.message || 'Failed to create machine')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <header className="form-header">
          <h1>Add Machine</h1>
          <Link to="/manufacturer" className="back-link">Back</Link>
        </header>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="machineName">Machine Name *</label>
            <input
              type="text"
              id="machineName"
              name="machineName"
              value={formData.machineName}
              onChange={handleChange}
              placeholder="e.g., CNC Machine 001"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="serialNumber">Serial Number *</label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              placeholder="e.g., SN-2026-0001"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="manufacturerName">Manufacturer Name *</label>
            <input
              type="text"
              id="manufacturerName"
              name="manufacturerName"
              value={formData.manufacturerName}
              onChange={handleChange}
              placeholder="e.g., TechCorp Inc."
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Add Machine'}
            </button>
            <Link to="/manufacturer" className="btn-secondary">Cancel</Link>
          </div>
        </form>

        {createdMachine && (
          <div className="creation-success">
            <h2>Machine created successfully</h2>
            <p><strong>Machine ID:</strong> {createdMachine.id}</p>
            <div className="qr-wrapper">
              <QRCodeCanvas
                value={JSON.stringify({
                  machineId: createdMachine.id,
                  serialNumber: createdMachine.serialNumber,
                })}
                size={180}
                includeMargin
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddMachine
