import React from 'react'
import { ClipboardList } from 'lucide-react'
import EmpAlertPolicies from '@/components/common/alert-policies/EmpAlertPolicies'

const Placeholder = ({ title, description, Icon }) => (
  <div className="bg-slate-200 w-full min-h-screen p-5">
   <EmpAlertPolicies />
  </div>
)

const AlertPolicies = () => (
  <Placeholder
    title="Alert Policies"
    description="Create and configure alert policies based on employee behaviour triggers."
    Icon={ClipboardList}
  />
)

export default AlertPolicies
