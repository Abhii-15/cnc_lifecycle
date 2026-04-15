# Machine Digital Passport - Frontend Documentation

## Overview

This is a React-based frontend application for a **Machine Digital Passport** system. It allows users to track machines across manufacturers, factories, service representatives, and recyclers using QR code scanning and digital records.

**Frontend Technology Stack:**
- React 18 (Functional components, Hooks)
- React Router v6 (Client-side routing)
- Vite (Build tool)
- CSS3 (Custom styling with green theme)
- Fetch API (HTTP client)
- html5-qrcode (Camera-based QR scanning)
- qrcode.react (QR code generation)

---

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx                          # Main router configuration
│   ├── index.jsx                        # Entry point
│   ├── pages/                           # Page components
│   │   ├── RoleSelection.jsx            # Role selection entry point
│   │   ├── ManufacturerDashboard.jsx    # Manufacturer dashboard
│   │   ├── AddMachine.jsx               # Create new machine
│   │   ├── FactoryDashboard.jsx         # Factory dashboard
│   │   ├── Scanner.jsx                  # QR scanner page
│   │   ├── MachineDetails.jsx           # Machine details + service history
│   │   ├── AddService.jsx               # Add service record
│   │   ├── RecyclerSummary.jsx          # Recycler dashboard
│   │   └── RecyclerMachineSummary.jsx   # Recycler machine summary
│   ├── components/                      # Reusable components
│   │   ├── Navbar.jsx                   # Navigation bar
│   │   ├── QRScanner.jsx                # Camera QR scanner
│   │   ├── ServiceList.jsx              # Service history list
│   │   ├── LoadingSpinner.jsx           # Loading indicator
│   │   ├── Header.jsx                   # (legacy, can remove)
│   │   ├── Button.jsx                   # (legacy, can remove)
│   │   ├── Card.jsx                     # (legacy, can remove)
│   │   └── index.js                     # Component exports
│   ├── services/                        # API and data services
│   │   ├── apiService.js                # HTTP client (Fetch-based)
│   │   ├── roleService.js               # Role management & localStorage
│   │   └── machineService.js            # Mock data (for testing)
│   ├── hooks/                           # Custom React hooks
│   │   ├── useForm.js                   # Form state management
│   │   ├── useAsync.js                  # Async data fetching
│   │   └── useRole.js                   # Role context management
│   └── styles/                          # CSS files
│       ├── global.css                   # Global styles, animations, theme
│       ├── navbar.css                   # Navigation bar styles
│       ├── components.css               # Component styles
│       ├── pages.css                    # Page-specific styles
│       └── index.css                    # Main CSS imports
├── public/                              # Static assets
├── package.json                         # Dependencies
├── vite.config.js                       # Vite configuration
└── .env.example                         # Environment variables template
```

---

## Routes & Pages

### 1. Role Selection (`/`)
**File:** `src/pages/RoleSelection.jsx`

- Entry point to the application
- Displays 4 role buttons:
  - Manufacturer
  - Factory
  - Service Representative
  - Recycler
- Stores selected role in localStorage
- Routes to respective dashboard based on role selection

**Navbar:** Hidden on this page

---

### 2. Manufacturer Dashboard (`/manufacturer`)
**File:** `src/pages/ManufacturerDashboard.jsx`

- Lists all machines created by manufacturer
- Shows machine name, model, and status
- "Add Machine" button links to `/manufacturer/add-machine`
- "View Details" button links to `/machine/:id`

**Data Source:** 
- Fetches from `GET /api/machines` (mock data fallback)

**Navbar:** Visible with "Dashboard" and "Add Machine" links

---

### 3. Add Machine (`/manufacturer/add-machine`)
**File:** `src/pages/AddMachine.jsx`

**Form Fields:**
- Machine Name (required)
- Serial Number (required)
- Manufacturer Name (required)

**Actions:**
- Submits POST request to create machine
- On success: displays QR code with machine ID and serial number
- On error: shows error message

**API Call:**
```
POST /api/machines
{
  "name": "string",
  "serialNumber": "string",
  "manufacturer": "string"
}
```

**Response Expected:**
```json
{
  "id": "string (machineId)",
  "name": "string",
  "serialNumber": "string",
  "manufacturer": "string",
  "createdAt": "ISO date string"
}
```

**QR Code Contains:**
```json
{
  "machineId": "string",
  "serialNumber": "string"
}
```

---

### 4. Factory Dashboard (`/factory`)
**File:** `src/pages/FactoryDashboard.jsx`

- Lists all machines currently at factory
- Shows machine name, model, and status
- "Scan Machine QR" button links to `/scan`
- "View Details" button links to `/machine/:id`

**Data Source:**
- Fetches from `GET /api/machines` (or factory-specific endpoint)

**Navbar:** Visible with "Dashboard" and "Scan" links

---

### 5. QR Scanner (`/scan`)
**File:** `src/pages/Scanner.jsx`

**Component:** `src/components/QRScanner.jsx`

- Activates device camera
- Scans QR codes (tries multiple formats):
  1. JSON object: `{ machineId: "...", serialNumber: "..." }`
  2. URL parameter: `/machine/123`
  3. URL path: `machine/123`
  4. Plain text: `123` (assumes it's machine ID)

- On successful scan:
  - **Manufacturer/Factory role:** Routes to `/machine/:id`
  - **Recycler role:** Routes to `/recycler/machine/:id`
  - **Service Rep role:** Routes to `/machine/:id`

**Features:**
- Requests camera permissions
- Shows camera stream
- Auto-stops after first successful scan
- Error handling for permission denied or no camera

**Navbar:** Visible with back link to previous dashboard

---

### 6. Machine Details (`/machine/:id`)
**File:** `src/pages/MachineDetails.jsx`

**Displays:**
- Machine Information:
  - Machine Name
  - Serial Number
  - Manufacturer
  - Last Service Date
- Service History:
  - List of all services for machine
  - Date, Issue, Action for each service

**Actions:**
- Service Representatives can click "Add Service" button
- Back link is role-aware:
  - Manufacturer role → `/manufacturer`
  - All other roles → `/factory`

**API Calls:**
```
GET /api/machines/:id
GET /api/machines/:id/services
```

**Expected Responses:**

Machine:
```json
{
  "id": "string",
  "name": "string",
  "serialNumber": "string",
  "manufacturer": "string",
  "createdAt": "ISO date string"
}
```

Services:
```json
[
  {
    "id": "string",
    "machineId": "string",
    "date": "YYYY-MM-DD",
    "issue": "string",
    "action": "string (description of action taken)",
    "partsReplaced": "string (optional)",
    "createdAt": "ISO date string"
  }
]
```

---

### 7. Add Service (`/add-service?machineId=<id>`)
**File:** `src/pages/AddService.jsx`

**Form Fields:**
- Issue (required) - text input
- Action Taken (required) - textarea
- Parts Replaced (optional) - text input
- Date (auto-generated as today's date)

**Actions:**
- Submits POST request to add service record
- On success: displays success message, then redirects to `/machine/:id?refresh=timestamp`
- On error: shows error message

**Machine ID:** Extracted from URL query parameter `?machineId=`

**API Call:**
```
POST /api/machines/:machineId/services
{
  "machineId": "string",
  "issue": "string",
  "action": "string",
  "partsReplaced": "string (optional)",
  "date": "YYYY-MM-DD"
}
```

**Response Expected:**
```json
{
  "id": "string",
  "machineId": "string",
  "date": "YYYY-MM-DD",
  "issue": "string",
  "action": "string",
  "partsReplaced": "string",
  "createdAt": "ISO date string"
}
```

---

### 8. Recycler Dashboard (`/recycler`)
**File:** `src/pages/RecyclerSummary.jsx`

**Features:**
- Minimal dashboard with instruction text
- "Scan as Recycler" button links to `/scan`
- On scan, routes to `/recycler/machine/:id`

**Navbar:** Visible with "Dashboard" and "Scan" links

---

### 9. Recycler Machine Summary (`/recycler/machine/:id`)
**File:** `src/pages/RecyclerMachineSummary.jsx`

**Displays:**
- Machine Name
- Machine Age (calculated from `manufacturedAt` or `createdAt`)
- Number of Services (count from service history)
- Condition Badge:
  - **Good**: ≤ 2 services
  - **Average**: 3-5 services
  - **Poor**: > 5 services

**API Calls:**
```
GET /api/machines/:id
GET /api/machines/:id/services
```

**Back Link:** Returns to `/recycler`

---

## API Service (`src/services/apiService.js`)

The app uses **Fetch API** for all HTTP requests. The API service handles:
- Base URL configuration (via `VITE_API_URL` env var, defaults to `http://localhost:3001/api`)
- Error handling (catches non-2xx responses)
- Response parsing

