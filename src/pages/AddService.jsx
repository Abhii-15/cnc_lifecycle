import React, { useState } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { addService } from '../services/apiService'
import '../styles/pages.css'

function AddService() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const machineIdFromQuery = searchParams.get('machineId') || ''
  const [formData, setFormData] = useState({
    issue: '',
    actionTaken: '',
    partsReplaced: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!machineIdFromQuery) {
      setError('Machine ID is missing. Open this page from a machine details page.')
      return
    }

    if (!formData.issue || !formData.actionTaken) {
      setError('Please fill all required fields')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      await addService({
        machineId: machineIdFromQuery,
        issue: formData.issue,
        action: formData.actionTaken,
        partsReplaced: formData.partsReplaced,
        date: new Date().toISOString().split('T')[0],
      })

      setSuccessMessage('Service added successfully. Redirecting to machine details...')

      setTimeout(() => {
        navigate(`/machine/${machineIdFromQuery}?refresh=${Date.now()}`)
      }, 1000)
    } catch (apiError) {
      setError(apiError.message || 'Failed to add service')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <header className="form-header">
          <h1>Add Service Record</h1>
          <Link to={machineIdFromQuery ? `/machine/${machineIdFromQuery}` : '/factory'} className="back-link">Back</Link>
        </header>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="issue">Issue *</label>
            <input
              type="text"
              id="issue"
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              placeholder="Describe the issue"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="actionTaken">Action Taken *</label>
            <textarea
              id="actionTaken"
              name="actionTaken"
              value={formData.actionTaken}
              onChange={handleChange}
              placeholder="Describe what was done"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="partsReplaced">Parts Replaced</label>
            <input
              type="text"
              id="partsReplaced"
              name="partsReplaced"
              value={formData.partsReplaced}
              onChange={handleChange}
              placeholder="e.g., Filter, Belt, Bearing"
            />
          </div>

          {error && <p className="form-error">{error}</p>}
          {successMessage && <p className="form-success">{successMessage}</p>}

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={isSubmitting || !!successMessage}>
              {isSubmitting ? 'Submitting...' : 'Add Service'}
            </button>
            <Link to={machineIdFromQuery ? `/machine/${machineIdFromQuery}` : '/factory'} className="btn-secondary">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddService
