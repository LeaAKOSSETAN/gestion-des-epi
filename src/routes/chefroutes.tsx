// src/routes/ChefRoutes.tsx
import { Route } from 'react-router-dom'
import EmployeeList from '../Components/chef-departement/EmployeeList'
import MyOwnRequest from '../Components/chef-departement/MyOwnRequest'
import ValidateRequest from '../Components/chef-departement/ValidateRequest'
import ChefDashboard from '../Components/chef-departement/pages/ChefDashboard'
import EmployeeRequests from '../Components/chef-departement/EmployeeRequests.tsx'
import CreateEmployeeAccount from '../Components/chef-departement/ceation-compte'

export function ChefRoutes() {
  return (
    <>
      <Route path="/chef-departement/chef-Dashboard" element={<ChefDashboard />} />
      <Route path="/chef-departement/employee-list" element={<EmployeeList />} />
      <Route path="/chef-departement/employee-requests" element={<EmployeeRequests />} />
      <Route path="/chef-departement/validate-requests" element={<ValidateRequest />} />
      <Route path="/chef-departement/creation-comptes" element={<CreateEmployeeAccount />} />
      <Route path="/chef-departement/my-own-request" element={<MyOwnRequest />} />
    </>
  )
}
