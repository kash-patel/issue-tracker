import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, FormEvent, useState } from "react";
import { useCreateRoleMutation } from "../slices/rolesApiSlice";
import { useGetAccessibleResourcesQuery } from "../slices/usersApiSlice";
import BlockingLoader from "../components/BlockingLoader";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const CreateRoleScreen = () => {
	const navigate = useNavigate();
	const { userDetails } = useSelector((state: any) => state.auth);

	const { departmentId } = useParams();

	useEffect(() => {
		if (!userDetails) navigate("/login");
	}, [navigate, userDetails]);

	const [createRole, { isLoading: createRoleLoading, error: createRoleError }] =
		useCreateRoleMutation();

	const getAccessibleResourcesQuery = useGetAccessibleResourcesQuery(
		userDetails ? userDetails.userId : skipToken
	);

	useEffect(() => {
		if (
			getAccessibleResourcesQuery.data &&
			getAccessibleResourcesQuery.data[6] < 3
		)
			navigate("/login");
	}, [navigate, userDetails]);

	const [name, setName] = useState("");

	const submitHandler = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await createRole({
				name: name,
			}).unwrap();
			navigate("/roles");
		} catch (err: any) {
			console.log(err?.data?.message || err?.message || err?.error);
		}
	};

	return (
		<section>
			{createRoleLoading && <BlockingLoader />}
			<Link to={`/departments/${departmentId}`} className="inline-block mt-8">
				<p className="text-emerald-600">&larr; Back to department</p>
			</Link>
			<h1 className="mb-8">Add Role</h1>
			<form onSubmit={submitHandler} className="my-4">
				<fieldset className="flex flex-col justify-evenly gap-8 items-start">
					<label className="w-full">
						Name
						<input
							type="text"
							id="name"
							name="name"
							onChange={(e) => setName(e.target.value)}
							className="w-full"
						/>
					</label>
					{createRoleError && (
						<p className="px-4 py-2 my-2 bg-red-800 text-white rounded-md">
							{"status" in createRoleError
								? "error" in createRoleError
									? createRoleError?.error
									: createRoleError?.data?.message
								: createRoleError.message}
						</p>
					)}
					<button
						type="submit"
						className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 mx-auto text-white rounded-md"
					>
						Add Role
					</button>
					<button
						type="button"
						onClick={() => navigate(`/departments/${departmentId}`)}
						className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 mx-auto text-white rounded-md"
					>
						Cancel
					</button>
				</fieldset>
			</form>
		</section>
	);
};

export default CreateRoleScreen;