### API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/machines` | List all machines |
| POST | `/machines` | Create new machine |
| GET | `/machines/:id` | Get machine details |
| GET | `/machines/:id/services` | Get services for machine |
| POST | `/machines/:id/services` | Add service record |
| GET | `/recycling-records` | Get recycling records (future) |

### All API Functions

```javascript
// Create a new machine
createMachine(payload)
// payload: { name, serialNumber, manufacturer }
// returns: { id, name, serialNumber, manufacturer, createdAt }

// Get single machine
getMachine(machineId)
// returns: { id, name, serialNumber, manufacturer, createdAt }

// Get all machines
getAllMachines()
// returns: [{ id, name, serialNumber, ... }]

// Get services for a machine
getServices(machineId)
// returns: [{ id, machineId, date, issue, action, partsReplaced, createdAt }]

// Add service to machine
addService(payload)
// payload: { machineId, issue, action, partsReplaced, date }
// returns: { id, machineId, date, issue, action, partsReplaced, createdAt }

// Get recycling records (future use)
getRecyclingRecords()
// returns: [{ id, machineId, recyclerId, date, notes }]
```

---

## Role-Based Access Control

**File:** `src/services/roleService.js`

### Roles

```javascript
{
  id: "manufacturer",
  name: "Manufacturer",
  description: "Create and manage machines",
  route: "/manufacturer",
  color: "#ff6b6b"
}

{
  id: "factory",
  name: "Factory",
  description: "Track machine operations",
  route: "/factory",
  color: "#4ecdc4"
}

{
  id: "service",
  name: "Service Representative",
  description: "Record service and maintenance",
  route: "/scan",
  color: "#9b59b6"
}

{
  id: "recycler",
  name: "Recycler",
  description: "Process end-of-life machines",
  route: "/recycler",
  color: "#ffa502"
}
```

