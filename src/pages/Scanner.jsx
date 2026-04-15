import React from 'react'
import { Link } from 'react-router-dom'
import QRScanner from '../components/QRScanner'
import { getSelectedRole } from '../services/roleService'
import '../styles/pages.css'

function Scanner() {
  const selectedRole = getSelectedRole()
  const backRoute = selectedRole === 'recycler' ? '/recycler' : '/factory'

  return (
    <div className="page-container">
      <div className="scanner-container">
        <header className="scanner-header">
          <h1>QR Code Scanner</h1>
          <Link to={backRoute} className="back-link">Back</Link>
        </header>

        <div className="scanner-content">
          <QRScanner />
        </div>
      </div>
    </div>
  )
}

export default Scanner
