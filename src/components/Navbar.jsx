import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getSelectedRole, getRoleConfig } from '../services/roleService'
import '../styles/navbar.css'

function Navbar() {
  const selectedRole = getSelectedRole()
  const location = useLocation()
  const roleConfig = getRoleConfig(selectedRole)

  // Hide navbar on role selection page
  if (!selectedRole || location.pathname === '/') {
    return null
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Machine Tracking
        </Link>

        {roleConfig && (
          <div className="navbar-role">
            <span className="navbar-role-label">Role:</span>
            <span className="navbar-role-name">{roleConfig.name}</span>
          </div>
        )}

        <div className="navbar-links">
          {selectedRole === 'manufacturer' && (
            <>
              <Link
                to="/manufacturer"
                className={`navbar-link ${isActive('/manufacturer') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              <Link
                to="/manufacturer/add-machine"
                className={`navbar-link ${isActive('/manufacturer/add-machine') ? 'active' : ''}`}
              >
                Add Machine
              </Link>
            </>
          )}

          {selectedRole === 'factory' && (
            <>
              <Link
                to="/factory"
                className={`navbar-link ${isActive('/factory') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              <Link to="/scan" className={`navbar-link ${isActive('/scan') ? 'active' : ''}`}>
                Scan
              </Link>
            </>
          )}

          {selectedRole === 'service' && (
            <>
              <Link to="/scan" className={`navbar-link ${isActive('/scan') ? 'active' : ''}`}>
                Scan
              </Link>
            </>
          )}

          {selectedRole === 'recycler' && (
            <>
              <Link
                to="/recycler"
                className={`navbar-link ${isActive('/recycler') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              <Link to="/scan" className={`navbar-link ${isActive('/scan') ? 'active' : ''}`}>
                Scan
              </Link>
            </>
          )}

          <Link to="/" className="navbar-link navbar-link-back">
            Change Role
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
