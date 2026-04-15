import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/pages.css'

function RecyclerSummary() {
  return (
    <div className="page-container">
      <div className="summary-container">
        <header className="summary-header">
          <h1>Recycler Dashboard</h1>
        </header>

        <div className="summary-content recycler-minimal-content">
          <p>Scan a machine to see a quick recycling summary.</p>
          <Link to="/scan" className="btn-primary recycler-scan-btn">
            Scan as Recycler
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecyclerSummary
