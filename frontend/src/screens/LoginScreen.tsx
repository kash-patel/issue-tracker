import { FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const LoginScreen = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading, error }] = useLoginMutation();
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
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<section className="flex flex-col justify-center items-center">
			<h1>Sign In</h1>
			<form onSubmit={submitHandler}>
				<fieldset>
					<legend>User Credentials</legend>
					<label>
						Username
						<input
							type="text"
							id="username"
							name="username"
							onChange={(e) => setUsername(e.target.value)}
						/>
					</label>
					<label>
						Password{" "}
						<input
							type="password"
							id="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>
					<button type="submit">Sign In</button>
				</fieldset>
				If you are an employee and don&rsquo;t have an account or are having
				trouble signing in, contact the system administrator, Mr. John Arnold.
			</form>
			{isLoading && (
				<div className="absolute p-4 bg-gray-800 mx-auto w-sm">Loading...</div>
			)}
		</section>
	);
};

export default LoginScreen;
