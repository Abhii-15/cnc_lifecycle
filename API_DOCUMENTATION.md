# API Service Documentation

## Overview

The API Service (`apiService.js`) provides a centralized way to communicate with the backend API. It uses the Fetch API and includes error handling, configurable base URL, and helper functions for all common operations.

## Configuration

### Base URL

The base URL is configurable via environment variables:

```env
VITE_API_URL=http://localhost:3001/api
```

If not set, it defaults to `http://localhost:3001/api`

### Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update the `VITE_API_URL` to match your backend:
   ```env
   VITE_API_URL=https://api.yourdomain.com/api
   ```

## API Functions

### Machine API

#### `createMachine(data)`
Create a new machine.

```javascript
import { createMachine } from '@/services'

const newMachine = await createMachine({
  name: 'CNC Machine A',
  model: 'CNC-2000',
  manufacturer: 'TechCorp'
})
```

**Request:**
- Method: `POST`
- Endpoint: `/machine`
- Body: Machine data object

**Response:**
```json
{
  "id": "M001",
  "name": "CNC Machine A",
  "model": "CNC-2000",
  "manufacturer": "TechCorp",
  "status": "Active"
}
```

---

#### `getMachine(id)`
Get a specific machine by ID.

```javascript
import { getMachine } from '@/services'

const machine = await getMachine('M001')
```

**Request:**
- Method: `GET`
- Endpoint: `/machine/{id}`

**Response:**
```json
{
  "id": "M001",
  "name": "CNC Machine A",
  "model": "CNC-2000",
  "manufacturer": "TechCorp",
  "status": "Active"
}
```

---

#### `getAllMachines()`
Get all machines.

```javascript
import { getAllMachines } from '@/services'

const machines = await getAllMachines()
```

**Request:**
- Method: `GET`
- Endpoint: `/machine`

**Response:**
```json
[
  {
    "id": "M001",
    "name": "CNC Machine A",
    "model": "CNC-2000",
    "manufacturer": "TechCorp",
    "status": "Active"
  },
  ...
]
```

---

#### `updateMachine(id, data)`
Update a machine.

```javascript
import { updateMachine } from '@/services'

await updateMachine('M001', {
  name: 'CNC Machine A Updated',
  status: 'InActive'
})
```

**Request:**
- Method: `PUT`
- Endpoint: `/machine/{id}`
- Body: Updated fields

---

#### `deleteMachine(id)`
Delete a machine.

```javascript
import { deleteMachine } from '@/services'

await deleteMachine('M001')
```

**Request:**
- Method: `DELETE`
- Endpoint: `/machine/{id}`

---

### Service API

#### `getServices(machineId)`
Get all services for a specific machine.

```javascript
import { getServices } from '@/services'

const services = await getServices('M001')
```

**Request:**
- Method: `GET`
- Endpoint: `/machine/{machineId}/services`

**Response:**
```json
[
  {
    "id": "S001",
    "machineId": "M001",
    "type": "maintenance",
    "date": "2025-04-10",
    "description": "Regular maintenance check"
  },
  ...
]
```

---

#### `addService(data)`
Add a service record.

```javascript
import { addService } from '@/services'

const service = await addService({
  machineId: 'M001',
  type: 'maintenance',
  date: '2025-04-15',
  description: 'Quarterly maintenance performed'
})
```

**Request:**
- Method: `POST`
- Endpoint: `/service`
- Body: Service data object

**Response:**
```json
{
  "id": "S002",
  "machineId": "M001",
  "type": "maintenance",
  "date": "2025-04-15",
  "description": "Quarterly maintenance performed"
}
```

---

#### `getService(serviceId)`
Get a specific service.

```javascript
import { getService } from '@/services'

const service = await getService('S001')
```

**Request:**
- Method: `GET`
- Endpoint: `/service/{serviceId}`

---

#### `updateService(serviceId, data)`
Update a service record.

```javascript
import { updateService } from '@/services'

await updateService('S001', {
  description: 'Updated maintenance notes'
})
```

**Request:**
- Method: `PUT`
- Endpoint: `/service/{serviceId}`

---

#### `deleteService(serviceId)`
Delete a service record.

```javascript
import { deleteService } from '@/services'

await deleteService('S001')
```

**Request:**
- Method: `DELETE`
- Endpoint: `/service/{serviceId}`

---

### Recycling API

#### `getRecyclingRecords()`
Get all recycling records.

```javascript
import { getRecyclingRecords } from '@/services'

const records = await getRecyclingRecords()
```

**Request:**
- Method: `GET`
- Endpoint: `/recycling`

---

#### `addRecyclingRecord(data)`
Add a recycling record.

```javascript
import { addRecyclingRecord } from '@/services'

const record = await addRecyclingRecord({
  machineId: 'M001',
  date: '2025-04-15',
  description: 'Machine recycled'
})
```

**Request:**
- Method: `POST`
- Endpoint: `/recycling`

---

### Utility Functions

#### `setAuthHeaders(headers)`
Set custom headers (e.g., authentication tokens).

```javascript
import { setAuthHeaders } from '@/services'

setAuthHeaders({
  'Authorization': 'Bearer token123'
})
```

---

#### `healthCheck()`
Check API health/connectivity.

```javascript
import { healthCheck } from '@/services'

const status = await healthCheck()
```

**Request:**
- Method: `GET`
- Endpoint: `/health`

---

## Error Handling

All API functions throw errors for failed requests. Always wrap calls in try-catch:

```javascript
try {
  const machine = await getMachine('M001')
  console.log(machine)
} catch (error) {
  console.error('Failed to get machine:', error.message)
  // Handle error (show user message, etc.)
}
```

## Usage in Components

### In a functional component with hooks:

```javascript
import { useState, useEffect } from 'react'
import { getMachine, addService } from '@/services'

function MachineDetails({ machineId }) {
  const [machine, setMachine] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const data = await getMachine(machineId)
        setMachine(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMachine()
  }, [machineId])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>{machine.name}</h1>
      <p>Model: {machine.model}</p>
    </div>
  )
}

export default MachineDetails
```

## Backend Integration

Replace the mock data service (`machineService.js`) with actual API calls in your pages:

**Before (Mock):**
```javascript
import { getMachines } from '@/services/machineService'

const machines = getMachines() // Synchronous
```

**After (API):**
```javascript
import { getAllMachines } from '@/services'

const machines = await getAllMachines() // Asynchronous
```

## Mock Data Fallback

During development, you can use mock data from `machineService.js` alongside the API service. The mock service will be used for testing/demo until the backend is ready.

## Best Practices

1. **Use environment variables** for API URLs
2. **Always handle errors** with try-catch
3. **Show loading states** to users
4. **Cache responses** when appropriate using React state
5. **Use the useAsync hook** for cleaner async code:

```javascript
import { useAsync } from '@/hooks'
import { getMachine } from '@/services'

function MyComponent() {
  const { data, loading, error } = useAsync(() => getMachine('M001'))

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return <div>{data.name}</div>
}
```

## Testing

When testing, mock the API calls:

```javascript
import { getMachine } from '@/services'

jest.mock('@/services', () => ({
  getMachine: jest.fn().mockResolvedValue({
    id: 'M001',
    name: 'Test Machine'
  })
}))
```
