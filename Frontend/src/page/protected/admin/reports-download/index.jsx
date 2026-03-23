import React from 'react'
import { Download } from 'lucide-react'
import EmpReportsDownload from '@/components/common/reports-download/EmpReportsDownload'

const Placeholder = ({ title, description, Icon }) => (
  <div className="bg-slate-200 w-full min-h-screen p-5">
    <EmpReportsDownload />
  </div>
)

const ReportsDownload = () => (
  <Placeholder
    title="Reports Download"
    description="Download detailed reports in various formats for offline analysis."
    Icon={Download}
  />
)

export default ReportsDownload
