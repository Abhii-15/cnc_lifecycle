import React from 'react'
import '../styles/components.css'

function ServiceList({ services, isEmpty = 'No service records found.' }) {
  if (!services || services.length === 0) {
    return <p className="no-data">{isEmpty}</p>
  }

  return (
    <div className="service-list">
      {services.map((service) => (
        <div
          key={service.id || `${service.date}-${service.issue || service.type}`}
          className="service-item"
        >
          <div className="service-history-item">
            <p>
              <strong>Date:</strong>{' '}
              {service.date || service.serviceDate || service.createdAt || 'N/A'}
            </p>
            <p>
              <strong>Issue:</strong> {service.issue || service.type || 'N/A'}
            </p>
            <p>
              <strong>Action:</strong> {service.action || service.description || 'N/A'}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ServiceList
