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
		<header className="fixed top-0 left-0 right-0 bottom-auto bg-white border-b border-solid border-gray-300 z-10 p-4 flex flex-row justify-between items-center">
			<Link to={"/"}>
				<p className="uppercase font-black text-lg tracking-widest hover:text-emerald-600 transition-all">
					ParkMan
				</p>
			</Link>
			<div>
				<Link to={"/about"}>
					<p className="uppercase font-bold text-sm tracking-widest inline hover:text-emerald-600 transition-all mx-2">
						About
					</p>
				</Link>
				{userDetails ? (
					<Link onClick={logoutHandler} to={"/"}>
						<p className="uppercase font-bold text-sm tracking-widest inline hover:text-emerald-600 transition-all mx-2">
							Sign Out
						</p>
					</Link>
				) : (
					<Link to={"/login"}>
						<p className="uppercase font-bold text-sm tracking-widest inline hover:text-emerald-600 transition-all mx-2">
							Sign In
						</p>
					</Link>
				)}
			</div>
			{isLoading && <BlockingLoader />}
		</header>
	);
};

export default Header;
