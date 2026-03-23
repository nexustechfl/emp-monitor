import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import AdminRoutes from './router/admin.routes'
import NonAdminRoutes from './router/nonadmin.routes'
import EmployeeRoutes from './router/employee.routes'
import DefaultRoutes from './router/default.routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {DefaultRoutes()}
        {AdminRoutes()}
        {NonAdminRoutes()}
        {EmployeeRoutes()}
      </Routes>
    </BrowserRouter>
  )
}

export default App
