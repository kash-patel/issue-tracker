import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
	useGetDepartmentByIdQuery,
	useGetDepartmentRolesQuery,
	useDeleteDepartmentMutation,
} from "../slices/departmentsApiSlice";
import { useDeleteRoleMutation } from "../slices/rolesApiSlice";
import { useGetAccessibleResourcesQuery } from "../slices/usersApiSlice";
import BlockingLoader from "../components/BlockingLoader";
import { FaTrash } from "react-icons/fa6";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import LocalErrorDisplay from "../components/LocalErrorDisplay";

const RolesScreen = () => {
	const { departmentId } = useParams();
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
			getAccessibleResourcesQuery.data[6].permissionId < 2
		)
			navigate("/login");
	}, [navigate, userDetails]);

	const getRolesQuery = useGetDepartmentRolesQuery(parseInt(departmentId!));
	const getDepartmentByIdQuery = useGetDepartmentByIdQuery(
		departmentId as string
	);

	const [deleteRole, deleteRoleResult] = useDeleteRoleMutation();

	const [deleteDepartment, deleteDepartmentResult] =
		useDeleteDepartmentMutation();

	const handleDeleteDepartment = async () => {
		try {
			await deleteDepartment(departmentId as string).unwrap();
		} catch (error) {
			throw error;
		}
	};
	const handleDeleteRole = async (id: number) => {
		try {
			await deleteRole(id).unwrap();
		} catch (error) {
			throw error;
		}
	};

	const isLoading =
		getDepartmentByIdQuery.isLoading ||
		getRolesQuery.isLoading ||
		getAccessibleResourcesQuery.isLoading ||
		deleteRoleResult.isLoading ||
		deleteDepartmentResult.isLoading;

	const hasData: boolean =
		getDepartmentByIdQuery.data &&
		getRolesQuery.data &&
		getAccessibleResourcesQuery.data;

	const error =
		getDepartmentByIdQuery.error ||
		getRolesQuery.error ||
		getAccessibleResourcesQuery.error ||
		deleteRoleResult.error ||
		deleteDepartmentResult.error;

	if (isLoading) return <BlockingLoader />;
	if (!hasData) return <BlockingLoader statusCode={1} />;

	return (
		<section>
			<Link to={"/departments"} className="inline-block mt-8">
				<p className="text-emerald-600">&larr; Back to all departments</p>
			</Link>
			<h1 className="mb-8">
				{getDepartmentByIdQuery.data[departmentId as string]}
			</h1>
			<p className="mb-2">
				Here at Jurassic Park, every department is valued and needed.
			</p>

			{error && <LocalErrorDisplay error={error} />}

			<div className="flex flex-col justify-start items-center">
				{getAccessibleResourcesQuery.data[6].permissionId >= 3 && (
					<Link
						to={`/departments/${departmentId as string}/new`}
						className="inline-block mt-4"
					>
						<p className="px-4 py-2 bg-zinc-800 hover:bg-emerald-600 transition-all text-white inline-block rounded-md">
							Add Role
						</p>
					</Link>
				)}
				{Object.keys(getRolesQuery.data).length <= 0 &&
				getAccessibleResourcesQuery.data[2].permissionId >= 3 ? (
					<Link
						to={"/departments"}
						onClick={handleDeleteDepartment}
						className="inline-block mt-4"
					>
						<p className="text-emerald-600 hover:text-zinc-800 transition-all inline-block">
							Delete department
						</p>
					</Link>
				) : (
					<table className="mx-auto mt-4">
						<thead>
							<tr>
								<th className="px-2 py-1">Name</th>
								{getAccessibleResourcesQuery.data[6].permissionId >= 3 && (
									<th className="px-2 py-1"></th>
								)}
							</tr>
						</thead>
						<tbody>
							{Object.keys(getRolesQuery.data).map((i: string) => (
								<tr key={i}>
									<td className="px-2 py-1">
										<Link to={`/roles/${i}`}>
											<p className="underline text-emerald-600">
												{getRolesQuery.data[i].name}
											</p>
										</Link>
									</td>
									{getAccessibleResourcesQuery.data[6].permissionId >= 3 && (
										<td className="px-2 py-1">
											<Link
												onClick={() => handleDeleteRole(parseInt(i))}
												to={"#"}
											>
												<p className="text-red-600 font-semibold flex flex-col justify-center items-center">
													<FaTrash />
												</p>
											</Link>
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</section>
	);
};

export default RolesScreen;
