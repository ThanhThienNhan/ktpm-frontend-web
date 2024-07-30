import { Routes, Route } from "react-router-dom";

//Authentication
import Authentication from "./pages/Authentication/Authentication";

// Admin
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminUserManagement from "./pages/AdminUserManagement/AdminUserManagement";
import AdminGameManagement from "./pages/AdminGameManagement/AdminGameManagement";
import EditUser from "./pages/AdminUserManagement/EditUser";
import EditGame from "./pages/AdminGameManagement/EditGame";

//Brand
import BrandEvents from "./pages/BrandEvents/BrandEvents"

import BrandEventDetail from "./pages/BrandEventDetail/BrandEventDetail"
import BrandReportDetail from "./pages/BrandReportDetail/BrandReportDetail"

import AddEvent from "./pages/BrandEvents/AddEvent";

import EditEvent from "./pages/BrandEvents/EditEvent";

import BrandInfo from "./pages/BrandInfo/BrandInfo"
import BrandSearchEvents from "./pages/BrandSearchEvents/BrandSearchEvents";


// Layouts
import Admin from "./Layouts/Admin/Admin";
import Brand from "./Layouts/Brand/Brand"
import BrandReports from "./pages/BrandReports/BrandReports";
function App() {
  return (
    <>
      <Routes>
        {/* Authentication */}
        <Route path="/authentication">
          <Route
            path="/authentication/login"
            element={<Authentication authenType={"Login"} />}
          />
          <Route
            path="/authentication/register"
            element={<Authentication authenType={"Register"} />}
          />
        </Route>
        {/* Admin */}
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin/user-management"
            element={<AdminUserManagement />}
          />
          <Route
            path="/admin/user-management/:username"
            element={<EditUser />}
          />
          <Route
            path="/admin/user-management/new"
            element={<EditUser />}
          />

          <Route
            path="/admin/game-management"
            element={<AdminGameManagement />}
          />
          <Route
            path="admin/game-management/:id"
            element={<EditGame />}
          />
          <Route
            path="/admin/game-management/new"
            element={<EditGame />}
          />
        </Route>
        {/*Brand*/}
        <Route path="/" element={<Brand />}>
          <Route index element={<BrandEvents />} />
          <Route path="/new" element={<AddEvent/>}/>
          <Route path="/search/:word" element={<BrandSearchEvents />} />

          <Route path="/edit/:id" element={<EditEvent/>}/>

          <Route path="/reports" element={<BrandReports />} />
          <Route path="/event/:id" element={<BrandEventDetail />} />
          <Route path="/report/:id" element={<BrandReportDetail />} />
          <Route path="/brand-info" element={<BrandInfo />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
