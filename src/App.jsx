import { Routes, Route } from "react-router-dom";

// Admin
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminUserManagement from "./pages/AdminUserManagement/AdminUserManagement";
import AdminGameManagement from "./pages/AdminGameManagement/AdminGameManagement";
import EditUser from "./pages/AdminUserManagement/EditUser";
import EditGame from "./pages/AdminGameManagement/EditGame";
// Layouts
import Admin from "./Layouts/Admin/Admin";
import Brand from "./Layouts/Brand/Brand"
function App() {
  return (
    <>
      <Routes>
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
        <Route path="/" element={<Brand/>}></Route>
      </Routes>
    </>
  );
}

export default App;
