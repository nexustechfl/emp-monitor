import React, { useState } from "react"
import { Users, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CustomSelect from "@/components/common/elements/CustomSelect"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const ROLES = [
  { label: "See All Role", value: "all" },
  { label: "Admin", value: "admin" },
  { label: "Employee", value: "employee" },
  { label: "Manager", value: "manager" },
]

const LOCATIONS = [
  { label: "All Location", value: "all" },
  { label: "Bangalore", value: "bangalore" },
  { label: "Mumbai", value: "mumbai" },
]

const DEPARTMENTS = [
  { label: "See All Role", value: "all" },
  { label: "Developer", value: "developer" },
  { label: "Testing", value: "testing" },
]

const CreateGroup = ({ open, onOpenChange }) => {
  const [groupName, setGroupName] = useState("NR consult testing shift")
  const [role, setRole] = useState("all")
  const [location, setLocation] = useState("all")
  const [department, setDepartment] = useState("all")
  const [note, setNote] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-0 gap-0 border-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-5 rounded-t-2xl">
          <DialogHeader className="flex-row items-center gap-3 space-y-0">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black text-white">
                Group
              </DialogTitle>
              <DialogDescription className="text-xs text-violet-200 mt-0.5">
                &quot;Lorem ipsum quia dolor sit porro quisquam est
              </DialogDescription>
            </div>
          </DialogHeader>
        </div>

        <div className="px-6 py-6 space-y-7">
          {/* Group Name */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 sm:min-w-[140px]">
              <span className="w-1 h-5 rounded-full bg-blue-500" />
              <span className="text-sm font-semibold text-slate-700">
                Group Name
              </span>
            </div>
            <Input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="h-10 rounded-lg border-slate-200 text-sm"
              placeholder="NR consult testing shift"
            />
          </div>

          {/* Role, Location, Departments, Employees */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Role
                </label>
                <CustomSelect
                  placeholder="See All Role"
                  items={ROLES}
                  selected={role}
                  onChange={setRole}
                  width="full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Location
                </label>
                <CustomSelect
                  placeholder="All Location"
                  items={LOCATIONS}
                  selected={location}
                  onChange={setLocation}
                  width="full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Departments
                </label>
                <CustomSelect
                  placeholder="See All Role"
                  items={DEPARTMENTS}
                  selected={department}
                  onChange={setDepartment}
                  width="full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Employees
                </label>
                <div className="flex items-center h-10">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-semibold">
                    All Employees
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Employees Button */}
          <div>
            <Button
              size="lg"
              className="rounded-full bg-red-500 hover:bg-red-600 px-6 text-xs font-semibold shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              Add New Employess
            </Button>
          </div>

          {/* Any Note */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1 h-5 rounded-full bg-blue-500" />
              <span className="text-sm font-semibold text-slate-700">
                Any Note
              </span>
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="New one"
              rows={5}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              size="lg"
              className="rounded-xl bg-violet-500 hover:bg-violet-600 px-5 text-xs font-semibold shadow-sm"
              onClick={() => onOpenChange(false)}
            >
              <Users className="w-4 h-4" />
              Create Group
            </Button>
            <Button
              size="lg"
              className="rounded-xl bg-blue-500 hover:bg-blue-600 px-5 text-xs font-semibold shadow-sm"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateGroup
