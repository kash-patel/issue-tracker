import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
	useGetUsersQuery,
	useGetAccessibleResourcesQuery,
} from "../slices/usersApiSlice";
import BlockingLoader from "../components/BlockingLoader";
import { FaPencil } from "react-icons/fa6";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const UsersScreen = () => {
	const navigate = useNavigate();
	const { userDetails } = useSelector((state: any) => state.auth);

	useEffect(() => {
		if (!userDetails) navigate("/login");
	}, [navigate, userDetails]);

	const getUsersQuery = useGetUsersQuery(null);

	const getAccessibleResourcesQuery = useGetAccessibleResourcesQuery(
		userDetails ? userDetails.userId : skipToken
	);

	useEffect(() => {
		if (
			getAccessibleResourcesQuery.data &&
			getAccessibleResourcesQuery.data[9] < 2
		)
			navigate("/login");
	}, [navigate, userDetails]);

	const error = getUsersQuery.error || getAccessibleResourcesQuery.error;

	const loading: boolean =
		getUsersQuery.isLoading || getAccessibleResourcesQuery.isLoading;

	if (loading) return <BlockingLoader />;

	return (
		<section>
			<Link to={"/departments"} className="inline-block mt-8">
				<p className="text-emerald-600">&larr; Back to all departments</p>
			</Link>
			<h1 className="mb-8">Users</h1>
			<p className="mb-2">All ParkMan users.</p>

			{error && (
				<p className="px-4 py-2 mb-2 bg-red-800 text-white rounded-md">
					{"status" in error
						? "error" in error
							? error?.error
							: error?.data?.message
						: error.message}
				</p>
			)}
			<div className="flex flex-col justify-start items-center">
				{getAccessibleResourcesQuery.data[9].permissionId >= 3 && (
					<Link to={"/users/new"} className="inline-block mt-4">
						<p className="px-4 py-2 bg-zinc-800 hover:bg-emerald-600 transition-all text-white inline-block rounded-md">
							Add User
						</p>
					</Link>
				)}
				{getUsersQuery.data && Object.keys(getUsersQuery.data).length <= 0 ? (
					<p className="inline-block">No existing users.</p>
				) : (
					getUsersQuery.data && (
						<table className="mx-auto mt-4">
							<thead>
								<tr>
									<th className="px-2 py-1">Username</th>
									<th className="px-2 py-1">First Name</th>
									<th className="px-2 py-1">Last Name</th>
									{getAccessibleResourcesQuery.data[9].permissionId >= 3 && (
										<th className="px-2 py-1"></th>
									)}
								</tr>
							</thead>
							<tbody>
								{Object.keys(getUsersQuery.data).map((i: string) => (
									<tr key={i}>
										<td className="px-2 py-1">
											{getUsersQuery.data[i].username}
										</td>
										<td className="px-2 py-1">
											{getUsersQuery.data[i].first_name}
										</td>
										<td className="px-2 py-1">
											{getUsersQuery.data[i].last_name}
										</td>
										{getAccessibleResourcesQuery.data[9].permissionId >= 3 && (
											<td className="px-2 py-1">
												<Link to={`/users/${getUsersQuery.data[i].id}`}>
													<p className="text-emerald-600 flex flex-col justify-center items-center">
														<FaPencil />
													</p>
												</Link>
											</td>
										)}
									</tr>
								))}
							</tbody>
						</table>
					)
				)}
			</div>
		</section>
	);
};

export default UsersScreen;
