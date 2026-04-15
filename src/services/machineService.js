// Mock data storage
let machines = [
  {
    id: 'M001',
    name: 'CNC Machine A',
    model: 'CNC-2000',
    manufacturer: 'TechCorp',
    status: 'Active'
  },
  {
    id: 'M002',
    name: 'Industrial Press B',
    model: 'Press-500',
    manufacturer: 'MachineWorks',
    status: 'Active'
  }
]

let services = [
  {
    id: 'S001',
    machineId: 'M001',
    type: 'maintenance',
    date: '2025-04-10',
    description: 'Regular maintenance check'
  }
]

let recyclingRecords = [
  {
    id: 'R001',
    machineName: 'Old Lathe',
    date: '2025-03-15',
    description: 'Recycled machine components',
    status: 'Completed'
  },
  {
    id: 'R002',
    machineName: 'Broken Drill',
    date: '2025-04-01',
    description: 'In recycling process',
    status: 'InProcess'
  }
]

// Machine functions
export const getMachines = () => {
  return machines
}

export const getMachineById = (id) => {
  return machines.find(m => m.id === id)
}

export const addMachine = (machineData) => {
  const newMachine = {
    id: `M${String(machines.length + 1).padStart(3, '0')}`,
    ...machineData,
    status: 'Active'
  }
  machines.push(newMachine)
  return newMachine
}

export const getMachinesAtFactory = () => {
  return machines.filter(m => m.status === 'Active')
}

// Service functions
export const getServiceRecords = (machineId) => {
  return services.filter(s => s.machineId === machineId)
}

export const addServiceRecord = (serviceData) => {
  const newService = {
    id: `S${String(services.length + 1).padStart(3, '0')}`,
    ...serviceData
  }
  services.push(newService)
  return newService
}

// Recycler functions
export const getRecyclerSummary = () => {
  const completed = recyclingRecords.filter(r => r.status === 'Completed').length
  const inProcess = recyclingRecords.filter(r => r.status === 'InProcess').length
  const pending = recyclingRecords.filter(r => r.status === 'Pending').length

  return {
    totalRecycled: recyclingRecords.length,
    completed,
    inProcess,
    pending,
    records: recyclingRecords
  }
}

export const addRecyclingRecord = (recordData) => {
  const newRecord = {
    id: `R${String(recyclingRecords.length + 1).padStart(3, '0')}`,
    ...recordData,
    status: 'Pending'
  }
  recyclingRecords.push(newRecord)
  return newRecord
}
