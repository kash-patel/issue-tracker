import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, FormEvent, useState } from "react";
import { useCreateDepartmentMutation } from "../slices/departmentsApiSlice";
import { useGetAccessibleResourcesQuery } from "../slices/usersApiSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import BlockingLoader from "../components/BlockingLoader";
import LocalErrorDisplay from "../components/LocalErrorDisplay";

const CreateDepartmentScreen = () => {
	const navigate = useNavigate();
	const { userDetails } = useSelector((state: any) => state.auth);

	useEffect(() => {
		if (!userDetails) navigate("/login");
	}, [navigate, userDetails]);

	const [createDepartment, createDepartmentResult] =
		useCreateDepartmentMutation();

	const getAccessibleResourcesQuery = useGetAccessibleResourcesQuery(
		userDetails ? userDetails.userId : skipToken
	);

	useEffect(() => {
		if (
			getAccessibleResourcesQuery.data &&
			getAccessibleResourcesQuery.data[2].permissionId < 3
		)
			navigate("/login");
	}, [navigate, userDetails]);

	const [name, setName] = useState("");

	const submitHandler = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await createDepartment({
				name: name,
			}).unwrap();
			navigate("/departments");
		} catch (err) {
			console.log(err);
		}
	};

	const isLoading =
		createDepartmentResult.isLoading || getAccessibleResourcesQuery.isLoading;
	const hasData: boolean = getAccessibleResourcesQuery.data;
	const error =
		createDepartmentResult.error || getAccessibleResourcesQuery.error;

	if (isLoading) return <BlockingLoader />;

	if (!hasData) return <BlockingLoader statusCode={1} />;

	return (
		<section>
			<Link to={"/departments"} className="inline-block mt-8">
				<p className="text-emerald-600">&larr; Back to all departments</p>
			</Link>
			<h1 className="mb-8">Add Department</h1>
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
					{error && <LocalErrorDisplay error={error} />}
					<button
						type="submit"
						className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 mx-auto text-white rounded-md"
					>
						Add Department
					</button>
					<button
						type="button"
						onClick={() => navigate("/departments")}
						className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 mx-auto text-white rounded-md"
					>
						Cancel
					</button>
				</fieldset>
			</form>
		</section>
	);
};

export default CreateDepartmentScreen;
