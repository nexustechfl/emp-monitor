import React from "react";

import CustomTab from "@/components/common/elements/CustomTab";
import CustomSelect from "@/components/common/elements/CustomSelect";

const DashboardFilter = ({
  locations,
  departments,
  locationValue,
  departmentValue,
  tabValue,
  onLocationChange,
  onDepartmentChange,
  onTabChange
}) => {

  return (

    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">

      <CustomTab onChange={onTabChange} value={tabValue} />

      <div className="flex flex-wrap items-center gap-2">

        <CustomSelect
          placeholder="All Locations"
          items={locations}
          selected={locationValue}
          onChange={onLocationChange}
        />

        <CustomSelect
          placeholder="All Departments"
          items={departments}
          selected={departmentValue}
          onChange={onDepartmentChange}
        />

      </div>

    </div>

  );

};

export default React.memo(DashboardFilter);