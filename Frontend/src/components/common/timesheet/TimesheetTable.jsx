import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const avatarColors = [
    "bg-blue-500", "bg-cyan-500", "bg-sky-500", "bg-amber-500", "bg-rose-500",
];

const getInitials = (name) =>
    name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

// Column definitions with styling from development design
const COLUMN_DEFS = [
    { key: "email", label: "Email", headClass: "bg-[#CADDFF]", cellClass: "px-4" },
    { key: "empCode", label: "Emp Code", headClass: "bg-[#CADDFF]", cellClass: "px-4" },
    { key: "location", label: "Location", headClass: "bg-[#CADDFF]", cellClass: "px-4" },
    { key: "department", label: "Department", headClass: "bg-[#CADDFF]", cellClass: "px-4" },
    { key: "shift", label: "Shift", headClass: "bg-[#CADDFF]", cellClass: "px-4" },
    { key: "computerName", label: "Computer Name", headClass: "bg-[#CADDFF]", cellClass: "px-4" },
    { key: "clockIn", label: "Clock In", headClass: "text-white bg-[#0F79F3]/90 text-center", cellClass: "text-center px-4 whitespace-nowrap" },
    { key: "clockOut", label: "Clock Out", headClass: "text-white bg-blue-800 text-center", cellClass: "text-center px-4 whitespace-nowrap" },
    { key: "checkInIp", label: "Check-In IP", headClass: "bg-[#CADDFF]", cellClass: "text-center px-4" },
    { key: "checkOutIp", label: "Check-Out IP", headClass: "bg-[#CADDFF]", cellClass: "text-center px-4" },
    { key: "totalTime", label: "Total Hours", headClass: "bg-[#CADDFF]", cellClass: "text-center px-4" },
    { key: "officeTime", label: "Office Hours", headClass: "bg-[#CADDFF]", cellClass: "text-center px-4" },
    { key: "activeTime", label: "Active Hours", headClass: "bg-[#CADDFF]", cellClass: "text-center px-4" },
    { key: "productiveTime", label: "Productive", headClass: "bg-[#CADDFF]", cellClass: "text-center px-4" },
    { key: "nonProductiveTime", label: "Unproductive", headClass: "bg-[#CADDFF]", cellClass: "text-center px-4" },
    { key: "neutralTime", label: "Neutral", headClass: "bg-[#CADDFF]", cellClass: "text-center px-4" },
    { key: "idleTime", label: "Idle", headClass: "bg-[#CADDFF]", cellClass: "text-center px-4" },
    { key: "offlineTime", label: "Offline", headClass: "bg-[#CADDFF]", cellClass: "text-center px-4" },
    { key: "breakTime", label: "Break Hours", headClass: "bg-[#CADDFF]", cellClass: "text-center px-4" },
    { key: "productivity", label: "Productivity %", headClass: "bg-[#CADDFF]", cellClass: "text-center px-4 font-semibold" },
    { key: "unproductivity", label: "Unproductivity %", headClass: "bg-[#CADDFF]", cellClass: "text-center px-4 font-semibold" },
    { key: "mobileUsage", label: "Mobile Usage", headClass: "bg-[#CADDFF]", cellClass: "text-center px-4" },
];

function TimesheetTable({ rows, loading, visibleColumns }) {
    const navigate = useNavigate();
    const activeCols = COLUMN_DEFS.filter((col) => visibleColumns.includes(col.key));
    const colCount = activeCols.length + 1; // +1 for sticky name column

    const handleNameClick = (row) => {
        navigate(`/admin/employee-details?id=${row.id}`);
    };

    return (
        <div className="rounded-2xl border border-slate-100 bg-slate-50 overflow-x-auto">
            <Table className="min-w-[1200px] w-full">
                <TableHeader className="h-12">
                    <TableRow className="bg-[#F9F9F9]">
                        <TableHead
                            className="text-sm px-4 font-semibold text-slate-700 border-b border-[#717171]/20 sticky left-0 z-20 bg-[#F9F9F9]"
                        >
                            Name
                        </TableHead>
                        {activeCols.map((col) => (
                            <TableHead
                                key={col.key}
                                className={`text-sm px-4 font-semibold text-slate-700 ${col.headClass || ""}`}
                            >
                                {col.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-[#F9F9F9]">
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={colCount} className="text-center text-sm text-gray-400 py-10">
                                Loading...
                            </TableCell>
                        </TableRow>
                    ) : rows.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={colCount} className="text-center text-sm text-gray-400 py-10">
                                No records found
                            </TableCell>
                        </TableRow>
                    ) : (
                        rows.map((row, idx) => (
                            <TableRow key={`${row.id}-${idx}`} className="text-xs text-[#121212]">
                                <TableCell
                                    className="border-r border-[#717171]/20 px-4 sticky left-0 z-10 bg-[#F9F9F9] min-w-[180px]"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-7 h-7 rounded-full ${avatarColors[idx % avatarColors.length]} flex items-center justify-center text-[10px] font-semibold text-white shrink-0`}
                                        >
                                            {getInitials(row.name)}
                                        </div>
                                        <button
                                            onClick={() => handleNameClick(row)}
                                            className="truncate text-blue-600 hover:text-blue-800 hover:underline text-left"
                                            title="View Full Details"
                                        >
                                            {row.name}
                                        </button>
                                    </div>
                                </TableCell>
                                {activeCols.map((col) => (
                                    <TableCell key={col.key} className={col.cellClass || "px-4"}>
                                        {row[col.key] ?? "-"}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default React.memo(TimesheetTable);
