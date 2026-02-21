import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Loader from "./components/common/Loader";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleBasedRoute from "./routes/RoleBasedRoute";
import { IssueProvider } from "./context/IssueContext";
import { NotificationProvider } from "./context/NotificationContext";
import { CommunityProvider } from "./context/CommunityContext";
import DashboardLayout from "./components/layout/DashboardLayout";

// Lazy load pages for better performance
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));

// Citizen pages
const CitizenDashboard = lazy(() => import("./pages/citizen/CitizenDashboard"));
const ReportIssue = lazy(() => import("./pages/citizen/ReportIssue"));
const MyIssues = lazy(() => import("./pages/citizen/MyIssues"));
const IssueDetails = lazy(() => import("./pages/citizen/IssueDetails"));
const CitizenProfile = lazy(() => import("./pages/citizen/CitizenProfile"));
const HelpCenter = lazy(() => import("./pages/citizen/HelpCenter"));
const CommunityPage = lazy(() => import("./pages/citizen/CommunityPage"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const ManageIssues = lazy(() => import("./pages/admin/ManageIssues"));
const AssignTasks = lazy(() => import("./pages/admin/AssignTasks"));
const ManageDepartments = lazy(() => import("./pages/admin/ManageDepartments"));
const DepartmentAnalytics = lazy(() => import("./pages/admin/DepartmentAnalytics"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

// Analytics pages
const CityOverview = lazy(() => import("./pages/analytics/CityOverview"));
const PerformanceReports = lazy(() => import("./pages/analytics/PerformanceReports"));

// Error pages
const NotFound = lazy(() => import("./pages/NotFound"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50">
    <Loader />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <IssueProvider>
        <NotificationProvider>
          <CommunityProvider>
          <BrowserRouter
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Citizen routes - Protected with Layout */}
                <Route
                  path="/citizen"
                  element={
                    <ProtectedRoute>
                      <RoleBasedRoute allowedRoles={["citizen", "admin"]}>
                        <DashboardLayout>
                          <CitizenDashboard />
                        </DashboardLayout>
                      </RoleBasedRoute>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/citizen/report-issue"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <ReportIssue />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/citizen/my-issues"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <MyIssues />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/citizen/issues/:id"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <IssueDetails />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/citizen/profile"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <CitizenProfile />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/citizen/help"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <HelpCenter />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/community"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <CommunityPage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route path="/citizen/community" element={<Navigate to="/community" replace />} />

                {/* Admin routes - Protected + Role-based */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <RoleBasedRoute allowedRoles={["admin"]}>
                        <AdminDashboard />
                      </RoleBasedRoute>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/issues"
                  element={
                    <ProtectedRoute>
                      <RoleBasedRoute allowedRoles={["admin"]}>
                        <ManageIssues />
                      </RoleBasedRoute>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/assign"
                  element={
                    <ProtectedRoute>
                      <RoleBasedRoute allowedRoles={["admin"]}>
                        <AssignTasks />
                      </RoleBasedRoute>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/departments"
                  element={
                    <ProtectedRoute>
                      <RoleBasedRoute allowedRoles={["admin"]}>
                        <ManageDepartments />
                      </RoleBasedRoute>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/analytics"
                  element={
                    <ProtectedRoute>
                      <RoleBasedRoute allowedRoles={["admin"]}>
                        <DepartmentAnalytics />
                      </RoleBasedRoute>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <ProtectedRoute>
                      <RoleBasedRoute allowedRoles={["admin"]}>
                        <AdminSettings />
                      </RoleBasedRoute>
                    </ProtectedRoute>
                  }
                />

                {/* Analytics routes */}
                <Route
                  path="/analytics/overview"
                  element={
                    <ProtectedRoute>
                      <CityOverview />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analytics/reports"
                  element={
                    <ProtectedRoute>
                      <PerformanceReports />
                    </ProtectedRoute>
                  }
                />

                {/* Error pages */}
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          </CommunityProvider>
        </NotificationProvider>
      </IssueProvider>
    </ErrorBoundary>
  );
}

export default App;