### Role Storage

- Selected role is stored in `localStorage` under key `selectedRole`
- Persists across page refreshes
- Can be cleared by calling `clearSelectedRole()`

### Role-Aware Navigation

- Each role has a different dashboard entry point
- Service history and actions are role-specific:
  - **Service Rep** can add services (visible "Add Service" button)
  - **Manufacturer** can view machines
  - **Factory** can scan and view machines
  - **Recycler** sees machine age, service count, and condition

---

## Components

### Navbar (`src/components/Navbar.jsx`)

**Features:**
- Displays app title "Machine Passport"
- Shows current role with badge
- Navigation links based on role:
  - Manufacturer: Dashboard, Add Machine, Change Role
  - Factory: Dashboard, Scan, Change Role
  - Service Rep: Scan, Change Role
  - Recycler: Dashboard, Scan, Change Role
- Sticky positioning at top
- Responsive mobile menu

**Styling:** Green theme with gradient text for brand

---

### QR Scanner (`src/components/QRScanner.jsx`)

**Features:**
- Uses `html5-qrcode` library
- Activates camera stream
- Scans QR codes with multiple format support
- Role-aware routing on scan
- Error handling for permissions/camera issues
- Auto-stops after successful scan

**Props:** None (uses hooks internally)

---

### ServiceList (`src/components/ServiceList.jsx`)

**Props:**
```javascript
{
  services: Array<Service>,      // Service records to display
  isEmpty: String                // Message when no services (default: "No service records found.")
}
```

**Renders:**
- List of service items with date, issue, and action
- Styled with green left border and gradient background
- Empty state message if no services

---

### LoadingSpinner (`src/components/LoadingSpinner.jsx`)

**Props:**
```javascript
{
  message: String  // Loading text (default: "Loading...")
}
```

**Renders:**
- Animated spinner (rotating border)
- Loading message below spinner

---

## Styling & Theme

**Color Palette:**
- Primary Green: `#16a34a`
- Secondary Green: `#22c55e`
- Light Background: `#f0fdf4`
- Dark Text: `#14532d`
- Grays: Various shades for borders and text

