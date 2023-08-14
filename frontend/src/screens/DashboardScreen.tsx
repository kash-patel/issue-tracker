import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BlockingLoader from "../components/BlockingLoader";
import { useEffect } from "react";
import { useGetAccessibleResourcesQuery } from "../slices/usersApiSlice";
import { FaAngleRight } from "react-icons/fa6";
import { ResourceDisplayDetails } from "../utilities/utils";

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

	// if (resources) console.log(resources);

	return (
		<section>
			{isLoading ? (
				<BlockingLoader />
			) : error ? (
				<p className="px-4 py-2 mb-2 bg-red-800 text-white rounded-md">
					{error?.data?.message || error?.error || error?.message}
				</p>
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
						{Object.keys(resources).map((resourceId: string) =>
							resources[
								ResourceDisplayDetails[parseInt(resourceId)].checkPermissions
							] && ResourceDisplayDetails[parseInt(resourceId)].visible ? (
								<li key={resourceId}>
									<Link to={ResourceDisplayDetails[parseInt(resourceId)].url}>
										<div
											className={`p-4 flex flex-row justify-between items-center ${
												resources[
													ResourceDisplayDetails[parseInt(resourceId)]
														.checkPermissions
												].permissionId < 3
													? "bg-zinc-500"
													: "bg-emerald-600"
											} hover:bg-zinc-800 text-white font-bold drop-shadow-md hover:drop-shadow-xl transition-all rounded-md cursor-pointer select-none`}
										>
											<p className="uppercase tracking-widest inline">
												{
													ResourceDisplayDetails[parseInt(resourceId)]
														.displayName
												}
											</p>
											<FaAngleRight />
										</div>
									</Link>
								</li>
							) : null
						)}
					</ul>
				</>
			)}
		</section>
	);
};

export default DashboardScreen;
