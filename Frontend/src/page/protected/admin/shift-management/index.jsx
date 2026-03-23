import React from 'react'
import { CalendarClock } from 'lucide-react'
import EmpShiftManagement from '@/components/common/shift-management/EmpShiftManagement'

const Placeholder = ({ title, description, Icon }) => (
  <div className="bg-slate-200 w-full min-h-screen p-5">
    <EmpShiftManagement />
  </div>
)

const ShiftManagement = () => (
  <Placeholder
    title="Shift Management"
    description="Configure work shifts and assign them to employees or departments."
    Icon={CalendarClock}
  />
)

export default ShiftManagement
