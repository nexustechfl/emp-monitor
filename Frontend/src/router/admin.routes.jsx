import React, { useState, useEffect } from 'react'
import { Route, Navigate } from 'react-router-dom'

// Existing pages
import Dashboard from '../page/protected/admin/dashboard'

// Employee pages — each in its own folder
import EmployeeDetails        from '../page/protected/admin/employee-details'
import EmployeeComparison     from '../page/protected/admin/employee-comparison'
import EmployeeAttendancePage from '../page/protected/admin/employee-attendance'
import EmployeeNotification       from '../page/protected/admin/employee-notification'
import EmployeeInsights       from '../page/protected/admin/employee-insights'
import EmployeeRealtimeInsights       from '../page/protected/admin/employee-realtime-insights'


// Standalone pages
import { Timesheets }     from '../page/protected/admin/timesheets'
import { Timeline }       from '../page/protected/admin/timeline'
import { LiveMonitoring } from '../page/protected/admin/live-monitoring'
import { TimeClaim }      from '../page/protected/admin/time-claim'
import { Clients }        from '../page/protected/admin/clients'

// Reports
import ReportsDownload    from '../page/protected/admin/reports-download'
import ProductivityReport from '../page/protected/admin/productivity-report'
import AutoEmailReport    from '../page/protected/admin/auto-email-report'
import WebAppUsage        from '../page/protected/admin/web-app-usage'
import SystemActivityLog  from '../page/protected/admin/system-activity-log'

// DLP
import USBDetection      from '../page/protected/admin/usb-detection'
import SystemLogs        from '../page/protected/admin/system-logs'
import ScreenShotLogs         from '../page/protected/admin/screenshot-logs'
import EmailActivityLogs from '../page/protected/admin/email-activity-logs'
import PrintLogs         from '../page/protected/admin/print-logs'

// Settings
import LocationDepartment from '../page/protected/admin/location-department'
import StorageTypes       from '../page/protected/admin/storage-types'
import ProductivityRules  from '../page/protected/admin/productivity-rules'
import RolesPermissions   from '../page/protected/admin/roles-permissions'
import ShiftManagement    from '../page/protected/admin/shift-management'
import MonitoringControl  from '../page/protected/admin/monitoring-control'
import Localization       from '../page/protected/admin/localization'

// Behaviour
import Alerts            from '../page/protected/admin/alerts'
import AlertPolicies     from '../page/protected/admin/alert-policies'
import AlertNotification from '../page/protected/admin/alert-notification'

// Mobile Task
import MobileTaskClients     from '../page/protected/admin/mobile-task-clients'
import MobileTaskDetails     from '../page/protected/admin/mobile-task-details'
import MobileTaskGeolocation from '../page/protected/admin/mobile-task-geolocation'

// Reseller
import ResellerDashboard from '../page/protected/admin/reseller-dashboard'
import ResellerSettings  from '../page/protected/admin/reseller-settings'

import { AdminLayout } from '../page/protected/admin/Layout'
import useAdminSession from '../sessions/adminSession'
import { getSessionCookie } from '../lib/sessionCookie'

const AdminRoutes = () => {
  const { admin, setAdmin } = useAdminSession()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const fromCookie = getSessionCookie()
    if (fromCookie && fromCookie.data) {
      setAdmin(fromCookie)
    }
    setHydrated(true)
  }, [setAdmin])

  const isAuthenticated = () => Boolean(admin && admin.data)

  const ProtectedRoute = ({ children }) => {
    if (!hydrated) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )
    }
    if (!isAuthenticated()) {
      return <Navigate to="/admin-login" replace />
    }
    return <AdminLayout>{children}</AdminLayout>
  }

  const P = ({ Page }) => (
    <ProtectedRoute>
      <Page />
    </ProtectedRoute>
  )

  return (
    <>
      {/* ── Dashboard ── */}
      <Route path="/admin/dashboard"             element={<P Page={Dashboard} />} />

      {/* ── Employees ── */}
      <Route path="/admin/employee-details"      element={<P Page={EmployeeDetails} />} />
      <Route path="/admin/comparison"       element={<P Page={EmployeeComparison} />} />
      <Route path="/admin/attendance"       element={<P Page={EmployeeAttendancePage} />} />
      <Route path="/admin/notification"     element={<P Page={EmployeeNotification} />} />
      <Route path="/admin/insights"         element={<P Page={EmployeeInsights} />} />
      <Route path="/admin/realtime"         element={<P Page={EmployeeRealtimeInsights} />} />

      {/* ── Standalone ── */}
      <Route path="/admin/timesheets"                  element={<P Page={Timesheets} />} />
      <Route path="/admin/timeline"                    element={<P Page={Timeline} />} />
      <Route path="/admin/livemonitoring"              element={<P Page={LiveMonitoring} />} />
      <Route path="/admin/timeclaim"                   element={<P Page={TimeClaim} />} />
      <Route path="/admin/clients"                     element={<P Page={Clients} />} />

      {/* ── Reports ── */}
      <Route path="/admin/reports/download"            element={<P Page={ReportsDownload} />} />
      <Route path="/admin/reports/productivity"        element={<P Page={ProductivityReport} />} />
      <Route path="/admin/reports/autoemail"           element={<P Page={AutoEmailReport} />} />
      <Route path="/admin/reports/webappusage"         element={<P Page={WebAppUsage} />} />
      <Route path="/admin/reports/systemactivitylog"   element={<P Page={SystemActivityLog} />} />

      {/* ── DLP ── */}
      <Route path="/admin/dlp/usb"                     element={<P Page={USBDetection} />} />
      <Route path="/admin/dlp/systemlogs"              element={<P Page={SystemLogs} />} />
      <Route path="/admin/dlp/screenshotlogs"          element={<P Page={ScreenShotLogs} />} />
      <Route path="/admin/dlp/emailactivitylogs"       element={<P Page={EmailActivityLogs} />} />
      <Route path="/admin/dlp/printlogs"               element={<P Page={PrintLogs} />} />

      {/* ── Settings ── */}
      <Route path="/admin/settings/location"           element={<P Page={LocationDepartment} />} />
      <Route path="/admin/settings/storage"            element={<P Page={StorageTypes} />} />
      <Route path="/admin/settings/productivity"       element={<P Page={ProductivityRules} />} />
      <Route path="/admin/settings/roles"              element={<P Page={RolesPermissions} />} />
      <Route path="/admin/settings/shift"              element={<P Page={ShiftManagement} />} />
      <Route path="/admin/settings/monitoring"         element={<P Page={MonitoringControl} />} />
      <Route path="/admin/settings/localization"       element={<P Page={Localization} />} />

      {/* ── Behaviour ── */}
      <Route path="/admin/behaviour/alerts"            element={<P Page={Alerts} />} />
      <Route path="/admin/behaviour/alertpolicies"     element={<P Page={AlertPolicies} />} />
      <Route path="/admin/behaviour/alertnotification" element={<P Page={AlertNotification} />} />

      {/* ── Mobile Task ── */}
      <Route path="/admin/mobiletask/clientuser"      element={<P Page={MobileTaskClients} />} />
      <Route path="/admin/mobiletask/task"            element={<P Page={MobileTaskDetails} />} />
      <Route path="/admin/mobiletask/geolocation"     element={<P Page={MobileTaskGeolocation} />} />

      {/* ── Reseller ── */}
      <Route path="/admin/reseller/dashboard"         element={<P Page={ResellerDashboard} />} />
      <Route path="/admin/reseller/settings"          element={<P Page={ResellerSettings} />} />
    </>
  )
}

export default AdminRoutes
