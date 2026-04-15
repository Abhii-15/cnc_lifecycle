import React from 'react'
import { useNavigate } from 'react-router-dom'
import { setSelectedRole, getAllRoles } from '../services/roleService'
import '../styles/pages.css'

function RoleSelection() {
  const navigate = useNavigate()
  const roles = getAllRoles()

  const handleRoleSelection = (roleId, route) => {
    // Store selected role in localStorage
    setSelectedRole(roleId)
    // Navigate to respective dashboard
    navigate(route)
  }

  return (
    <div className="page-container">
      <div className="role-selection">
        <h1>Machine Tracking System</h1>
        <p>Select your role to continue</p>
        
        <div className="role-buttons">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelection(role.id, role.route)}
              className={`role-button ${role.id}`}
            >
              <h2>{role.name}</h2>
              <p>{role.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RoleSelection
