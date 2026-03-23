import React, { useEffect, useState } from "react";
import EmployeeDetailsTable from "@/components/common/employee-details/EmployeeDetails";
import EmployeeFilter from "@/components/common/employee-details/EmployeeFilter";
import { fetchEmployees, mapEmployeeForTable } from "./service";

const LOCATIONS = [
  { value: "all", label: "All Locations" },
];

const DEPARTMENTS = [
  { value: "all", label: "All Departments" },
];

const ROLES = [
  { value: "all", label: "All Roles" },
];

const SHIFTS = [
  { value: "all", label: "All Shifts" },
];

const EmployeeDetails = () => {
  const [locationValue, setLocationValue] = useState("all");
  const [departmentValue, setDepartmentValue] = useState("all");
  const [roleValue, setRoleValue] = useState("all");
  const [shiftValue, setShiftValue] = useState("all");

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const { employees: rawEmployees } = await fetchEmployees({
        locationId: locationValue === "all" ? "" : locationValue,
        departmentId: departmentValue === "all" ? "" : departmentValue,
        roleId: roleValue === "all" ? "" : roleValue,
        shiftId: shiftValue === "all" ? -1 : shiftValue
      });

      const mapped = rawEmployees.map((emp, idx) =>
        mapEmployeeForTable(emp, idx)
      );

      setEmployees(mapped);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationValue, departmentValue, roleValue, shiftValue]);

  return (
    <div className="bg-slate-200 w-full p-5">
      <EmployeeDetailsTable
        employees={employees}
        loading={loading}
        filter={
          <EmployeeFilter
            locations={LOCATIONS}
            departments={DEPARTMENTS}
            locationValue={locationValue}
            departmentValue={departmentValue}
            onLocationChange={setLocationValue}
            onDepartmentChange={setDepartmentValue}
            onRoleChange={setRoleValue}
            onShiftChange={setShiftValue}
            roles={ROLES}
            shifts={SHIFTS}
            roleValue={roleValue}
            shiftValue={shiftValue}
          />
        }
      />
    </div>
  );
};

export default EmployeeDetails;