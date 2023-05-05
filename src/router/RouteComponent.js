import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import JobVacancy from "../pages/jobVacancy/JobVacancy";
import LayoutLanding from "../widgets/LayoutLanding";
import LayoutDashboard from "../widgets/LayoutDashboard";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import { GlobalProvider } from "../context/GlobalContext";
import Cookies from "js-cookie";
import Detail from "../pages/detail/Detail";
import ListJobVacancy from "../pages/dashboard/ListJobVacancy";
import FormDashboard from "../pages/dashboard/FormDashboard";
import ChangePassword from "../pages/dashboard/ChangePassword";
import Profile from "./../pages/dashboard/Profile";
import Page404 from "../pages/404/Page404";

const RouteComponent = () => {
  const LoginRoute = (props) => {
    if (Cookies.get("token") === undefined) {
      return props.children;
    } else if (Cookies.get("token") !== undefined) {
      return <Navigate to={"/"} />;
    }
  };

  const DashboardRoute = (props) => {
    if (Cookies.get("token") === undefined) {
      return <Navigate to={"/login"} />;
    } else if (Cookies.get("token") !== undefined) {
      return props.children;
    }
  };

  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route
            path="/"
            element={
              <LayoutLanding>
                <Home />
              </LayoutLanding>
            }
          />

          <Route
            path="/job-vacancy"
            element={
              <LayoutLanding>
                <JobVacancy />
              </LayoutLanding>
            }
          />

          <Route
            path="/detail/:id"
            element={
              <LayoutLanding>
                <Detail />
              </LayoutLanding>
            }
          />

          <Route
            path="/dashboard"
            element={
              <DashboardRoute>
                <LayoutDashboard>
                  <Dashboard />
                </LayoutDashboard>
              </DashboardRoute>
            }
          />

          <Route
            path="/dashboard/list-job-vacancy"
            element={
              <DashboardRoute>
                <LayoutDashboard>
                  <ListJobVacancy />
                </LayoutDashboard>
              </DashboardRoute>
            }
          />

          <Route
            path="/dashboard/list-job-vacancy/form"
            element={
              <DashboardRoute>
                <LayoutDashboard>
                  <FormDashboard />
                </LayoutDashboard>
              </DashboardRoute>
            }
          />

          <Route
            path="/dashboard/list-job-vacancy/edit/:id"
            element={
              <DashboardRoute>
                <LayoutDashboard>
                  <FormDashboard />
                </LayoutDashboard>
              </DashboardRoute>
            }
          />

          <Route
            path="/dashboard/change-password"
            element={
              <DashboardRoute>
                <LayoutDashboard>
                  <ChangePassword />
                </LayoutDashboard>
              </DashboardRoute>
            }
          />

          <Route
            path="/dashboard/profile"
            element={
              <DashboardRoute>
                <LayoutDashboard>
                  <Profile />
                </LayoutDashboard>
              </DashboardRoute>
            }
          />

          <Route
            path="/login"
            element={
              <LoginRoute>
                <Login />
              </LoginRoute>
            }
          />
          <Route
            path="/register"
            element={
              <LoginRoute>
                <Register />
              </LoginRoute>
            }
          />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
};
export default RouteComponent;