**CSS Files:**
1. `global.css` - Base styles, animations, typography
2. `navbar.css` - Navigation bar styling
3. `components.css` - Component styles (buttons, cards, etc.)
4. `pages.css` - Page-specific layouts
5. `index.css` - Stylesheet imports

**Features:**
- Subtle animated background (moving grid pattern)
- Smooth transitions on hover (0.2s ease)
- Card-based layouts with shadows
- Green focus states on form inputs
- Responsive design for mobile/tablet/desktop

---

## Environment Variables

Create `.env` file in project root:

```env
VITE_API_URL=http://localhost:3001/api
```

**Default:** If not set, uses `http://localhost:3001/api`

---

## Setup & Running

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Runs on `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## Key Features

1. **QR Code Generation**: Machines get QR codes with ID and serial number
2. **QR Code Scanning**: Camera-based scanning for multiple platforms
3. **Service Tracking**: Complete history of services for each machine
4. **Role-Based Views**: Different interfaces for different user roles
5. **Machine Age Calculation**: Auto-calculated from manufacture date
6. **Condition Assessment**: Automatic based on service count
7. **Responsive Design**: Works on desktop, tablet, and mobile
8. **localStorage Persistence**: Role selection persists across sessions
9. **Error Handling**: Graceful error messages for all failures
10. **Loading States**: Loading indicators during data fetching

---

## Data Flow

### Adding a Machine (Manufacturer)
1. User navigates to `/manufacturer/add-machine`
2. Fills form: Machine Name, Serial Number, Manufacturer Name
3. Submits form → POST to `/api/machines`
4. Backend creates machine record, returns machine ID
5. Frontend displays QR code with machine ID and serial number
6. Redirects to manufacturer dashboard

### Scanning & Viewing Details
1. Factory/Service Rep navigates to `/scan`
2. Scans QR code with camera
3. QR parsing extracts machine ID
4. Routes to `/machine/:id`
5. Frontend fetches machine details and service history via:
   - `GET /api/machines/:id`
   - `GET /api/machines/:id/services`
6. Displays machine info and service list

### Adding Service (Service Representative)
1. On machine details page, clicks "Add Service"
2. Routes to `/add-service?machineId=<id>`
3. Fills form: Issue, Action Taken, Parts Replaced
4. Submits → POST to `/api/machines/:id/services`
5. Backend creates service record
6. Frontend redirects to `/machine/:id?refresh=timestamp` (refreshes page)
7. Shows updated service list

### Recycler Flow
1. Recycler navigates to `/recycler`
2. Clicks "Scan as Recycler"
3. Routes to `/scan` (role-aware)
4. Scans QR code
5. Routes to `/recycler/machine/:id`
6. Fetches machine details and service history
7. Calculates and displays:
   - Machine age (years)
   - Service count
   - Condition badge (Good/Average/Poor)

---

## Testing with Mock Data

**File:** `src/services/machineService.js`

Contains mock machines and services for testing without backend:

```javascript
// Returns hardcoded test data
getMachines()
getMachinesAtFactory()
```

To use mock data instead of API:
- Uncomment mock data calls in dashboard pages
- Comment out API calls
- No backend needed for local testing

---

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires camera permission for QR scanning
- localStorage support required for role persistence
- ES2020+ JavaScript support

---

## Known Limitations

1. QR scanning requires HTTPS in production (browser camera API requirement)
2. One QR code per machine (no versioning)
3. Service history is append-only (no edits/deletes)
4. No authentication/authorization in frontend
5. No image uploads
6. No offline support

---

## Future Enhancements

1. Add authentication and user accounts
2. Add machine filtering and search
3. Add service record editing/deletion
4. Add bulk machine import
5. Add report generation
6. Add real-time notifications
7. Add machine lifecycle states
8. Add maintenance schedules
9. Add file attachments to services
10. Add multi-language support

---

## Contact & Support

For questions about the frontend implementation, refer to the inline code comments and this documentation.

For API integration details, see the `apiService.js` file and endpoint summaries above.

---

**Last Updated:** April 15, 2026
**Frontend Version:** 1.0.0
**React Version:** 18
**React Router Version:** 6
