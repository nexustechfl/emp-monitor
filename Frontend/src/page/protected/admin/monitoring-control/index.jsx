import React from 'react'
import { SlidersHorizontal } from 'lucide-react'
import EmpMonitoringControl from '@/components/common/monitoring-control/EmpMonitoringControl'

const Placeholder = ({ title, description, Icon }) => (
  <div className="bg-slate-200 w-full min-h-screen p-5">
   <EmpMonitoringControl />
  </div>
)

const MonitoringControl = () => (
  <Placeholder
    title="Monitoring Control"
    description="Control monitoring settings, screenshot intervals and data collection policies."
    Icon={SlidersHorizontal}
  />
)

export default MonitoringControl
