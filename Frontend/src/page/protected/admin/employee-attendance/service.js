import apiService from "@/services/api.service";
import * as XLSX from "xlsx";

const formatMonthYear = (dateValue) => {
  if (!dateValue) return "Unknown";

  const str = dateValue.toString();
  const year = str.slice(0, 4);
  const month = str.slice(4, 6);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${months[Number(month) - 1]}_${year}`;
};

export const getAttendanceLocations = async () => {
  try {
    const { data } = await apiService.apiInstance.post(
      `/location/get-locations`,
      { role_id: 0 },
    );

    let temp = [{ value: "all", label: "All Locations" }];

    if (Array.isArray(data?.data)) {
      const locations = data.data.map((loc) => ({
        value: loc.id,
        label: loc.name,
        timezone: loc.timezone,
      }));

      temp = [...temp, ...locations];
    }

    return {
      stats: temp,
      raw: data,
    };
  } catch (error) {
    return {
      stats: [],
      raw: null,
    };
  }
};

export const getAttendanceDepartments = async ({ locationId } = {}) => {
  try {
    if (!locationId) {
      return {
        stats: [{ value: "all", label: "All Departments" }],
        raw: null,
      };
    }

    const { data } = await apiService.apiInstance.post(
      `/location/get-department-by-location`,
      {
        id: locationId === "all" ? 0 : Number(locationId),
      },
    );

    let temp = [{ value: "all", label: "All Departments" }];

    if (Array.isArray(data?.data)) {
      const departments = data.data.map((dept) => ({
        value: String(dept.department_id),
        label: dept.name,
      }));

      temp = [...temp, ...departments];
    } else {
    }

    return {
      stats: temp,
      raw: data,
    };
  } catch (error) {
    return {
      stats: [],
      raw: null,
    };
  }
};

export const getAttendance = async ({
  date,
  locationId = "all",
  departmentId = "all",
  skip = 0,
  limit = 10,
  search = "",
  sortColumn = "name",
  sortOrder = "D",
  nonAdminId,
} = {}) => {
  try {
    const params = {
      date,
      skip,
      limit,
      sortColumn,
      sortOrder,
    };

    if (search) params.search = search;

    if (locationId && locationId !== "all") {
      params.locationId = Number(locationId);
    }

    if (departmentId && departmentId !== "all") {
      params.departmentId = Number(departmentId);
    }

    if (nonAdminId) {
      params.nonAdminId = nonAdminId;
    }

    const { data } = await apiService.apiInstance.get(`/employee/attendance`, {
      params,
    });

    const monthKey = String(date);

    const list = data?.data?.[monthKey] || [];

    const formattedList = list.map((item) => ({
      ...item,
      department: item.department ?? item.departament ?? "-",
    }));

    return {
      stats: formattedList,
      pageCount: data?.data?.pageCount || 0,
      empCount: data?.data?.empCount || 0,
      raw: data,
    };
  } catch (error) {
    return {
      stats: [],
      pageCount: 0,
      empCount: 0,
      raw: null,
    };
  }
};

export const getShifts = async () => {
  try {
    const { data } = await apiService.apiInstance.get(
      `/organization-shift/find_by`,
    );

    let temp = [{ value: "all", label: "All Shifts" }];

    if (Array.isArray(data?.data)) {
      const shifts = data.data.map((shift) => ({
        value: shift.id,
        label: shift.name,
        raw: shift,
      }));

      temp = [...temp, ...shifts];
    }

    return {
      stats: temp,
      raw: data,
    };
  } catch (error) {
    return {
      stats: [],
      raw: null,
    };
  }
};

export const exportAttendanceExcel = async (params = {}) => {
  try {
    delete params.limit;
    delete params.skip;

    const response = await apiService.apiInstance.get(`/employee/attendance`, {
      params,
    });

    const rawData = response.data?.data;

    if (!rawData) {
      return { success: false };
    }

    const monthYear = formatMonthYear(params.date);
    const fileName = `Employees_Attendance_${monthYear}.xlsx`;

    const headerMap = {
      P: "Present",
      A: "Absent",
      L: "Late",
      H: "Half_Leave",
      O: "Overtime",
      D: "Day-Off",
      EL: "Early-Logout",
      shift: "Shift",
      date: "Date",
    };

    const formattedData = Object.values(rawData)
      .filter((val) => Array.isArray(val))
      .flat()
      .map((item) => {
        const newItem = {};

        Object.keys(item).forEach((key) => {
          const lowerKey = key.toLowerCase();

          if (lowerKey.includes("shift") || lowerKey === "date") {
            return;
          }

          let newKey = headerMap[key] || key;
          let value = item[key];

          newItem[newKey] =
            value === null || value === undefined || value === "" ? "-" : value;
        });

        newItem["Shift"] = "-";
        newItem["Date"] = "-";

        return newItem;
      });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, fileName);

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
