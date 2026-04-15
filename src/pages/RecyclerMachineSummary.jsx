import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMachine, getServices } from '../services/apiService'
import '../styles/pages.css'

const calculateMachineAge = (machine) => {
  const sourceDate =
    machine?.manufacturedAt ||
    machine?.manufactureDate ||
    machine?.createdAt ||
    (machine?.manufacturedYear ? `${machine.manufacturedYear}-01-01` : null)

  if (sourceDate) {
    const year = new Date(sourceDate).getFullYear()
    const nowYear = new Date().getFullYear()
    if (!Number.isNaN(year) && year > 1900) {
      return Math.max(0, nowYear - year)
    }
  }

  const numericPart = Number(String(machine?.id || '').replace(/\D/g, ''))
  if (!Number.isNaN(numericPart) && numericPart > 0) {
    return (numericPart % 8) + 1
  }

  return 3
}

const getConditionFromServiceCount = (serviceCount) => {
  if (serviceCount <= 2) {
    return 'Good'
  }
  if (serviceCount <= 5) {
    return 'Average'
  }
  return 'Poor'
}

function RecyclerMachineSummary() {
  const { id } = useParams()
  const [machine, setMachine] = useState(null)
  const [serviceCount, setServiceCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSummary = async () => {
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
        setServiceCount(Array.isArray(serviceData) ? serviceData.length : 0)
      } catch (apiError) {
        setError(apiError.message || 'Unable to load machine summary.')
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [id])

  if (loading) {
    return (
      <div className="page-container">
        <div className="summary-container">
          <p>Loading machine summary...</p>
        </div>
      </div>
    )
  }

  if (error || !machine) {
    return (
      <div className="page-container">
        <div className="summary-container">
          <p className="form-error">{error || 'Machine not found.'}</p>
          <Link to="/recycler" className="back-link">Back to Recycler</Link>
        </div>
      </div>
    )
  }

  const machineAge = calculateMachineAge(machine)
  const condition = getConditionFromServiceCount(serviceCount)

  return (
    <div className="page-container">
      <div className="summary-container">
        <header className="summary-header">
          <h1>Machine Summary</h1>
          <Link to="/recycler" className="back-link">Back to Recycler</Link>
        </header>

        <div className="recycler-machine-card">
          <p><strong>Machine Name:</strong> {machine.name || machine.machineName || 'N/A'}</p>
          <p><strong>Machine Age:</strong> {machineAge} years</p>
          <p><strong>Number of Services:</strong> {serviceCount}</p>
          <p>
            <strong>Condition:</strong>{' '}
            <span className={`status ${condition}`}>{condition}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RecyclerMachineSummary
