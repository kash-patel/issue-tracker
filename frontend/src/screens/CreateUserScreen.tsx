import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, FormEvent, useState } from "react";
import { useCreateUserMutation } from "../slices/usersApiSlice";
import { useGetAccessibleResourcesQuery } from "../slices/usersApiSlice";
import BlockingLoader from "../components/BlockingLoader";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const CreateUserScreen = () => {
	const navigate = useNavigate();
	const { userDetails } = useSelector((state: any) => state.auth);

	useEffect(() => {
		if (!userDetails) navigate("/login");
	}, [navigate, userDetails]);

	const [createUser, createUserResult] = useCreateUserMutation();

	const getAccessibleResourcesQuery = useGetAccessibleResourcesQuery(
		userDetails ? userDetails.userId : skipToken
	);

	if (
		getAccessibleResourcesQuery.data &&
		getAccessibleResourcesQuery.data[9] < 3
	)
		navigate("/login");

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const submitHandler = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const userInfo: {
				username: string;
				password: string;
				firstName: string;
				lastName: string;
			} = {
				username: username,
				password: password,
				firstName: firstName,
				lastName: lastName,
			};

			await createUser(userInfo).unwrap();
			navigate(`/users/${createUserResult.data.userId}`);
		} catch (error) {
			console.log(error?.data?.message || error?.message || error?.error);
		}
	};

	const isLoading =
		getAccessibleResourcesQuery.isLoading || createUserResult.isLoading;

	const error = getAccessibleResourcesQuery.error || createUserResult.error;

	// if (!isLoading && createUserResult.data)
	// 	navigate(`/users/${createUserResult.data.userId}`);

	if (isLoading) return <BlockingLoader />;

	return (
		<section>
			<Link to={"/users"} className="inline-block mt-8">
				<p className="text-emerald-600">&larr; Back to all users</p>
			</Link>
			<h1 className="mb-8">Add User</h1>
			<form onSubmit={submitHandler} className="my-4">
				<fieldset
					disabled={getAccessibleResourcesQuery.data[9].permissionId < 3}
					className="flex flex-col justify-evenly gap-8 items-start mb-8"
				>
					<label className="w-full">
						<p>First Name (required)</p>
						<input
							type="text"
							id="first-name"
							name="first-name"
							required
							onChange={(e) => setFirstName(e.target.value)}
							className="w-full"
						/>
					</label>
					<label className="w-full">
						<p>Last Name (required)</p>
						<input
							type="text"
							id="last-name"
							name="last-name"
							required
							onChange={(e) => setLastName(e.target.value)}
							className="w-full"
						/>
					</label>
					<label className="w-full">
						<p>Username (required)</p>
						<input
							type="text"
							id="username"
							name="username"
							required
							onChange={(e) => setUsername(e.target.value)}
							className="w-full"
						/>
					</label>
					<label className="w-full">
						<p>Password (required)</p>
						<input
							type="password"
							id="password"
							name="password"
							required
							onChange={(e) => setPassword(e.target.value)}
							className="w-full"
						/>
					</label>
					{error && (
						<p className="px-4 py-2 my-2 bg-red-800 text-white rounded-md">
							{"status" in error
								? "error" in error
									? error?.error
									: error?.data?.message
								: error.message}
						</p>
					)}
				</fieldset>
				<fieldset className="flex flex-row justify-around">
					<button
						type="submit"
						className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 mx-auto text-white rounded-md"
					>
						Create User
					</button>
					<button
						type="button"
						onClick={() => navigate("/users")}
						className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 mx-auto text-white rounded-md"
					>
						Cancel
					</button>
				</fieldset>
			</form>
		</section>
	);
};

export default CreateUserScreen;
