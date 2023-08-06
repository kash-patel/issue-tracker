import { useDispatch } from "react-redux";
import {
	useGetVehiclesQuery,
	useDeleteVehicleMutation,
} from "../slices/vehiclesApiSlice";
import BlockingLoader from "../components/BlockingLoader";

const VehiclesScreen = () => {
	const getVehiclesQuery = useGetVehiclesQuery(null);

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
				<ul>
					{Object.values(getVehiclesQuery.data).map((v: any) => (
						<li key={v.id}>
							{v.make} {v.model}
						</li>
					))}
				</ul>
			)}
		</section>
	);
};

export default VehiclesScreen;
