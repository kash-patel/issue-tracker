import { useSelector } from "react-redux";
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

	const [
		deleteVehicle,
		{ isLoading: isLoadingDeleteVehicle, error: deleteVehicleError },
	] = useDeleteVehicleMutation();

	const getAccessibleResourcesQuery = useGetAccessibleResourcesQuery(
		userDetails ? userDetails.userId : skipToken
	);

	useEffect(() => {
		if (
			getAccessibleResourcesQuery.data &&
			getAccessibleResourcesQuery.data[10] < 2
		)
			navigate("/login");
	}, [navigate, userDetails]);

	const handleDeleteClick = async (id: number) => {
		try {
			await deleteVehicle(id).unwrap();
		} catch (error) {
			throw error;
		}
	};

	return (
		<section>
			<Link to={"/dashboard"} className="inline-block mt-8">
				<p className="text-emerald-600">&larr; Back to your dashboard</p>
			</Link>
			<h1 className="mb-8">Jurassic Park Vehicles</h1>
			<p className="mb-2">
				Please note that all vehicles in the park <em>must</em> be registered
				with the Transportation department.
			</p>
			{getVehiclesQuery.error ? (
				<p className="px-4 py-2 mb-2 bg-red-800 text-white rounded-md">
					{getVehiclesQuery.error?.data?.message ||
						getVehiclesQuery.error?.message ||
						getVehiclesQuery.error}
				</p>
			) : getAccessibleResourcesQuery.error ? (
				<p className="px-4 py-2 mb-2 bg-red-800 text-white rounded-md">
					{getAccessibleResourcesQuery.error?.data?.message ||
						getAccessibleResourcesQuery.error?.message ||
						getAccessibleResourcesQuery.error}
				</p>
			) : (
				deleteVehicleError && (
					<p className="px-4 py-2 mb-2 bg-red-800 text-white rounded-md">
						{deleteVehicleError.error?.data?.message ||
							deleteVehicleError.error?.message ||
							deleteVehicleError.error}
					</p>
				)
			)}

			{getVehiclesQuery.isLoading ||
			getAccessibleResourcesQuery.isLoading ||
			isLoadingDeleteVehicle ? (
				<BlockingLoader />
			) : (
				<div className="flex flex-col justify-start items-center">
					<Link to={"/vehicles/new"} className="inline-block mt-4">
						<p className="px-4 py-2 bg-zinc-800 hover:bg-emerald-600 transition-all text-white inline-block rounded-md">
							Add Vehicle
						</p>
					</Link>
					<table className="mx-auto mt-4">
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
											<Link onClick={() => handleDeleteClick(v.id)} to={"#"}>
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
				</div>
			)}
		</section>
	);
};

export default VehiclesScreen;
