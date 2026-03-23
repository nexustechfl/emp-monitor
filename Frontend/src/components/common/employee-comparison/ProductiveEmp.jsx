import React from 'react'
import CustomSelect from "@/components/common/elements/CustomSelect"

const ProductiveEmp = ({
  employees,
  employeeValue,
  onEmployeeChange,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
}) => {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <div>
        <p className="text-xs font-semibold text-slate-600 mb-1.5">Employee:-</p>
        <CustomSelect
          placeholder="See All Employee"
          items={employees}
          selected={employeeValue}
          onChange={onEmployeeChange}
        />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-600 mb-1.5">Select Date:-</p>
        <div className="flex items-center gap-1 border border-input rounded-md px-3 h-10 bg-transparent text-xs">
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            className="outline-none text-xs bg-transparent text-slate-700"
          />
          <span className="text-gray-400 px-1">-</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            className="outline-none text-xs bg-transparent text-slate-700"
          />
        </div>
      </div>
    </div>
  )
}

export default ProductiveEmp
