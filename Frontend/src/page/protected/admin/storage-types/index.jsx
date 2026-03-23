import React from 'react'
import { HardDrive } from 'lucide-react'

const Placeholder = ({ title, description, Icon }) => (
  <div className="bg-slate-200 w-full min-h-screen p-5">
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 flex flex-col items-center justify-center text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
        <Icon className="w-8 h-8 text-slate-600" />
      </div>
      <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      <p className="text-sm text-gray-400 max-w-sm">{description}</p>
      <span className="mt-2 inline-block rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold text-slate-600">
        Coming Soon
      </span>
    </div>
  </div>
)

const StorageTypes = () => (
  <Placeholder
    title="Storage Types"
    description="Configure storage backends and data retention policies."
    Icon={HardDrive}
  />
)

export default StorageTypes
