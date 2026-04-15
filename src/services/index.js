// Export all API services for easier imports
export {
  // Machine API
  createMachine,
  getMachine,
  getAllMachines,
  updateMachine,
  deleteMachine,
  // Service API
  getServices,
  addService,
  getService,
  updateService,
  deleteService,
  // Recycling API
  getRecyclingRecords,
  addRecyclingRecord,
  // Utilities
  setAuthHeaders,
  healthCheck,
} from './apiService'

// Export machine service (mock data)
export {
  getMachines,
  getMachineById,
  addMachine,
  getMachinesAtFactory,
  getServiceRecords,
  addServiceRecord,
  getRecyclerSummary,
  addRecyclingRecord as addRecyclingRecordMock,
} from './machineService'

// Export role service
export {
  roleConfig,
  setSelectedRole,
  getSelectedRole,
  clearSelectedRole,
  getRoleConfig,
  getAllRoles,
} from './roleService'
