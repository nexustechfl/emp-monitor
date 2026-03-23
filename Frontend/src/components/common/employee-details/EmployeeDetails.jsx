import { useMemo, useState } from "react";
import {
  UserPlus, Upload, RefreshCw, UserCheck, UserX, Trash2,
  Download, Search, Settings, ArrowUpDown, Eye, Edit, Trash,
  Monitor,
  FileDiff,
  FileBox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import employee from "@/assets/employe.png";

import PaginationComponent from "@/components/common/Pagination";
import './emp.css';

/**
 * Table now receives real employees data from API via props.
 * Fallback to empty array if nothing is provided.
 */

const avatarColors = [
  "bg-blue-500", "bg-emerald-500", "bg-violet-500",
  "bg-orange-400", "bg-rose-500", "bg-teal-500", "bg-cyan-500",
];

const RowAvatar = ({ name, idx }) => {
  const color = avatarColors[idx % avatarColors.length];
  return (
    <div className={`w-7 h-7 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

export default function EmployeeDetailsTable({ filter, employees = [], loading = false }) {
  const [activeTab,       setActiveTab]       = useState("active");
  const [selectedRows,    setSelectedRows]    = useState([]);
  const [searchQuery,     setSearchQuery]     = useState("");
  const [currentPage,     setCurrentPage]     = useState(1);
  const [entriesPerPage,  setEntriesPerPage]  = useState("10");

  const perPage = Number(entriesPerPage);

  const { filtered, paginated, totalPages } = useMemo(() => {
    const list = Array.isArray(employees) ? employees : [];

    const filteredList = list.filter((e) =>
      (e.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const total = Math.max(1, Math.ceil(filteredList.length / perPage));

    const start = (currentPage - 1) * perPage;
    const end = currentPage * perPage;

    return {
      filtered: filteredList,
      paginated: filteredList.slice(start, end),
      totalPages: total
    };
  }, [employees, searchQuery, currentPage, perPage]);

  const toggleRow = (id) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );

  const toggleAll = () =>
    setSelectedRows((prev) =>
      prev.length === paginated.length ? [] : paginated.map((e) => e.id)
    );

  return (
    <div className="space-y-4">
      {/* ── Header Card ── */}
      <div className="emp-card p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img src={employee} alt="employee" className="w-50 h-50" />
            <div className="border-l-[3px] border-blue-500 pl-3 min-w-0">
              <h1
                className="text-2xl font-bold text-gray-800"
              >
                <span className="font-extrabold">Employee</span>{" "}
                <span className="text-gray-500 font-medium">Details</span>
              </h1>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed line-clamp-2">
                Manage and monitor all registered employees in one place.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5">
            <Button
              className="gradient-btn group flex items-center gap-2 text-white text-[13px] h-12 px-3 py-2 rounded-xl border-none shadow-md 
                transition-all duration-300 ease-out 
                hover:-translate-y-1 hover:shadow-xl hover:scale-[1.03] active:scale-95"
            >
              <UserPlus
                size={20}
                className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
              />
              <span className="hidden sm:inline">Register Employee</span>
              <span className="sm:hidden">Register</span>
            </Button>

            <Button
              className="gradient-btn group flex items-center gap-2 text-white text-[13px] h-12 px-3 py-2 rounded-xl border-none shadow-md 
                transition-all duration-300 ease-out 
                hover:-translate-y-1 hover:shadow-xl hover:scale-[1.03] active:scale-95"
            >
              <FileDiff 
                size={20}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
              />
              <span className="hidden sm:inline">Bulk Register</span>
              <span className="sm:hidden">Bulk</span>
            </Button>

            <Button
              className="gradient-btn group flex items-center gap-2 text-white text-[13px] h-12 px-3 py-2 rounded-xl border-none shadow-md 
                transition-all duration-300 ease-out 
                 hover:-translate-y-1 hover:shadow-xl hover:scale-[1.03] active:scale-95"
            >
              <FileBox
                size={20}
                className="transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110"
              />
              <span className="hidden sm:inline">Bulk Update</span>
              <span className="sm:hidden">Update</span>
            </Button>
          </div>
        </div>

        {/* ── Status Tabs ── */}
        <div className="flex flex-wrap gap-2 mt-1 justify-end">
          {[
            {
              key: "active",
              label: "Active",
              icon: <UserCheck size={15} />,
              cls: "",
            },
            {
              key: "suspended",
              label: "Suspended",
              icon: <UserX size={15} />,
              cls: "",
            },
            {
              key: "deleted",
              label: "Deleted user history",
              icon: <Trash2 size={15} />,
              cls: "tab-deleted",
            },
          ].map(({ key, label, icon, cls }) => (
            <Button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-2 py-3 rounded-lg text-[14px] font-semibold transition-all duration-200 ${
                cls || (activeTab === key ? "tab-active" : "tab-inactive")
              }`}
            >
              {icon}
              {label}
            </Button>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="mt-4">{filter}</div>

        {/* ── Table Toolbar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-gray-500 font-medium">Show</span>
            <Select
              value={entriesPerPage}
              onValueChange={(v) => {
                setEntriesPerPage(v);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-8 w-16 text-[13px] rounded-lg border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {["10", "25", "50", "100"].map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-[13px] text-gray-500 font-medium">
              Entries
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-9 gap-2 text-[13px] font-semibold text-blue-600 border-blue-200 hover:border-blue-400 hover:bg-blue-50 rounded-xl px-3"
            >
              <Download size={14} />
              Export
            </Button>
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 h-9 text-[13px] w-44 sm:w-52 rounded-xl border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="tbl-scroll w-full p-3">
          <Table className="min-w-[900px] bg-gray-100 rounded-4xl">
            <TableHeader>
              <TableRow className="border-b-2 border-blue-100">
                <TableHead className="emp-th w-10 pl-4">
                  <Checkbox
                    checked={
                      selectedRows.length === paginated.length &&
                      paginated.length > 0
                    }
                    onCheckedChange={toggleAll}
                    className="border-blue-300"
                  />
                </TableHead>
                <TableHead className="emp-th pl-3 py-3">Full Name</TableHead>
                <TableHead className="emp-th">Email Id</TableHead>
                <TableHead className="emp-th">Location</TableHead>
                <TableHead className="emp-th">Department</TableHead>
                <TableHead className="emp-th">Shift</TableHead>
                <TableHead className="emp-th">Role</TableHead>
                <TableHead className="emp-th">Emp-Code</TableHead>
                <TableHead className="emp-th">OS</TableHead>
                <TableHead className="emp-th">Computer Name</TableHead>
                <TableHead className="emp-th">Version</TableHead>
                <TableHead className="emp-th text-center">Detail</TableHead>
                <TableHead
                  className="text-center pr-4 text-white text-[12px] font-semibold rounded-tr-xl"
                  style={{
                    background: "linear-gradient(135deg,#3b82f6,#2563eb)",
                  }}
                >
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={12} className="py-6 text-center text-sm text-gray-500">
                    Loading employees...
                  </TableCell>
                </TableRow>
              )}

              {!loading && paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={12} className="py-6 text-center text-sm text-gray-500">
                    No employees found.
                  </TableCell>
                </TableRow>
              )}

              {!loading && paginated.map((emp, idx) => (
                <TableRow
                  key={emp.id}
                  className={`tr-hover border-b border-gray-50 transition-colors duration-100 ${
                    selectedRows.includes(emp.id) ? "bg-blue-50/60" : ""
                  }`}
                >
                  <TableCell className="pl-4 py-2.5">
                    <Checkbox
                      checked={selectedRows.includes(emp.id)}
                      onCheckedChange={() => toggleRow(emp.id)}
                      className="border-blue-300"
                    />
                  </TableCell>
                  <TableCell className="pl-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <RowAvatar name={emp.name} idx={idx} />
                      <span className="text-[13px] font-medium text-gray-700 whitespace-nowrap">
                        {emp.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[13px] text-gray-400 py-2.5 whitespace-nowrap">
                    {emp.email}
                  </TableCell>
                  <TableCell className="text-[13px] text-gray-600 py-2.5 whitespace-nowrap">
                    {emp.location}
                  </TableCell>
                  <TableCell className="text-[13px] text-gray-600 py-2.5 whitespace-nowrap">
                    {emp.department}
                  </TableCell>
                  <TableCell className="text-[13px] text-gray-400 py-2.5 whitespace-nowrap">
                    {emp.shift}
                  </TableCell>
                  <TableCell className="py-2.5">
                    <Badge
                      variant="secondary"
                      className="text-[11px] font-semibold bg-blue-50 text-blue-600 border-0 rounded-lg px-2.5 whitespace-nowrap"
                    >
                      {emp.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[13px] text-gray-600 py-2.5 whitespace-nowrap">
                    {emp.empCode}
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex items-center gap-1.5">
                      <Monitor
                        size={13}
                        className="text-blue-400 flex-shrink-0"
                      />
                      <span className="text-[13px] text-gray-600 whitespace-nowrap">
                        {emp.os}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[13px] text-gray-600 py-2.5 whitespace-nowrap">
                    {emp.computer}
                  </TableCell>
                  <TableCell className="py-2.5">
                    <span className="text-[13px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg whitespace-nowrap">
                      {emp.version}
                    </span>
                  </TableCell>
                  <TableCell className="text-center py-2.5">
                    <button className="action-icon bg-blue-50 text-blue-500 hover:bg-blue-100 mx-auto">
                      <Download size={13} />
                    </button>
                  </TableCell>
                  <TableCell className="py-2.5 pr-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        className="action-icon bg-gray-100 text-gray-500 hover:bg-gray-200"
                        title="Settings"
                      >
                        <Settings size={13} />
                      </button>
                      <button
                        className="action-icon bg-blue-50 text-blue-500 hover:bg-blue-100"
                        title="Transfer"
                      >
                        <ArrowUpDown size={13} />
                      </button>
                      <button
                        className="action-icon bg-emerald-50 text-emerald-500 hover:bg-emerald-100"
                        title="Edit"
                      >
                        <Edit size={13} />
                      </button>
                      <button
                        className="action-icon bg-rose-50 text-rose-500 hover:bg-rose-100"
                        title="Delete"
                      >
                        <Trash size={13} />
                      </button>
                      <button
                        className="action-icon bg-sky-50 text-sky-500 hover:bg-sky-100"
                        title="View"
                      >
                        <Eye size={13} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* ── Pagination ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3.5 border-t border-gray-100 bg-gray-50/50">
          <p className="text-[13px] text-gray-500 font-medium">
            Showing{" "}
            <span className="font-bold text-gray-700">
              {filtered.length === 0 ? 0 : (currentPage - 1) * perPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-gray-700">
              {Math.min(currentPage * perPage, filtered.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-blue-600">{filtered.length}</span>{" "}
            entries
          </p>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </div>
      </div>
    </div>
  );
}
