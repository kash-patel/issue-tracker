import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";
import BlockingLoader from "./BlockingLoader";

const Header = () => {
	const { userDetails } = useSelector((state: any) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [logout, { isLoading }] = useLogoutMutation();

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
		<header className="p-4 flex flex-row justify-between items-center">
			<Link to={"/"}>
				<p className="font-black text-lg tracking-widest">PARKMAN</p>
			</Link>
			<div>
				<Link to={"/about"}>
					<p className="font-bold text-sm tracking-widest inline mx-2">ABOUT</p>
				</Link>
				{userDetails ? (
					<Link onClick={logoutHandler} to={"#"}>
						<p className="font-bold text-sm tracking-widest inline mx-2">
							SIGN OUT
						</p>
					</Link>
				) : (
					<Link to={"/login"}>
						<p className="font-bold text-sm tracking-widest inline mx-2">
							SIGN IN
						</p>
					</Link>
				)}
			</div>
			{isLoading && <BlockingLoader />}
		</header>
	);
};

export default Header;
