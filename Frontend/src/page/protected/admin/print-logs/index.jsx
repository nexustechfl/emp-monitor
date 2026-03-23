import React from 'react'
import { Printer } from 'lucide-react'
import EmpPrintLogs from '@/components/common/print-logs/EmpPrintLogs'

const Placeholder = ({ title, description, Icon }) => (
  <div className="bg-slate-200 w-full min-h-screen p-5">
    <EmpPrintLogs />
  </div>
)

const PrintLogs = () => (
  <Placeholder
    title="Print Logs"
    description="Monitor all print jobs sent from employee machines."
    Icon={Printer}
  />
)

export default PrintLogs
