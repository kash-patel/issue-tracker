import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BlockingLoader from "../components/BlockingLoader";
import { useEffect } from "react";
import { useGetAccessibleResourcesQuery } from "../slices/usersApiSlice";
import { FaAngleRight } from "react-icons/fa6";

const DashboardScreen = () => {
	const navigate = useNavigate();
	const { userDetails } = useSelector((state: any) => state.auth);
	const {
		data: resources,
		isLoading,
		error,
	} = useGetAccessibleResourcesQuery(userDetails.userId);

	useEffect(() => {
		if (!userDetails) navigate("/login");
	}, [navigate, userDetails]);

	return (
		<section>
			{isLoading ? (
				<BlockingLoader />
			) : error ? (
				<p>{error?.data?.message || error?.error || error?.message}</p>
			) : (
				<>
					<h1 className="my-8">Dashboard</h1>
					<p className="mb-2">
						Here you can see your read-only resources and manage the resources
						you have write-permissions for.
					</p>
					<p className="mb-2">
						Read-only resources are grey and writable resources are green.
					</p>

					<ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{Object.keys(resources).map((resourceId: string) => (
							<li
								key={resourceId}
								className={`p-4 ${
									parseInt(resources[resourceId].permissionId) == 2
										? "bg-zinc-500"
										: "bg-emerald-600"
								} hover:bg-zinc-800 text-white font-bold drop-shadow-md hover:drop-shadow-xl transition-all rounded-md cursor-pointer select-none`}
							>
								<Link to={"#"}>
									<div className="flex flex-row justify-between items-center">
										<p className="uppercase tracking-widest inline">
											{resources[resourceId].resourceName}
										</p>
										<FaAngleRight />
									</div>
								</Link>
							</li>
						))}
					</ul>
				</>
			)}
		</section>
	);
};

export default DashboardScreen;