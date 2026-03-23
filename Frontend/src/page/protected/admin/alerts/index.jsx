import React from 'react'
import { BellRing } from 'lucide-react'
import EmpAlerts from '@/components/common/alerts/EmpAlerts'

const Placeholder = ({ title, description, Icon }) => (
  <div className="bg-slate-200 w-full min-h-screen p-5">
   <EmpAlerts />
  </div>
)

const Alerts = () => (
  <Placeholder
    title="Alerts"
    description="View and manage triggered behaviour alerts across the organization."
    Icon={BellRing}
  />
)

export default Alerts
