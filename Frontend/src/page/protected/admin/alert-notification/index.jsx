import React from 'react'
import { BellDot } from 'lucide-react'
import EmpAlertNotification from '@/components/common/alert-notification/EmpAlertNotification'

const Placeholder = ({ title, description, Icon }) => (
  <div className="bg-slate-200 w-full min-h-screen p-5">
   <EmpAlertNotification />
  </div>
)

const AlertNotification = () => (
  <Placeholder
    title="Alert Notification"
    description="Manage how and where alert notifications are delivered."
    Icon={BellDot}
  />
)

export default AlertNotification
