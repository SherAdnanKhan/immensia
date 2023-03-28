import { Outlet, Navigate } from "react-router-dom";

const AuthenticatedRoute = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

