import React from 'react'
import CustomSelect from "@/components/common/elements/CustomSelect"
import { Label } from '@/components/ui/label'

const EmployeeFilter = ({
  locations,
  departments,
  shifts,
  roles,
  locationValue,
  departmentValue,
  shiftValue,
  roleValue,
  onLocationChange,
  onDepartmentChange,
  onShiftChange,
  onRoleChange,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <div>
        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">All Roles</Label>
        <CustomSelect
          placeholder="All Roles"
          items={roles}
          selected={roleValue}
          onChange={onRoleChange}
        />
      </div>
      <div>
        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">All Locations</Label>
        <CustomSelect
          placeholder="All Locations"
          items={locations}
          selected={locationValue}
          onChange={onLocationChange}
        />
      </div>
      <div>
        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">All Departments</Label>
        <CustomSelect
          placeholder="All Departments"
          items={departments}
          selected={departmentValue}
          onChange={onDepartmentChange}
        />
      </div>
      <div>
        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">All Shifts</Label>
        <CustomSelect
          placeholder="All Shifts"
          items={shifts}
          selected={shiftValue}
          onChange={onShiftChange}
        />
      </div>
    </div>
  )
}

export default EmployeeFilter
