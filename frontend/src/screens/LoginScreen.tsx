import { FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { Link } from "react-router-dom";
import BlockingLoader from "../components/BlockingLoader";

const LoginScreen = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading, error, isSuccess }] = useLoginMutation();
	const { userDetails } = useSelector((state: any) => state.auth);

	useEffect(() => {
		if (userDetails) navigate("/");
	}, [navigate, userDetails]);

	const submitHandler = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const res = await login({ username, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate("/");
		} catch (err: any) {
			console.log(err?.data?.message || err);
		}
	};

	return (
		<section className="mx-auto max-w-xl">
			<h1>Sign In</h1>
			<form onSubmit={submitHandler} className="my-4">
				<fieldset className="flex flex-col justify-evenly gap-8 items-start">
					<label className="w-full">
						Username
						<input
							type="text"
							id="username"
							name="username"
							onChange={(e) => setUsername(e.target.value)}
							className="w-full"
						/>
					</label>
					<label className="w-full">
						Password
						<input
							type="password"
							id="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							className="w-full"
						/>
					</label>
					<button
						type="submit"
						className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 text-white mx-auto rounded-md"
					>
						Sign In
					</button>
				</fieldset>
			</form>
			{error && (
				<p className="px-4 py-2 mb-2 bg-red-800 text-white rounded-md">
					{"status" in error
						? "error" in error
							? error?.error
							: error?.data?.message
						: error.message}
				</p>
			)}
			{isSuccess && (
				<p className="px-4 py-2 mb-2 bg-green-600 text-white rounded-md">
					Success!
				</p>
			)}
			{isLoading && <BlockingLoader />}
			{/* {isLoading && (
				<p className="px-4 py-2 mb-2 bg-amber-50 border border-amber-500 text-amber-600 rounded-md">
					Loading...
				</p>
			)} */}
			<p className="py-2">
				If you are an employee and don&rsquo;t have an account or are having
				trouble signing in, contact the system administrator, Mr. John Arnold.
			</p>
			<p className="py-2">
				Alternatively, go to the{" "}
				<Link to={"/"} className="text-emerald-600">
					Home
				</Link>{" "}
				screen and select one of the user profiles to sign in.
			</p>
		</section>
	);
};

export default LoginScreen;
