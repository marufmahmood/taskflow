import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";

import Dashboard from "../pages/dashboard/Dashboard";
import TaskPage from "../pages/tasks/TaskPage";

import ProtectedRoute from "./ProtectedRoute";
import LayoutRoute from "./LayoutRoute";
import UsersPage from "../pages/users/UsersPage";
import CalendarPage from "../pages/calendar/CalendarPage";
import ReportsPage from "../pages/reports/ReportsPage";
import SettingsPage from "../pages/settings/SettingsPage";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<LoginPage />} />

      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Layout */}

      <Route
        element={
          <ProtectedRoute>
            <LayoutRoute />
          </ProtectedRoute>
        }
      >

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/tasks"
          element={<TaskPage />}
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calendar"
          element={<CalendarPage />}
        />

        <Route
          path="/reports"
          element={<ReportsPage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />

      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
      <Route
        path="/test"
        element={<div className="text-4xl p-10">TEST PAGE</div>}
      />
      <Route
  path="/hello"
  element={<h1 className="text-5xl p-10">HELLO</h1>}
/>

    </Routes>
  );
}