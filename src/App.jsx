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
import AddVoucher from "./pages/BrandEvents/AddVoucher";

import EditEvent from "./pages/BrandEvents/EditEvent";

import BrandInfo from "./pages/BrandInfo/BrandInfo"
import BrandSearchEvents from "./pages/BrandSearchEvents/BrandSearchEvents";


// Layouts
import Admin from "./Layouts/Admin/Admin";
import Brand from "./Layouts/Brand/Brand"
import BrandReports from "./pages/BrandReports/BrandReports";
import AddUser from "./pages/AdminUserManagement/AddUser";
function App() {
  return (
    <>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Authentication authenType={"Login"} />}>
          <Route
            path="/login"
            element={<Authentication authenType={"Login"} />}
          />
          <Route
            path="/register"
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
            path="/admin/user-management/edit/:username"
            element={<EditUser />}
          />
          <Route
            path="/admin/user-management/new"
            element={<AddUser />}
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
        <Route path="/brand" element={<Brand />}>
          <Route index element={<BrandEvents />} />
          <Route path="/brand/create-event" element={<AddEvent/>}/>
          <Route path="/brand/create-voucher" element={<AddVoucher/>}/>
          <Route path="/brand/search/:word" element={<BrandSearchEvents />} />

          <Route path="/brand/edit/:id" element={<EditEvent/>}/>

          <Route path="/brand/reports" element={<BrandReports />} />
          <Route path="/brand/event/:id" element={<BrandEventDetail />} />
          <Route path="/brand/report/:id" element={<BrandReportDetail />} />
          <Route path="/brand/brand-info" element={<BrandInfo />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
