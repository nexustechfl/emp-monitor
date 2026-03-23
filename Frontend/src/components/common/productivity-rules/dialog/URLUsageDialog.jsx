import React, { useEffect, useState, useCallback } from "react";
import { BarChart3, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useProductivityRulesStore } from "@/page/protected/admin/productivity-rules/productivityRulesStore";
import moment from "moment";

const URLUsageDialog = () => {
    const {
        urlUsageDialogOpen,
        closeURLUsageDialog,
        urlUsageAppName,
        urlUsageData,
        urlUsageLoading,
        urlUsageFilters,
        setURLUsageFilter,
        locations,
        fetchDeptsByLocation,
        fetchEmployeesByLocDept,
    } = useProductivityRulesStore();

    const [depts, setDepts] = useState([]);
    const [emps, setEmps] = useState([]);
    const [dateRange, setDateRange] = useState({
        start: urlUsageFilters.startDate,
        end: urlUsageFilters.endDate,
    });

    useEffect(() => {
        if (urlUsageDialogOpen) {
            setDateRange({
                start: urlUsageFilters.startDate,
                end: urlUsageFilters.endDate,
            });
        }
    }, [urlUsageDialogOpen]);

    const handleLocationChange = useCallback(async (val) => {
        setURLUsageFilter("locationId", val === "all" ? null : val);
        setURLUsageFilter("departmentId", null);
        setURLUsageFilter("employeeId", null);
        if (val && val !== "all") {
            const d = await fetchDeptsByLocation(val);
            setDepts(d);
        } else {
            setDepts([]);
        }
        setEmps([]);
    }, [setURLUsageFilter, fetchDeptsByLocation]);

    const handleDeptChange = useCallback(async (val) => {
        setURLUsageFilter("departmentId", val === "all" ? null : val);
        setURLUsageFilter("employeeId", null);
        const e = await fetchEmployeesByLocDept(
            urlUsageFilters.locationId,
            val === "all" ? null : val
        );
        setEmps(e);
    }, [setURLUsageFilter, fetchEmployeesByLocDept, urlUsageFilters.locationId]);

    const handleEmployeeChange = useCallback((val) => {
        setURLUsageFilter("employeeId", val === "all" ? null : val);
    }, [setURLUsageFilter]);

    const handleDateChange = (key, val) => {
        const updated = { ...dateRange, [key]: val };
        setDateRange(updated);
        setURLUsageFilter(key === "start" ? "startDate" : "endDate", val);
    };

    return (
        <Dialog open={urlUsageDialogOpen} onOpenChange={(open) => !open && closeURLUsageDialog()}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-500" />
                        <DialogTitle>Time Usage</DialogTitle>
                    </div>
                    <DialogDescription>
                        Activity: <span className="font-semibold text-slate-700">{urlUsageAppName}</span>
                    </DialogDescription>
                </DialogHeader>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 py-2">
                    {/* Location */}
                    <div>
                        <label className="text-xs font-semibold text-slate-600 mb-1 block">Location</label>
                        <Select
                            value={urlUsageFilters.locationId || "all"}
                            onValueChange={handleLocationChange}
                        >
                            <SelectTrigger className="h-9 text-xs rounded-lg">
                                <SelectValue placeholder="All Locations" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="all">All Locations</SelectItem>
                                {locations.map((loc) => (
                                    <SelectItem key={loc.value} value={loc.value}>{loc.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Department */}
                    <div>
                        <label className="text-xs font-semibold text-slate-600 mb-1 block">Department</label>
                        <Select
                            value={urlUsageFilters.departmentId || "all"}
                            onValueChange={handleDeptChange}
                        >
                            <SelectTrigger className="h-9 text-xs rounded-lg">
                                <SelectValue placeholder="All Departments" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="all">All Departments</SelectItem>
                                {depts.map((d) => (
                                    <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Employee */}
                    <div>
                        <label className="text-xs font-semibold text-slate-600 mb-1 block">Employee</label>
                        <Select
                            value={urlUsageFilters.employeeId || "all"}
                            onValueChange={handleEmployeeChange}
                        >
                            <SelectTrigger className="h-9 text-xs rounded-lg">
                                <SelectValue placeholder="All Employees" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="all">All Employees</SelectItem>
                                {emps.map((e) => (
                                    <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="text-xs font-semibold text-slate-600 mb-1 block">Start Date</label>
                        <input
                            type="date"
                            value={dateRange.start}
                            max={dateRange.end}
                            onChange={(e) => handleDateChange("start", e.target.value)}
                            className="h-9 w-full text-xs rounded-lg border border-slate-200 px-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="text-xs font-semibold text-slate-600 mb-1 block">End Date</label>
                        <input
                            type="date"
                            value={dateRange.end}
                            min={dateRange.start}
                            max={moment().format("YYYY-MM-DD")}
                            onChange={(e) => handleDateChange("end", e.target.value)}
                            className="h-9 w-full text-xs rounded-lg border border-slate-200 px-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-slate-100 overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className="bg-blue-50/80">
                                <th className="px-3 py-2.5 text-xs font-semibold text-slate-700 text-left">Name</th>
                                <th className="px-3 py-2.5 text-xs font-semibold text-slate-700 text-left">Email</th>
                                <th className="px-3 py-2.5 text-xs font-semibold text-slate-700 text-left">Location</th>
                                <th className="px-3 py-2.5 text-xs font-semibold text-slate-700 text-left">Department</th>
                                <th className="px-3 py-2.5 text-xs font-semibold text-slate-700 text-left">Productive</th>
                                <th className="px-3 py-2.5 text-xs font-semibold text-slate-700 text-left">Unproductive</th>
                                <th className="px-3 py-2.5 text-xs font-semibold text-slate-700 text-left">Neutral</th>
                                <th className="px-3 py-2.5 text-xs font-semibold text-slate-700 text-left">Idle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urlUsageLoading ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-10">
                                        <Loader2 className="w-6 h-6 animate-spin text-blue-500 mx-auto" />
                                    </td>
                                </tr>
                            ) : urlUsageData.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center text-sm text-gray-400 py-10">
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                urlUsageData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={`border-t border-slate-100 ${row.isSuspended ? "bg-amber-50" : ""}`}
                                    >
                                        <td className="px-3 py-2 text-xs text-slate-700">{row.name}</td>
                                        <td className="px-3 py-2 text-xs text-slate-500">{row.email}</td>
                                        <td className="px-3 py-2 text-xs text-slate-500">{row.location}</td>
                                        <td className="px-3 py-2 text-xs text-slate-500">{row.department}</td>
                                        <td className="px-3 py-2 text-xs text-emerald-600 font-medium">{row.productive}</td>
                                        <td className="px-3 py-2 text-xs text-red-500 font-medium">{row.unproductive}</td>
                                        <td className="px-3 py-2 text-xs text-amber-600 font-medium">{row.neutral}</td>
                                        <td className="px-3 py-2 text-xs text-slate-500 font-medium">{row.idle}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end pt-2">
                    <Button variant="outline" onClick={closeURLUsageDialog} className="rounded-xl">
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default URLUsageDialog;
