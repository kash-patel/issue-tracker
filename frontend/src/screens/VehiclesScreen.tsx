import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
	useGetVehiclesQuery,
	useDeleteVehicleMutation,
} from "../slices/vehiclesApiSlice";
import BlockingLoader from "../components/BlockingLoader";

const VehiclesScreen = () => {
	const getVehiclesQuery = useGetVehiclesQuery(null);
	const [deleteVehicle] = useDeleteVehicleMutation();

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
			{getVehiclesQuery.isLoading ? (
				<BlockingLoader />
			) : getVehiclesQuery.error ? (
				<p>
					{getVehiclesQuery.error?.data?.message ||
						getVehiclesQuery.error?.message ||
						getVehiclesQuery.error}
				</p>
			) : (
				<table className="mx-auto">
					<thead>
						<tr>
							<th className="px-2 py-1">ID</th>
							<th className="px-2 py-1">Make</th>
							<th className="px-2 py-1">Model</th>
							<th className="px-2 py-1"></th>
						</tr>
					</thead>
					<tbody>
						{Object.values(getVehiclesQuery.data).map((v: any) => (
							<tr key={v.id}>
								<td className="px-2 py-1">{v.id}</td>
								<td className="px-2 py-1">{v.make}</td>
								<td className="px-2 py-1">{v.model}</td>
								<td className="px-2 py-1">
									<Link onClick={handleDeleteClick(v.id)} to={"#"}>
										<p className="bg-red-500 px-2 py-1 rounded-md text-white font-semibold">
											Delete
										</p>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</section>
	);
};

export default VehiclesScreen;
