import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/usersApiSlice";
import { UserProfiles } from "../data/userProfiles";

const HomeScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [login, { isLoading, error }] = useLoginMutation();
	const { userDetails } = useSelector((state: any) => state.auth);

	async function handleProfileClick(username: string, password: string) {
		try {
			const res = await login({ username, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<section>
			{userDetails ? (
				<>
					<h2>Welcome, {userDetails.firstName}.</h2>
				</>
			) : (
				<>
					<h2>Welcome to ParkMan</h2>
					<ul>
						{UserProfiles.map(
							(userProfile: {
								id: number;
								display_name: string;
								username: string;
								password: string;
							}) => (
								<li
									key={userProfile.id}
									className="p-4 border border-black border-solid rounded-xl cursor-pointer select-none"
									onClick={async () =>
										await handleProfileClick(
											userProfile.username,
											userProfile.password
										)
									}
								>
									<div>
										<p>{userProfile.display_name}</p>
										<p>
											Username: <code>{userProfile.username}</code>
										</p>
										<p>
											Password: <code>{userProfile.password}</code>
										</p>
									</div>
								</li>
							)
						)}
					</ul>
					{isLoading && <p>Loading...</p>}
					{error && <p className="text-red-500">error</p>}
				</>
			)}
		</section>
	);
};

export default HomeScreen;
