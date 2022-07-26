import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectCurrentLoginStatus } from "../store/loginStatus/loginStatus";

const AuthRoute = ({ redirectPath = "/login", children }) => {
  const currentLoginStatus = useAppSelector(selectCurrentLoginStatus);

  if (!currentLoginStatus.state) {
    return <Navigate to={redirectPath} replace />;
  }
  return children || <Outlet />;
};

export default AuthRoute;
