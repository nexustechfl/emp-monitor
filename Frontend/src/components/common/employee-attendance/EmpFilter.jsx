import React from "react";
import CustomSelect from "@/components/common/elements/CustomSelect";
import { Label } from "@/components/ui/label";

const EmpFilter = ({
  months,
  locations,
  departments,
  shifts,
  monthValue,
  locationValue,
  departmentValue,
  shiftValue,
  onMonthChange,
  onLocationChange,
  onDepartmentChange,
  onShiftChange,
}) => {
  const safeMonthValue = months?.some(
    (m) => String(m.value) === String(monthValue),
  )
    ? monthValue
    : undefined;

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div>
        <Label className="text-xs font-medium text-slate-500 mb-1.5 block">
          Month/Year
        </Label>
        <CustomSelect
          placeholder="All Month"
          items={months}
          selected={safeMonthValue}
          onChange={(value) => onMonthChange(value)}
        />
      </div>

      <div>
        <Label className="text-xs font-medium text-slate-500 mb-1.5 block">
          Location
        </Label>
        <CustomSelect
          placeholder="All Location"
          items={locations}
          selected={locationValue}
          onChange={(value) => onLocationChange(value)}
          width="w-55 2xl:w-65"
        />
      </div>

      <div>
        <Label className="text-xs font-medium text-slate-500 mb-1.5 block">
          Department
        </Label>
        <CustomSelect
          placeholder="All Department"
          items={departments}
          selected={departmentValue}
          onChange={(value) => onDepartmentChange(value)}
          width="w-55 2xl:w-65"
        />
      </div>

      <div>
        <Label className="text-xs font-medium text-slate-500 mb-1.5 block">
          Shift
        </Label>
        <CustomSelect
          placeholder="All Shift"
          items={shifts}
          selected={shiftValue}
          onChange={(value) => onShiftChange(value)}
          width="w-55 2xl:w-65"
        />
      </div>
    </div>
  );
};

export default React.memo(EmpFilter);
