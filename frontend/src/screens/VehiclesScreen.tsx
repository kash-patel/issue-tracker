import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
	useGetVehiclesQuery,
	useDeleteVehicleMutation,
} from "../slices/vehiclesApiSlice";
import { useGetAccessibleResourcesQuery } from "../slices/usersApiSlice";
import BlockingLoader from "../components/BlockingLoader";
import { FaTrash } from "react-icons/fa6";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const VehiclesScreen = () => {
	const navigate = useNavigate();
	const { userDetails } = useSelector((state: any) => state.auth);

	useEffect(() => {
		if (!userDetails) navigate("/login");
	}, [navigate, userDetails]);

	const getVehiclesQuery = useGetVehiclesQuery(null);
	const [deleteVehicle] = useDeleteVehicleMutation();
	const getAccessibleResourcesQuery = useGetAccessibleResourcesQuery(
		userDetails ? userDetails.userId : skipToken
	);

	const handleDeleteClick = (id: number) => {
		return async () => {
			try {
				await console.log(`Delete vehicle ${id}.`);
				// await deleteVehicle(id);
			} catch (error) {
				throw error;
			}
		};
	};

	return (
		<section>
			<h1 className="my-8">Jurassic Park Vehicles</h1>
			<p className="mb-2">
				Please note that all vehicles in the park <em>must</em> be registered
				with the Transportation department.
			</p>
			{getVehiclesQuery.isLoading || getAccessibleResourcesQuery.isLoading ? (
				<BlockingLoader />
			) : getVehiclesQuery.error ? (
				<p>
					{getVehiclesQuery.error?.data?.message ||
						getVehiclesQuery.error?.message ||
						getVehiclesQuery.error}
				</p>
			) : getAccessibleResourcesQuery.error ? (
				<p>
					{getAccessibleResourcesQuery.error?.data?.message ||
						getAccessibleResourcesQuery.error?.message ||
						getAccessibleResourcesQuery.error}
				</p>
			) : (
				<table className="mx-auto mt-8">
					<thead>
						<tr>
							<th className="px-2 py-1">ID</th>
							<th className="px-2 py-1">Make</th>
							<th className="px-2 py-1">Model</th>
							<th className="px-2 py-1">License</th>
							{getAccessibleResourcesQuery.data[10].permissionId >= 3 && (
								<th className="px-2 py-1"></th>
							)}
						</tr>
					</thead>
					<tbody>
						{Object.values(getVehiclesQuery.data).map((v: any) => (
							<tr key={v.id}>
								<td className="px-2 py-1">{v.id}</td>
								<td className="px-2 py-1">{v.make}</td>
								<td className="px-2 py-1">{v.model}</td>
								<td className="px-2 py-1">{v.license_plate}</td>
								{getAccessibleResourcesQuery.data[10].permissionId >= 3 && (
									<td className="px-2 py-1">
										<Link onClick={handleDeleteClick(v.id)} to={"#"}>
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
		</section>
	);
};

export default VehiclesScreen;
