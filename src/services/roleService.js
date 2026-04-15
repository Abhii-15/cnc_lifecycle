// Role management service with localStorage persistence
const ROLE_STORAGE_KEY = 'machineTracking_role'

export const roleConfig = {
  manufacturer: {
    id: 'manufacturer',
    name: 'Manufacturer',
    description: 'Manage machines and production',
    route: '/manufacturer',
    color: '#ff6b6b'
  },
  factory: {
    id: 'factory',
    name: 'Factory',
    description: 'Track machines in operation',
    route: '/factory',
    color: '#4ecdc4'
  },
  service: {
    id: 'service',
    name: 'Service Representative',
    description: 'Scan and manage services',
    route: '/scan',
    color: '#9b59b6'
  },
  recycler: {
    id: 'recycler',
    name: 'Recycler',
    description: 'View recycling summary',
    route: '/recycler',
    color: '#ffa502'
  }
}

export const setSelectedRole = (roleId) => {
  localStorage.setItem(ROLE_STORAGE_KEY, roleId)
}

export const getSelectedRole = () => {
  return localStorage.getItem(ROLE_STORAGE_KEY)
}

export const clearSelectedRole = () => {
  localStorage.removeItem(ROLE_STORAGE_KEY)
}

export const getRoleConfig = (roleId) => {
  return roleConfig[roleId] || null
}

export const getAllRoles = () => {
  return Object.values(roleConfig)
}
