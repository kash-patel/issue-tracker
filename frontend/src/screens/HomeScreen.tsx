import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials, clearCredentials } from "../slices/authSlice";
import { useLoginMutation, useLogoutMutation } from "../slices/usersApiSlice";
import { UserProfiles } from "../data/userProfiles";
import BlockingLoader from "../components/BlockingLoader";
import { FaAngleRight } from "react-icons/fa6";

function getRolesString(roles: string[]): string {
	let rolesString: string = "";
	if (roles.length <= 0) rolesString = "None";
	else if (roles.length == 1) rolesString = roles[0];
	else {
		rolesString = roles[0];
		for (let index = 1; index < roles.length; index++) {
			const role = roles[index];
			rolesString += ", " + role;
		}
	}

	return rolesString;
}

const HomeScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [login, { isLoading, error }] = useLoginMutation();
	const [logout] = useLogoutMutation();
	const { userDetails } = useSelector((state: any) => state.auth);

	async function handleProfileClick(username: string, password: string) {
		try {
			const res = await login({ username, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate("/dashboard");
		} catch (err) {
			console.log(err);
		}
	}

	async function handleSignOutClick() {
		try {
			await logout(userDetails).unwrap();
			dispatch(clearCredentials(userDetails));
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<section>
			{userDetails ? (
				<>
					<h1 className="my-8 text-center">
						Welcome, {userDetails.firstName}.
					</h1>
					<div className="max-w-sm mx-auto flex flex-col justify-around items-center gap-4">
						<Link to={"/dashboard"}>
							<p className="uppercase font-bold tracking-widest bg-zinc-800 hover:bg-emerald-600 transition-all p-4 rounded-md text-white flex flex-row justify-between items-center">
								Go to your dashboard
							</p>
						</Link>
						<p className="font-bold tracking-widest text-sm text-zinc-500">
							OR
						</p>
						<Link onClick={handleSignOutClick} to={"/"}>
							<p className="uppercase font-bold tracking-widest hover:text-emerald-600 transition-all flex flex-row justify-between items-center">
								Sign out
							</p>
						</Link>
					</div>
				</>
			) : (
				<>
					<h1 className="my-8">Welcome to ParkMan</h1>
					<p className="mb-4">
						Select one of the user profiles below to get started, or test out
						the login functionality by clicking the &ldquo;Sign In&rdquo; link
						at the top right!
					</p>
					<ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{UserProfiles.map(
							(userProfile: {
								id: number;
								display_name: string;
								username: string;
								password: string;
								roles: string[];
							}) => (
								<li
									key={userProfile.id}
									className="p-4 bg-white drop-shadow-md hover:drop-shadow-xl transition-all rounded-md cursor-pointer select-none"
								>
									<Link
										onClick={async () =>
											await handleProfileClick(
												userProfile.username,
												userProfile.password
											)
										}
										to={"#"}
									>
										<div>
											<p className="text-md font-bold mb-2 uppercase tracking-widest">
												{userProfile.display_name}
											</p>
											<p className="all-small-caps">
												<span className="font-bold tracking-wide">Roles:</span>
												&nbsp;
												{getRolesString(userProfile.roles)}
											</p>
											<p>
												<span className="all-small-caps font-bold tracking-wide">
													Username:
												</span>
												&nbsp;
												<code>{userProfile.username}</code>
											</p>
											<p>
												<span className="all-small-caps font-bold tracking-wide">
													Password:
												</span>
												&nbsp;
												<code>{userProfile.password}</code>
											</p>
										</div>
									</Link>
								</li>
							)
						)}
					</ul>
				</>
			)}
			{isLoading && <BlockingLoader />}
			{/* {isLoading && (
				<p className="px-4 py-2 mb-2 bg-amber-50 border border-amber-500 text-amber-600 rounded-md">
					Loading...
				</p>
			)} */}
			{error && (
				<p className="px-4 py-2 mb-2 bg-red-50 border border-red-500 text-red-600 rounded-md">
					{"status" in error
						? "error" in error
							? error?.error
							: error?.data?.message
						: error.message}
				</p>
			)}
		</section>
	);
};

export default HomeScreen;
