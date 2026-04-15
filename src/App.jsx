import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import RoleSelection from './pages/RoleSelection'
import ManufacturerDashboard from './pages/ManufacturerDashboard'
import AddMachine from './pages/AddMachine'
import FactoryDashboard from './pages/FactoryDashboard'
import Scanner from './pages/Scanner'
import MachineDetails from './pages/MachineDetails'
import AddService from './pages/AddService'
import RecyclerSummary from './pages/RecyclerSummary'
import RecyclerMachineSummary from './pages/RecyclerMachineSummary'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/manufacturer" element={<ManufacturerDashboard />} />
        <Route path="/manufacturer/add-machine" element={<AddMachine />} />
        <Route path="/factory" element={<FactoryDashboard />} />
        <Route path="/scan" element={<Scanner />} />
        <Route path="/machine/:id" element={<MachineDetails />} />
        <Route path="/add-service" element={<AddService />} />
        <Route path="/recycler" element={<RecyclerSummary />} />
        <Route path="/recycler/machine/:id" element={<RecyclerMachineSummary />} />
      </Routes>
    </Router>
  )
}

export default App
