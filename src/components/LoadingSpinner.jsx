import React from 'react'
import '../styles/components.css'

function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  )
}

export default LoadingSpinner
