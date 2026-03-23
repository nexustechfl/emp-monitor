import apiService from "@/services/api.service";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// ─── Shared Filter APIs ─────────────────────────────────────────────────────

export const getLocations = async () => {
    try {
        const { data } = await apiService.apiInstance.post("/location/get-locations");
        let items = [{ value: "all", label: "All Locations" }];
        if (data?.data?.length) {
            items = [...items, ...data.data.map((loc) => ({ value: loc.id, label: loc.name }))];
        }
        return items;
    } catch (error) {
        console.error("DLP: Locations API Error:", error);
        return [{ value: "all", label: "All Locations" }];
    }
};

export const getDepartments = async (locationId) => {
    try {
        const endpoint = locationId && locationId !== "all"
            ? "/location/get-department-by-location"
            : "/location/get-locations-dept";
        const payload = locationId && locationId !== "all" ? { location_id: locationId } : {};

        const { data } = await apiService.apiInstance.post(endpoint, payload);
        let items = [{ value: "all", label: "All Departments" }];

        if (locationId && locationId !== "all") {
            if (data?.data?.length) {
                items = [...items, ...data.data.map((d) => ({ value: d.department_id, label: d.name }))];
            }
        } else if (Array.isArray(data?.data)) {
            const deptMap = new Map();
            data.data.forEach((loc) => {
                (loc.department || []).forEach((dept) => {
                    if (!deptMap.has(dept.department_id)) {
                        deptMap.set(dept.department_id, { value: String(dept.department_id), label: dept.name });
                    }
                });
            });
            items = [...items, ...Array.from(deptMap.values())];
        }
        return items;
    } catch (error) {
        console.error("DLP: Departments API Error:", error);
        return [{ value: "all", label: "All Departments" }];
    }
};

export const getEmployeeList = async ({ locationId, departmentId } = {}) => {
    try {
        const { data } = await apiService.apiInstance.post("/user/fetch-users", {
            status: "",
            shift_id: -1,
            location_id: locationId && locationId !== "all" ? locationId : "",
            department_id: departmentId && departmentId !== "all" ? departmentId : "",
            role_id: "",
            day: new Date().toISOString().slice(0, 10),
            limit: 500,
            skip: 0,
            name: "",
        });

        const users = Array.isArray(data?.data?.user_data) ? data.data.user_data : [];
        let items = [{ value: "all", label: "All Employees" }];
        items = [...items, ...users.map((emp) => ({
            value: String(emp.id ?? emp.u_id),
            label: emp.full_name || emp.name || emp.email || `Employee ${emp.id}`,
        }))];
        return items;
    } catch (error) {
        console.error("DLP: Employee List API Error:", error);
        return [{ value: "all", label: "All Employees" }];
    }
};

// ─── Shared Export Utilities ────────────────────────────────────────────────

export const exportToCsv = async ({ rows, headers, buildRow, sheetName, fileName }) => {
    try {
        const dataRows = rows.map(buildRow);
        const sheetData = [headers, ...dataRows];

        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        XLSX.writeFile(workbook, fileName);

        return { success: true };
    } catch (error) {
        console.error("CSV Export Error:", error);
        return { success: false };
    }
};

export const exportToPdf = async ({ rows, headers, buildRow, title, fileName, dateRange }) => {
    try {
        const dataRows = rows.map(buildRow);
        const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

        doc.setFontSize(14);
        doc.text(title, 40, 30);
        doc.setFontSize(9);
        doc.text(`Date Range: ${dateRange}`, 40, 45);

        autoTable(doc, {
            head: [headers],
            body: dataRows,
            startY: 60,
            styles: { fontSize: 7, cellPadding: 3 },
            headStyles: { fillColor: [59, 130, 246], textColor: 255, fontStyle: "bold" },
            alternateRowStyles: { fillColor: [248, 250, 252] },
            margin: { left: 20, right: 20 },
        });

        doc.save(fileName);
        return { success: true };
    } catch (error) {
        console.error("PDF Export Error:", error);
        return { success: false };
    }
};
