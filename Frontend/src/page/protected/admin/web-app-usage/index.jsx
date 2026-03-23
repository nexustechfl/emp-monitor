import React from 'react'
import { Globe } from 'lucide-react'
import EmpWebAppUsage from '@/components/common/web-app-usage/EmpWebAppUsage'

const Placeholder = ({ title, description, Icon }) => (
  <div className="bg-slate-200 w-full min-h-screen p-5">
    <EmpWebAppUsage />
  </div>
)

const WebAppUsage = () => (
  <Placeholder
    title="Web App Usage"
    description="Detailed breakdown of web and application usage by employees."
    Icon={Globe}
  />
)

export default WebAppUsage
