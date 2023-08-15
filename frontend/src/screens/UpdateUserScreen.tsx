import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, FormEvent, useState } from "react";
import { useGetDepartmentsQuery } from "../slices/departmentsApiSlice";
import { useGetRolesQuery } from "../slices/rolesApiSlice";
import {
	useGetUserByIdQuery,
	useGetUserRolesQuery,
	useUpdateUserRolesMutation,
	useDeleteUserMutation,
} from "../slices/usersApiSlice";
import { useGetAccessibleResourcesQuery } from "../slices/usersApiSlice";
import BlockingLoader from "../components/BlockingLoader";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import LocalErrorDisplay from "../components/LocalErrorDisplay";

const UpdateUserScreen = () => {
	const { userId } = useParams();
	const navigate = useNavigate();
	const { userDetails } = useSelector((state: any) => state.auth);

	useEffect(() => {
		if (!userDetails) navigate("/login");
	}, [navigate, userDetails]);

	const getAccessibleResourcesQuery = useGetAccessibleResourcesQuery(
		userDetails ? userDetails.userId : skipToken
	);

	useEffect(() => {
		if (
			getAccessibleResourcesQuery.data &&
			getAccessibleResourcesQuery.data[9].permissionId < 3
		)
			navigate("/login");
	}, [navigate, userDetails]);

	const getDepartmentsQuery = useGetDepartmentsQuery(null);
	const getRolesQuery = useGetRolesQuery(null);
	const getUserByIdQuery = useGetUserByIdQuery(userId as string);
	const getUserRolesQuery = useGetUserRolesQuery(userId as string);
	const [updateUserRoles, updateUserRolesResult] = useUpdateUserRolesMutation();
	const [deleteUser, deleteUserResult] = useDeleteUserMutation();
	const [roles, setRoles]: [
		{
			[departmentId: number]: {
				departmentName: string;
				roles: {
					[roleId: number]: string;
				};
			};
		},
		any
	] = useState({});
	const [userRoles, setUserRoles]: [Array<number>, any] = useState([]);
	const [didFetchRoles, setDidFetchRoles] = useState(false);
	const [didFetchUserRoles, setDidFetchUserRoles] = useState(false);

	if (!didFetchRoles && getRolesQuery.data && getDepartmentsQuery.data) {
		setRoles((prevRoles: any) => {
			const newRoles: {
				[departmentId: number]: {
					departmentName: string;
					roles: {
						[roleId: number]: string;
					};
				};
			} = { ...prevRoles };

			Object.keys(getRolesQuery.data).forEach((rid) => {
				if (!newRoles[getRolesQuery.data[rid].departmentId])
					newRoles[getRolesQuery.data[rid].departmentId] = {
						departmentName:
							getDepartmentsQuery.data[getRolesQuery.data[rid].departmentId],
						roles: {},
					};

				newRoles[getRolesQuery.data[rid].departmentId].roles = {
					...newRoles[getRolesQuery.data[rid].departmentId].roles,
					[rid]: getRolesQuery.data[rid].name,
				};
			});

			return newRoles;
		});

		setDidFetchRoles(true);
	}

	if (!didFetchUserRoles && getUserRolesQuery.data) {
		setUserRoles(() => {
			const newRoleIds: Array<number> = [];

			Object.keys(getUserRolesQuery.data).forEach((did: string) => {
				const departmentId = parseInt(did);

				Object.keys(getUserRolesQuery.data[departmentId].roles).forEach(
					(r: string) => {
						const roleId = parseInt(r);
						newRoleIds.push(roleId);
					}
				);
			});

			return newRoleIds;
		});

		setDidFetchUserRoles(true);
	}

	const toggleRoleId = (roleId: number) => {
		const newRoleIds = [...userRoles];
		const index: number = newRoleIds.findIndex((value) => value == roleId);
		if (index <= -1) newRoleIds.push(roleId);
		else newRoleIds.splice(index, 1);
		setUserRoles(newRoleIds);
	};

	const deleteUserHandler = async () => {
		try {
			await deleteUser(parseInt(userId as string));
			navigate("/users");
		} catch (err) {
			console.log(err);
		}
	};

	const submitHandler = async (e: FormEvent) => {
		e.preventDefault();

		try {
			await updateUserRoles({
				id: userId as string,
				newUserRoles: userRoles,
			}).unwrap();

			navigate("/users");
		} catch (err) {
			console.log(err);
		}
	};

	const isLoading =
		getAccessibleResourcesQuery.isLoading ||
		getUserByIdQuery.isLoading ||
		getUserRolesQuery.isLoading ||
		getRolesQuery.isLoading ||
		getDepartmentsQuery.isLoading ||
		updateUserRolesResult.isLoading ||
		deleteUserResult.isLoading;

	const hasData: boolean =
		getAccessibleResourcesQuery.data &&
		getUserByIdQuery.data &&
		getUserRolesQuery.data &&
		getDepartmentsQuery.data &&
		getRolesQuery.data;

	const error =
		getAccessibleResourcesQuery.error ||
		getUserByIdQuery.error ||
		getUserRolesQuery.error ||
		getRolesQuery.error ||
		getDepartmentsQuery.error ||
		updateUserRolesResult.error ||
		deleteUserResult.error;

	if (isLoading) return <BlockingLoader />;
	if (!hasData) return <BlockingLoader statusCode={1} />;

	return (
		<section>
			<Link to={"/users"} className="inline-block mt-8">
				<p className="text-emerald-600">&larr; Back to all users</p>
			</Link>
			<h1>
				{getUserByIdQuery.data.firstName}&nbsp;
				{getUserByIdQuery.data.lastName}
			</h1>
			<code className="block mb-8">
				&lt;{getUserByIdQuery.data.username}&gt;
			</code>
			<h2 className="mb-4">Roles</h2>
			<form onSubmit={submitHandler} className="my-4">
				{Object.keys(roles).length <= 0 ? (
					<p>There are currently no roles at Jurassic Park.</p>
				) : (
					<fieldset
						className="mb-8"
						disabled={getAccessibleResourcesQuery.data[9].permissionId < 3}
					>
						{Object.keys(roles).map((did) => (
							<fieldset key={did} className="mb-4">
								<legend className="font-bold uppercase tracking-wide text-sm">
									{roles[parseInt(did)].departmentName}
								</legend>
								<fieldset key={did}>
									{Object.keys(roles[parseInt(did)].roles).map((rid) => (
										<label
											key={rid}
											htmlFor={rid}
											className="flex flex-row justify-start items-center gap-2 my-1"
										>
											<input
												type="checkbox"
												id={rid}
												name={rid}
												defaultChecked={userRoles.includes(parseInt(rid))}
												onChange={() => {
													toggleRoleId(parseInt(rid as string));
												}}
											/>
											{roles[parseInt(did)].roles[parseInt(rid)]}
										</label>
									))}
								</fieldset>
							</fieldset>
						))}
					</fieldset>
				)}
				{error && <LocalErrorDisplay error={error} />}
				{getAccessibleResourcesQuery.data[9].permissionId > 3 && (
					<>
						<fieldset className="my-2 flex flex-row justify-around gap-2">
							<button
								type="submit"
								className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 mx-auto text-white rounded-md"
							>
								Update User Roles
							</button>
							<button
								type="button"
								onClick={() => navigate("/users")}
								className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 mx-auto text-white rounded-md"
							>
								Cancel
							</button>
						</fieldset>
						<fieldset className="my-2">
							<button
								type="button"
								onClick={deleteUserHandler}
								className="w-full bg-red-600 hover:bg-red-800 transition-all px-4 py-2 mx-auto text-white rounded-md"
							>
								Delete User
							</button>
						</fieldset>
					</>
				)}
			</form>
		</section>
	);
};

export default UpdateUserScreen;
