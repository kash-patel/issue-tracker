import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, FormEvent, useState } from "react";
import {
	useGetRoleByIdQuery,
	useGetRoleResourcePermissionsQuery,
	useUpdateRoleMutation,
} from "../slices/rolesApiSlice";
import { useGetAccessibleResourcesQuery } from "../slices/usersApiSlice";
import BlockingLoader from "../components/BlockingLoader";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useUpdateRoleResourcePermissionMutation } from "../slices/roleResourcePermissionsSlice";

function extractRoleResourcePermissions(data: any): {
	[resourceId: number]: number;
} {
	const roleResourcePermissions = {};

	return roleResourcePermissions;
}

const UpdateRoleScreen = () => {
	const navigate = useNavigate();
	const { userDetails } = useSelector((state: any) => state.auth);
	const { roleId } = useParams();

	useEffect(() => {
		if (!userDetails) navigate("/login");
	}, [navigate, userDetails]);

	const getRoleByIdQuery = useGetRoleByIdQuery(roleId as string);

	const getRoleResourcePermissionsQuery = useGetRoleResourcePermissionsQuery(
		roleId as string
	);

	const [updateRole, { isLoading: updateRoleLoading, error: updateRoleError }] =
		useUpdateRoleMutation();

	const [
		updateRoleResourcePermissions,
		{
			isLoading: updateRoleResourcePermissionsLoading,
			error: updateRoleResourcePermissionsError,
		},
	] = useUpdateRoleResourcePermissionMutation();

	const getAccessibleResourcesQuery = useGetAccessibleResourcesQuery(
		userDetails ? userDetails.userId : skipToken
	);

	if (
		getAccessibleResourcesQuery.data &&
		getAccessibleResourcesQuery.data[6] < 3
	)
		navigate("/login");

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
		3: {
			resourceName: "Issues",
			permissionId: 1,
		},
		4: {
			resourceName: "Locations",
			permissionId: 1,
		},
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
		8: {
			resourceName: "Systems",
			permissionId: 1,
		},
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

	useEffect(() => {
		if (
			getRoleResourcePermissionsQuery.data &&
			getRoleResourcePermissionsQuery.data[roleId as string]
		) {
			setRoleResourcePermissions((prevPermissions) => {
				const updatedPermissions = { ...prevPermissions }; // Create a new object

				Object.keys(
					getRoleResourcePermissionsQuery.data[roleId as string]
				).forEach((r) => {
					const resourceId = parseInt(r);
					updatedPermissions[resourceId] = {
						...updatedPermissions[resourceId], // Create a new object
						permissionId:
							getRoleResourcePermissionsQuery.data[roleId as string][r]
								.permissionId,
					};
				});

				return updatedPermissions; // Return the updated object
			});
		}
	}, [roleId]);

	const [name, setName] = useState("");

	const updateNameHandler = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await updateRole({
				id: roleId,
				newName: name,
			}).unwrap();
			navigate(
				`/departments/${
					getRoleByIdQuery.data[parseInt(roleId as string)].departmentId
				}`
			);
		} catch (err: any) {
			console.log(err?.data?.message || err?.message || err?.error);
		}
	};

	const handlePermissionChange = (
		resourceId: number,
		newPermissionId: number
	) => {
		const updatedPermissions = { ...roleResourcePermissions };
		updatedPermissions[resourceId].permissionId = newPermissionId;
		setRoleResourcePermissions(updatedPermissions);
	};

	const isLoading =
		getAccessibleResourcesQuery.isLoading ||
		getRoleByIdQuery.isLoading ||
		getRoleResourcePermissionsQuery.isLoading ||
		updateRoleLoading ||
		updateRoleResourcePermissionsLoading;

	const error =
		getAccessibleResourcesQuery.error ||
		getRoleByIdQuery.error ||
		getRoleResourcePermissionsQuery.error ||
		updateRoleError ||
		updateRoleResourcePermissionsError;

	if (isLoading) return <BlockingLoader />;

	return (
		<section>
			<Link
				to={`/departments/${
					getRoleByIdQuery.data &&
					getRoleByIdQuery.data[roleId as string].departmentId
				}`}
				className="inline-block mt-8"
			>
				<p className="text-emerald-600">&larr; Back to department</p>
			</Link>
			<h1 className="mb-8">Update Role</h1>
			<form onSubmit={updateNameHandler} className="my-4">
				<fieldset
					disabled={getAccessibleResourcesQuery.data[6].permissionId < 3}
					className="flex flex-col justify-evenly gap-8 items-start"
				>
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
					className="flex flex-col justify-between gap-4"
				>
					<h2>Role Resource Permissions</h2>
					{Object.keys(roleResourcePermissions).map((r) => (
						<label key={r} className="w-full flex flex-row justify-between">
							{roleResourcePermissions[parseInt(r)].resourceName}
							<div>
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
							</div>
						</label>
					))}
				</fieldset>
				<button
					type="submit"
					className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 mx-auto text-white rounded-md"
				>
					Add Role
				</button>
				<button
					type="button"
					onClick={() =>
						navigate(
							`/departments/${
								getRoleByIdQuery.data[roleId as string].departmentId
							}`
						)
					}
					className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 mx-auto text-white rounded-md"
				>
					Cancel
				</button>
			</form>
		</section>
	);
};

export default UpdateRoleScreen;
