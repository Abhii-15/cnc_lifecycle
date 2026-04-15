import { useState, useEffect } from 'react'
import { getSelectedRole } from '../services/roleService'

/**
 * Custom hook to manage selected role
 * @returns {string} Currently selected role
 */
export const useRole = () => {
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const selectedRole = getSelectedRole()
    setRole(selectedRole)
    setLoading(false)
  }, [])

  return { role, loading }
}
