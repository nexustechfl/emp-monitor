import React, { useMemo, useState } from "react"
import { Search, Monitor } from "lucide-react"
import PaginationComponent from "@/components/common/Pagination"
import CustomSelect from "@/components/common/elements/CustomSelect"
import CreateGroup from "@/components/common/monitoring-control/dialog/CreateGroup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import EmpMonitoringControlLogo from "@/assets/settings/monitoring-control.svg";

const CUSTOM_PRODUCTIVITY_TIMES = [
  { label: "08:00", value: "08:00" },
  { label: "09:00", value: "09:00" },
  { label: "10:00", value: "10:00" },
]

const PRODUCTIVITY_CATEGORIES = [
  { label: "Neutral", value: "neutral" },
  { label: "Productive", value: "productive" },
  { label: "Unproductive", value: "unproductive" },
]

const MOCK_ROWS = []

const EmpMonitoringControl = () => {
  const [groupDialogOpen, setGroupDialogOpen] = useState(false)
  const [customTime, setCustomTime] = useState("08:00")
  const [productivityCategory, setProductivityCategory] = useState("neutral")
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const filteredRows = useMemo(() => {
    return MOCK_ROWS.filter((row) => {
      if (
        search &&
        !row.groupName.toLowerCase().includes(search.toLowerCase())
      )
        return false
      return true
    })
  }, [search])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageRows = filteredRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-9 w-full">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div className="border-l-2 border-blue-500 pl-4">
          <h2 className="text-2xl text-slate-900">
            <span className="font-black">Monitoring</span>{" "}
            <span className="font-light">Control</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-sm leading-tight">
            &quot;Lorem ipsum quia dolor sit porro quisquam est qui amet
            consectetur adipisci&quot;
          </p>
        </div>
        <div className="flex items-end gap-1 mr-2">
          <img alt="realtime" className="w-42 h-32" src={EmpMonitoringControlLogo} />
        </div>
      </div>

      {/* Custom Productivity Time + Productivity Category */}
      <div className="flex flex-wrap items-end gap-x-10 gap-y-4 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Custom Productivity Time
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              Productivity calculation based on custom hours :
            </span>
            <CustomSelect
              placeholder="08:00"
              items={CUSTOM_PRODUCTIVITY_TIMES}
              selected={customTime}
              onChange={setCustomTime}
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
            Productivity Category
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-slate-800 inline-block" />
          </label>
          <CustomSelect
            placeholder="Neutral"
            items={PRODUCTIVITY_CATEGORIES}
            selected={productivityCategory}
            onChange={setProductivityCategory}
          />
        </div>
      </div>

      {/* Show entries + Create Group + Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-gray-500 font-medium">Show</span>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => {
                const num = parseInt(v, 10)
                setPageSize(Number.isNaN(num) ? 10 : num)
                setPage(1)
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
            <span className="text-[13px] text-gray-500 font-medium">
              Entries
            </span>
          </div>

          <Button
            size="lg"
            className="rounded-xl bg-emerald-500 hover:bg-emerald-600 px-5 text-xs font-semibold shadow-sm"
            onClick={() => setGroupDialogOpen(true)}
          >
            Create Group
          </Button>
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="pl-9 h-10 rounded-full bg-slate-50 border-slate-200 text-xs"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-100 overflow-x-auto bg-slate-50">
        <table className="min-w-[750px] w-full">
          <thead>
            <tr className="bg-blue-50/80">
              <th className="px-4 py-3 text-xs font-semibold text-slate-700 text-left">
                Group Name
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-700 text-left">
                Role
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-700 text-left">
                Location
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-700 text-left">
                Department
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-700 text-left">
                Employees
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-white bg-blue-500 text-center rounded-tr-2xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center text-sm text-gray-400 py-10"
                >
                  No Data
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-100 last:border-b-0 text-xs text-slate-600"
                >
                  <td className="px-4 py-4 font-medium text-slate-700">
                    {row.groupName}
                  </td>
                  <td className="px-4 py-4">{row.role}</td>
                  <td className="px-4 py-4">{row.location}</td>
                  <td className="px-4 py-4">{row.department}</td>
                  <td className="px-4 py-4">{row.employees}</td>
                  <td className="px-4 py-4 text-center">{row.action}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 py-3.5">
        <p className="text-[13px] text-gray-500 font-medium">
          Showing{" "}
          <span className="font-bold text-gray-700">
            {filteredRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          </span>{" "}
          to{" "}
          <span className="font-bold text-gray-700">
            {Math.min(currentPage * pageSize, filteredRows.length)}
          </span>{" "}
          of{" "}
          <span className="font-bold text-blue-600">
            {filteredRows.length}
          </span>
        </p>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </div>
      {/* Create Group Dialog */}
      <CreateGroup open={groupDialogOpen} onOpenChange={setGroupDialogOpen} />
    </div>
  )
}

export default EmpMonitoringControl
