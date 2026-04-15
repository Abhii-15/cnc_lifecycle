# Quick Start Guide

## Prerequisites ✅

Make sure you have the following installed:
- **Node.js** (v14+) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

## Setup & Running the Project

### 1. Install Dependencies
Open a terminal in the project root and run:
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
This will start the Vite development server and automatically open the app in your browser at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```
This creates an optimized build in the `dist/` folder.

### 4. Preview Production Build
```bash
npm run preview
```

## 🧭 Navigation Guide

1. **Landing Page** (`/`) - Select your role:
   - 🏭 **Manufacturer** - Manage machines
   - 🏢 **Factory** - Track machines in operation
   - ♻️ **Recycler** - View recycling statistics

2. **Manufacturer Dashboard** (`/manufacturer`)
   - View all machines
   - Click "+ Add Machine" to create new machines
   - Click "View Details" to see machine information and service history

3. **Add Machine** (`/manufacturer/add-machine`)
   - Fill in machine details (name, model, manufacturer)
   - Machine will be added to the system

4. **Factory Dashboard** (`/factory`)
   - View machines in operation
   - Click "📱 Scan QR Code" to scan machine QR codes

5. **QR Scanner** (`/scan`)
   - Focus on the input field and scan a QR code
   - View machine details or add a service record

6. **Machine Details** (`/machine/:id`)
   - View complete machine information
   - See service history for the machine
   - Add new service records

7. **Add Service** (`/add-service`)
   - Record maintenance, repairs, inspections, or calibrations
   - Link service to a specific machine

8. **Recycler Summary** (`/recycler`)
   - View recycling statistics
   - See recent recycling records

## 📁 Project Files Overview

```
frontend/
├── src/
│   ├── App.jsx                    Main app with Router setup
│   ├── index.jsx                  Entry point
│   ├── pages/                     All page components
│   ├── components/                Reusable components
│   ├── services/                  Business logic (machineService.js)
│   ├── hooks/                     Custom hooks (for future use)
│   └── styles/                    CSS files
├── public/                        Static assets
├── index.html                     HTML entry point
├── package.json                   Dependencies
├── vite.config.js                 Vite configuration
└── README.md                      Full documentation
```

## 🎨 Color Scheme

- **Manufacturer**: Red (#ff6b6b)
- **Factory**: Teal (#4ecdc4)
- **Recycler**: Orange (#ffa502)
- **Primary Actions**: Blue (#007bff)

## 💾 Data Persistence

- Data is stored in memory during the session
- Refreshing the page or restarting the server resets all data
- To persist data, integrate with a backend API

## 🔗 Routing Map

All routes are defined in `src/App.jsx`:

```javascript
/ → RoleSelection
/manufacturer → ManufacturerDashboard
/manufacturer/add-machine → AddMachine
/factory → FactoryDashboard
/scan → Scanner
/machine/:id → MachineDetails
/add-service → AddService
/recycler → RecyclerSummary
```

## 🎯 Key Features Implemented

✅ React Router v6 with multiple routes
✅ Functional components with hooks (useState, useEffect, useParams, useNavigate)
✅ Clean, minimal responsive UI
✅ Mock data service layer
✅ Form handling
✅ Dynamic routing with parameters
✅ Status indicators and color coding
✅ Mobile-friendly layout

## 📝 Making Changes

- **Modify pages**: Edit files in `src/pages/`
- **Add components**: Create new files in `src/components/`
- **Update styles**: Edit CSS files in `src/styles/`
- **Change data**: Update `src/services/machineService.js`

## 🚀 Next Steps

1. Install & run the project
2. Test all routes and features
3. Try adding machines and service records
4. Experiment with the QR scanner input
5. Integrate with a real API by updating `machineService.js`

## ❓ Troubleshooting

**Issue**: `npm: command not found`
**Solution**: Make sure Node.js is installed. Download from https://nodejs.org/

**Issue**: Port 3000 is in use
**Solution**: Edit `vite.config.js` and change the port number

**Issue**: Module not found errors
**Solution**: Run `npm install` to ensure all dependencies are installed

## 📞 Support

Refer to the main [README.md](README.md) for more detailed documentation.
