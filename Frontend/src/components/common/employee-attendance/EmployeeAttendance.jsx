import React, { useEffect, useRef, useState } from "react";
import { useAttendanceStore } from "@/page/protected/admin/employee-attendance/AttendanceStore";
import { Download, Search } from "lucide-react";
import attendanceImage from "@/assets/calendar.png";
import EmpFilter from "@/components/common/employee-attendance/EmpFilter";
import PaginationComponent from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MONTHS = [
  { label: "Jan/2026", value: 202601 },
  { label: "Feb/2026", value: 202602 },
  { label: "Mar/2026", value: 202603 },
];

const EmployeeAttendance = () => {
  const {
    attendance,
    locations,
    departments,
    shifts,
    filters,
    setFilter,
    loadAttendance,
    fetchDepartments,
    fetchAttendance,
    pageCount,
    empCount,
  } = useAttendanceStore((state) => state);

  const isFirstRender = useRef(true);

  const [searchInput, setSearchInput] = useState(filters.search);

  const { exportAttendance } = useAttendanceStore();

  useEffect(() => {
    loadAttendance();
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [filters.locationId]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fetchAttendance();
  }, [filters]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setFilter("search", searchInput);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchInput]);

  const handleExport = () => {
    exportAttendance();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-9 w-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="border-l-2 border-blue-500 pl-4">
          <h2 className="text-2xl text-slate-900">
            <span className="font-black">Attendance</span>{" "}
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-sm leading-tight">
            &quot;Lorem ipsum quia dolor sit porro quisquam est qui amet
            consectetur adipisci&quot;
          </p>
        </div>
        <div className="flex items-end gap-1 mr-2">
          <img src={attendanceImage} alt="attendance" className="w-42 h-32" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <EmpFilter
          months={MONTHS}
          locations={locations}
          departments={departments}
          shifts={
            shifts.length ? shifts : [{ label: "All Shifts", value: "all" }]
          }
          monthValue={filters.date}
          locationValue={filters.locationId}
          departmentValue={filters.departmentId}
          shiftValue={filters.shiftId}
          onMonthChange={(v) => setFilter("date", Number(v))}
          onLocationChange={(v) => setFilter("locationId", v)}
          onDepartmentChange={(v) => setFilter("departmentId", v)}
          onShiftChange={(v) => setFilter("shiftId", v)}
        />

        <div className="flex items-center gap-3">
          <Button
            size="lg"
            className="rounded-xl bg-blue-500 hover:bg-blue-600 px-5 text-xs font-semibold shadow-sm"
            onClick={handleExport}
          >
            <Download className="w-4 h-4" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Show entries + Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-gray-500 font-medium">Show</span>
          <Select
            value={String(filters.limit)}
            onValueChange={(v) => {
              const num = parseInt(v, 10);
              setFilter("limit", Number.isNaN(num) ? 10 : num);
            }}
          >
            <SelectTrigger className="h-8 w-16 text-[13px] rounded-lg border-gray-200">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {["10", "25", "50", "100"].map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-[13px] text-gray-500 font-medium">Entries</span>
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9 h-10 rounded-full bg-slate-50 border-slate-200 text-xs"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-100 overflow-hidden bg-slate-50">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-blue-50/80">
              <TableHead className="text-xs font-semibold text-slate-700">
                Employee Name
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">
                Location
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">
                Department
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">
                Shift
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">
                Employee Code
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700 text-center">
                1 Thursday
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700 text-center">
                2 Friday
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700 text-center">
                P
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700 text-center">
                L
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {(attendance || []).map((row) => (
              <TableRow key={row.id} className="text-xs text-slate-600">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-semibold text-white">
                      {row.full_name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <span className="truncate max-w-[150px]">
                      {row.full_name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.shift_name || "-"}</TableCell>
                <TableCell>{row.emp_code}</TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">0</TableCell>
                <TableCell className="text-center">0</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3.5 border-t border-gray-100 bg-gray-50/50">
          <p className="text-[13px] text-gray-500 font-medium">
            Showing{" "}
            <span className="font-bold text-gray-700">{filters.skip + 1}</span>{" "}
            to{" "}
            <span className="font-bold text-gray-700">
              {Math.min(filters.skip + filters.limit, empCount)}
            </span>{" "}
            of <span className="font-bold text-blue-600">{empCount}</span>{" "}
            entries
          </p>

          <PaginationComponent
            currentPage={Math.floor(filters.skip / filters.limit) + 1}
            totalPages={pageCount}
            onPageChange={(p) => {
              setFilter("skip", (p - 1) * filters.limit);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
