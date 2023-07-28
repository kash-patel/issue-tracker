import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
	const userDetails = useSelector((state: any) => state.auth);
	return userDetails ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default PrivateRoute;
