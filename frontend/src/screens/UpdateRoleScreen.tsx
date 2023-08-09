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
import {
	useUpdateRoleResourcePermissionMutation,
	useUpdateRoleResourcePermissionQuery,
} from "../slices/roleResourcePermissionsSlice";

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

	useEffect(() => {
		if (
			getAccessibleResourcesQuery.data &&
			getAccessibleResourcesQuery.data[6] < 3
		)
			navigate("/login");
	}, [navigate, userDetails]);

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

	const isLoading =
		getRoleByIdQuery.isLoading ||
		getRoleResourcePermissionsQuery.isLoading ||
		updateRoleLoading ||
		updateRoleResourcePermissionsLoading;

	const error =
		getRoleByIdQuery.error ||
		getRoleResourcePermissionsQuery.error ||
		updateRoleError ||
		updateRoleResourcePermissionsError;

	return (
		<section>
			{isLoading ? (
				<BlockingLoader />
			) : (
				<>
					<Link
						to={`/departments/${
							getRoleByIdQuery.data[roleId as string].departmentId
						}`}
						className="inline-block mt-8"
					>
						<p className="text-emerald-600">&larr; Back to department</p>
					</Link>
					<h1 className="mb-8">Update Role</h1>
					<form onSubmit={updateNameHandler} className="my-4">
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
							{error && (
								<p className="px-4 py-2 my-2 bg-red-800 text-white rounded-md">
									{"status" in error
										? "error" in error
											? error?.error
											: error?.data?.message
										: error.message}
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
						</fieldset>
					</form>
				</>
			)}
		</section>
	);
};

export default UpdateRoleScreen;
