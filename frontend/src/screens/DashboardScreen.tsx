import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BlockingLoader from "../components/BlockingLoader";
import { useEffect } from "react";

const DashboardScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userDetails } = useSelector((state: any) => state.auth);

	useEffect(() => {
		if (!userDetails) navigate("/login");
	}, [navigate, userDetails]);

	return <section>Dashboard.</section>;
};

export default DashboardScreen;
