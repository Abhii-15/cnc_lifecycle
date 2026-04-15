import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { getMachine, getServices } from '../services/apiService'
import { getSelectedRole } from '../services/roleService'
import ServiceList from '../components/ServiceList'
import '../styles/pages.css'

function MachineDetails() {
  const { id } = useParams()
  const location = useLocation()
  const [machine, setMachine] = useState(null)
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const selectedRole = getSelectedRole()
  const isServiceRepresentative = selectedRole === 'service'
  
  // Determine back link based on role
  const getBackLink = () => {
    if (selectedRole === 'manufacturer') return '/manufacturer'
    return '/factory'
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError('')

      try {
        const [machineResponse, servicesResponse] = await Promise.all([
          getMachine(id),
          getServices(id)
        ])

        const machineData = machineResponse?.data || machineResponse || null
        const serviceData = servicesResponse?.data || servicesResponse || []

        setMachine(machineData)
        setServices(Array.isArray(serviceData) ? serviceData : [])
      } catch (apiError) {
        setError(apiError.message || 'Failed to load machine details')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, location.search])

  const getLastServiceDate = () => {
    if (!services.length) {
      return 'N/A'
    }

    const sorted = [...services].sort((a, b) => {
      const dateA = new Date(a.date || a.serviceDate || a.createdAt || 0).getTime()
      const dateB = new Date(b.date || b.serviceDate || b.createdAt || 0).getTime()
      return dateB - dateA
    })

    const latest = sorted[0]
    return latest.date || latest.serviceDate || latest.createdAt || 'N/A'
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="details-container">
          <p>Loading machine details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="details-container">
          <p className="form-error">{error}</p>
          <Link to={getBackLink()} className="back-link">Back</Link>
        </div>
      </div>
    )
  }

  if (!machine) {
    return (
      <div className="page-container">
        <div className="details-container">
          <p>Machine not found</p>
          <Link to={getBackLink()} className="back-link">Back</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="details-container">
        <header className="details-header">
          <h1>Machine Details</h1>
          <Link to={getBackLink()} className="back-link">Back</Link>
        </header>

        <div className="details-content">
          <section className="machine-details">
            <h2>Machine Information</h2>
            <div className="detail-item">
              <span className="label">Machine Name:</span>
              <span className="value">{machine.name || machine.machineName || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="label">Serial Number:</span>
              <span className="value">{machine.serialNumber || machine.serial_no || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="label">Manufacturer:</span>
              <span className="value">{machine.manufacturer || machine.manufacturerName || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="label">Last Service Date:</span>
              <span className="value">{getLastServiceDate()}</span>
            </div>
          </section>

          <section className="service-records">
            <div className="section-header">
              <h2>Service History</h2>
              {isServiceRepresentative && (
                <Link to={`/add-service?machineId=${encodeURIComponent(id)}`} className="btn-primary">
                  Add Service
                </Link>
              )}
            </div>

            <ServiceList services={services} isEmpty="No service records found." />
          </section>
        </div>
      </div>
    </div>
  )
}

export default MachineDetails
