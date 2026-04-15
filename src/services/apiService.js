/**
 * API Service
 * Handles all API calls to the backend
 * Uses Fetch API for HTTP requests
 */

// Configurable base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

/**
 * Helper function for API requests
 * @param {string} endpoint - API endpoint path
 * @param {object} options - Fetch options (method, body, headers)
 * @returns {Promise} Response data
 */
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }

  const config = {
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`API Call Error [${endpoint}]:`, error.message)
    throw error
  }
}

/**
 * Machine API Functions
 */

/**
 * Create a new machine
 * @param {object} data - Machine data {name, model, manufacturer}
 * @returns {Promise<object>} Created machine
 */
export const createMachine = async (data) => {
  return apiCall('/machine', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Get machine by ID
 * @param {string} id - Machine ID
 * @returns {Promise<object>} Machine details
 */
export const getMachine = async (id) => {
  return apiCall(`/machine/${id}`, {
    method: 'GET',
  })
}

/**
 * Get all machines
 * @returns {Promise<array>} List of machines
 */
export const getAllMachines = async () => {
  return apiCall('/machine', {
    method: 'GET',
  })
}

/**
 * Update machine
 * @param {string} id - Machine ID
 * @param {object} data - Updated machine data
 * @returns {Promise<object>} Updated machine
 */
export const updateMachine = async (id, data) => {
  return apiCall(`/machine/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/**
 * Delete machine
 * @param {string} id - Machine ID
 * @returns {Promise<object>} Response
 */
export const deleteMachine = async (id) => {
  return apiCall(`/machine/${id}`, {
    method: 'DELETE',
  })
}

/**
 * Service API Functions
 */

/**
 * Get all services for a machine
 * @param {string} machineId - Machine ID
 * @returns {Promise<array>} List of services
 */
export const getServices = async (machineId) => {
  return apiCall(`/machine/${machineId}/services`, {
    method: 'GET',
  })
}

/**
 * Add a service record
 * @param {object} data - Service data {machineId, type, description, date}
 * @returns {Promise<object>} Created service
 */
export const addService = async (data) => {
  return apiCall('/service', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Get service by ID
 * @param {string} serviceId - Service ID
 * @returns {Promise<object>} Service details
 */
export const getService = async (serviceId) => {
  return apiCall(`/service/${serviceId}`, {
    method: 'GET',
  })
}

/**
 * Update service
 * @param {string} serviceId - Service ID
 * @param {object} data - Updated service data
 * @returns {Promise<object>} Updated service
 */
export const updateService = async (serviceId, data) => {
  return apiCall(`/service/${serviceId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/**
 * Delete service
 * @param {string} serviceId - Service ID
 * @returns {Promise<object>} Response
 */
export const deleteService = async (serviceId) => {
  return apiCall(`/service/${serviceId}`, {
    method: 'DELETE',
  })
}

/**
 * Recycling API Functions
 */

/**
 * Get recycling records
 * @returns {Promise<array>} List of recycling records
 */
export const getRecyclingRecords = async () => {
  return apiCall('/recycling', {
    method: 'GET',
  })
}

/**
 * Add recycling record
 * @param {object} data - Recycling data
 * @returns {Promise<object>} Created record
 */
export const addRecyclingRecord = async (data) => {
  return apiCall('/recycling', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Utility function to set custom headers (e.g., for auth tokens)
 * @param {object} headers - Headers to add to all requests
 */
export const setAuthHeaders = (headers) => {
  // This can be extended to maintain headers across requests
  globalThis.customHeaders = headers
}

/**
 * Health check
 * @returns {Promise<object>} API status
 */
export const healthCheck = async () => {
  return apiCall('/health', {
    method: 'GET',
  })
}
