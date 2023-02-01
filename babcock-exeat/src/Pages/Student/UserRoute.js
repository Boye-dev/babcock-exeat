import { Navigate, useLocation, Outlet } from "react-router-dom";
import AuthService from "../../auth_service";
const { getCurrentAdmin } = AuthService;
const UserRoute = () => {
  const location = useLocation();

  return getCurrentAdmin()?.role === "Student" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default UserRoute;
