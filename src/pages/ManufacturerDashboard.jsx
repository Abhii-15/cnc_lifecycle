import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMachines } from '../services/machineService'
import '../styles/pages.css'

function ManufacturerDashboard() {
  const [machines, setMachines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      setLoading(true)
      const data = getMachines()
      setMachines(data || [])
    } catch (err) {
      setError(err.message || 'Failed to load machines')
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="page-container">
        <div className="dashboard">
          <header className="dashboard-header">
            <h1>Manufacturer Dashboard</h1>
          </header>
          <p style={{ textAlign: 'center', padding: '40px' }}>Loading machines...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="dashboard">
          <header className="dashboard-header">
            <h1>Manufacturer Dashboard</h1>
          </header>
          <p className="form-error">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="dashboard">
        <header className="dashboard-header">
          <h1>Manufacturer Dashboard</h1>
        </header>

        <div className="dashboard-content">
          <div className="section-header">
            <h2>Machines</h2>
            <Link to="/manufacturer/add-machine" className="btn-primary">
              + Add Machine
            </Link>
          </div>

          {machines.length === 0 ? (
            <p className="no-data">No machines found. Create one to start.</p>
          ) : (
            <div className="machine-list">
              {machines.map((machine) => (
                <div key={machine.id} className="machine-item">
                  <div className="machine-info">
                    <h3>{machine.name}</h3>
                    <p>Model: {machine.model}</p>
                    <p>Status: <span className={`status ${machine.status}`}>{machine.status}</span></p>
                  </div>
                  <Link to={`/machine/${machine.id}`} className="btn-secondary">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManufacturerDashboard
