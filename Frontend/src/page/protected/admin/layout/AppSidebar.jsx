import { useState } from "react";
import empLogo from "@/assets/emp.png";
import smallempLogo from "@/assets/smallemp.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Clock,
  History,
  Monitor,
  HandCoins,
  Briefcase,
  BarChart3,
  ShieldAlert,
  Settings2,
  Zap,
  Download,
  Smartphone,
  Code2,
  ReceiptText,
  Key,
  Store,
} from "lucide-react";
import AppMenuItems from "./AppMenuItems";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const menuItems = [
  // Singular items (no children)
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },

  // Group item with children
  {
    title: "Employees",
    icon: Users,
    children: [
      { title: "Employees Details", url: "/admin/employee-details" },
      { title: "Employee Comparison", url: "/admin/comparison" },
      { title: "Employee Attendance", url: "/admin/attendance" },
      { title: "Employee Notification", url: "/admin/notification" },
      { title: "Employee Insights", url: "/admin/insights" },
      { title: "Real Time Track", url: "/admin/realtime" },
    ],
  },

  // Singular items (no children)
  { title: "Timesheets", url: "/admin/timesheets", icon: Clock },
  // { title: "Timeline", url: "/admin/timeline", icon: History },
  { title: "Live Monitoring", url: "/admin/livemonitoring", icon: Monitor },
  { title: "Time Claim", url: "/admin/timeclaim", icon: HandCoins },

  // Group item with children
  {
    title: "Reports",
    icon: BarChart3,
    children: [
      { title: "Reports Download", url: "/admin/reports/download" },
      { title: "Productivity Report", url: "/admin/reports/productivity" },
      { title: "Auto Email Report", url: "/admin/reports/autoemail" },
      { title: "Web App Usage", url: "/admin/reports/webappusage" },
    ],
  },
  {
    title: "DLP",
    icon: ShieldAlert,
    children: [
      { title: "USB Detection", url: "/admin/dlp/usb" },
      { title: "System Logs", url: "/admin/dlp/systemlogs" },
      { title: "Screenshot Logs", url: "/admin/dlp/screenshotlogs" },
      { title: "Email Activity Logs", url: "/admin/dlp/emailactivitylogs" },
    ],
  },
  {
    title: "Settings",
    icon: Settings2,
    children: [
      { title: "Manage Location & Department", url: "/admin/settings/location" },
      { title: "Storage Types", url: "/admin/settings/storage" },
      { title: "Productivity Rules", url: "/admin/settings/productivity" },
      { title: "Roles & Permissions", url: "/admin/settings/roles" },
      { title: "Shift Management", url: "/admin/settings/shift" },
      { title: "Monitoring Control", url: "/admin/settings/monitoring" },
      { title: "Localization", url: "/admin/settings/localization" },
    ],
  },
  {
    title: "Behaviour",
    icon: Zap,
    children: [
      { title: "Alerts", url: "/admin/behaviour/alerts" },
      { title: "Alert Policies", url: "/admin/behaviour/alertpolicies" },
      { title: "Alert Notification", url: "/admin/behaviour/alertnotification" },
    ],
  },
  {
    title: "Mobile Task",
    icon: Smartphone,
    children: [
      { title: "Clients And Users", url: "/admin/mobiletask/clientuser" },
      { title: "Task Details", url: "/admin/mobiletask/task" },
      { title: "GEO Location Tracking", url: "/admin/mobiletask/geolocation" },
    ],
  },
  // { title: "API Management", url: "/apimanagement", icon: Code2 },
  // { title: "Invoice Management", url: "/invoicemanagement", icon: ReceiptText },
  // { title: "Access Logs", url: "/accesslogs", icon: Key },
  {
    title: "Reseller",
    icon: Store,
    children: [
      { title: "Dashboard", url: "/admin/reseller/dashboard" },
      { title: "Settings", url: "/admin/reseller/settings" },
    ],
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const [openKey, setOpenKey] = useState(null);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-white border-b border-slate-200/60 p-0">
        <div
          className={`flex items-center justify-between transition-all duration-200 ease-in-out ${
            !open ? "px-2 py-4 justify-center" : "p-2"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center font-bold">
              <img
                src={open ? empLogo : smallempLogo}
                className={open ? "w-40" : "w-8 h-8 object-contain"}
                alt="Logo"
              />
            </div>
          </div>

          {open && (
            <SidebarTrigger className="h-8 w-8 cursor-pointer rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600" />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-1 group-data-[collapsible=icon]:px-0 px-3 ">
              {menuItems.map((item) => (
                <AppMenuItems
                  key={item.title}
                  item={item}
                  openKey={openKey}
                  setOpenKey={setOpenKey}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-white p-3 group-data-[collapsible=icon]:hidden">
        {/* Download Agent Button */}
        {/* <button className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:opacity-90 hover:shadow-blue-300">
          
        </button> */}
        <ShimmerButton >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-orange-400 to-pink-500 shadow-sm">
            <Download className="h-3.5 w-3.5 text-white" />
          </span>
          <p>

             Download Agent
          </p>
        </ShimmerButton>

        {/* License Information Card */}
        <div className="mt-1 rounded-2xl bg-linear-to-b from-[#4f72b8] to-[#3a539b] p-4 text-center text-white">
          <div className="mb-2 flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl shadow-outer ">
              <img src={smallempLogo} alt="" />
            </div>
          </div>
          <p className="mb-1 text-sm font-semibold">License information</p>
          <p className="text-xs leading-relaxed text-blue-100">
            Used 33 out of 1200 Licenses,
            <br />
            1167 - Licenses left &amp; Expires on
          </p>
          <div className="mt-3 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold">
            01/12/2026
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
