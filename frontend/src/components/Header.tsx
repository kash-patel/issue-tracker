import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";

const Header = () => {
	const { userDetails } = useSelector((state: any) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [logout] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logout(userDetails).unwrap();
			dispatch(clearCredentials(userDetails));
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<header>
			<Link to={"/"}>ParkMan</Link> |{" "}
			{userDetails ? (
				<Link onClick={logoutHandler} to={"/"}>
					Sign Out
				</Link>
			) : (
				<Link to={"/login"}>Sign In</Link>
			)}
		</header>
	);
};

export default Header;
