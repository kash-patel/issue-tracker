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

	if (
		getAccessibleResourcesQuery.data &&
		getAccessibleResourcesQuery.data[6] < 3
	)
		navigate("/login");

	const [name, setName] = useState("New Role");

	const initialRoleResourcePermissions: {
		[resourceId: number]: {
			resourceName: string;
			permissionId: number;
		};
	} = {
		1: {
			resourceName: "Animals",
			permissionId: 1,
		},
		2: {
			resourceName: "Departments",
			permissionId: 1,
		},
		// 3: {
		// 	resourceName: "Issues",
		// 	permissionId: 1,
		// },
		// 4: {
		// 	resourceName: "Locations",
		// 	permissionId: 1,
		// },
		5: {
			resourceName: "Resources",
			permissionId: 1,
		},
		6: {
			resourceName: "Roles",
			permissionId: 1,
		},
		7: {
			resourceName: "Species",
			permissionId: 1,
		},
		// 8: {
		// 	resourceName: "Systems",
		// 	permissionId: 1,
		// },
		9: {
			resourceName: "Users",
			permissionId: 1,
		},
		10: {
			resourceName: "Vehicles",
			permissionId: 1,
		},
	};

	const [roleResourcePermissions, setRoleResourcePermissions] = useState(
		initialRoleResourcePermissions
	);

	const handlePermissionChange = (
		resourceId: number,
		newPermissionId: number
	) => {
		const updatedPermissions = { ...roleResourcePermissions };
		updatedPermissions[resourceId].permissionId = newPermissionId;
		setRoleResourcePermissions(updatedPermissions);
	};

	const submitHandler = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const resourcePermissions: { [resourceId: number]: number } = {};
			Object.keys(roleResourcePermissions).forEach((resourceId: string) => {
				if (roleResourcePermissions[parseInt(resourceId)].permissionId > 1)
					resourcePermissions[parseInt(resourceId)] =
						roleResourcePermissions[parseInt(resourceId)].permissionId;
			});

			await createRole({
				name: name,
				departmentId: parseInt(departmentId as string),
				resourcePermissions: resourcePermissions,
			}).unwrap();

			navigate(`/departments/${departmentId as string}`);
		} catch (error) {
			console.log(error?.data?.message || error?.message || error?.error);
		}
	};

	const isLoading = getAccessibleResourcesQuery.isLoading || createRoleLoading;

	const error = getAccessibleResourcesQuery.error || createRoleError;

	if (isLoading) return <BlockingLoader />;

	return (
		<section>
			<Link
				to={`/departments/${departmentId as string}`}
				className="inline-block mt-8"
			>
				<p className="text-emerald-600">&larr; Back to department</p>
			</Link>
			<h1 className="mb-8">Create New Role</h1>
			<form onSubmit={submitHandler} className="my-4">
				<fieldset
					disabled={getAccessibleResourcesQuery.data[6].permissionId < 3}
					className="flex flex-col justify-evenly gap-8 items-start mb-8"
				>
					<label className="w-full">
						<p>Name (required)</p>
						<input
							type="text"
							id="name"
							name="name"
							defaultValue={name}
							required
							onChange={(e) => setName(e.target.value)}
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
				<fieldset
					disabled={getAccessibleResourcesQuery.data[6].permissionId < 3}
					className="flex flex-col justify-between gap-4 mb-8"
				>
					<h2>Role Resource Permissions</h2>
					{Object.keys(roleResourcePermissions).map((r) => (
						<label key={r} className="w-full flex flex-row justify-between">
							{roleResourcePermissions[parseInt(r)].resourceName}
							<div className="flex flex-row justify-between gap-2">
								<label className="text-center">
									<p>None</p>
									<input
										type="radio"
										id={`${r}-permission-none`}
										name={`${r}-permission`}
										value={1}
										checked={
											roleResourcePermissions[parseInt(r)].permissionId === 1
										}
										onChange={() => handlePermissionChange(parseInt(r), 1)}
									/>
								</label>
								<label className="text-center">
									<p>Read</p>
									<input
										type="radio"
										id={`${r}-permission-read`}
										name={`${r}-permission`}
										value={2}
										checked={
											roleResourcePermissions[parseInt(r)].permissionId === 2
										}
										onChange={() => handlePermissionChange(parseInt(r), 2)}
									/>
								</label>
								<label className="text-center">
									<p>Write</p>
									<input
										type="radio"
										id={`${r}-permission-write`}
										name={`${r}-permission`}
										value={3}
										checked={
											roleResourcePermissions[parseInt(r)].permissionId === 3
										}
										onChange={() => handlePermissionChange(parseInt(r), 3)}
									/>
								</label>
							</div>
						</label>
					))}
				</fieldset>
				<fieldset className="flex flex-row justify-around">
					<button
						type="submit"
						className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 mx-auto text-white rounded-md"
					>
						Create Role
					</button>
					<button
						type="button"
						onClick={() => navigate(`/departments/${departmentId as string}`)}
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
