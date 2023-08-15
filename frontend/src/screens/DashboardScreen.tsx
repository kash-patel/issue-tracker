import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BlockingLoader from "../components/BlockingLoader";
import { useEffect } from "react";
import { useGetAccessibleResourcesQuery } from "../slices/usersApiSlice";
import { FaAngleRight } from "react-icons/fa6";
import { ResourceDisplayDetails } from "../utilities/utils";
import LocalErrorDisplay from "../components/LocalErrorDisplay";

const DashboardScreen = () => {
	const navigate = useNavigate();
	const { userDetails } = useSelector((state: any) => state.auth);
	useEffect(() => {
		if (!userDetails) navigate("/login");
	}, [navigate, userDetails]);

	const getAccessibleResourcesQuery = useGetAccessibleResourcesQuery(
		userDetails.userId
	);

	const isLoading = getAccessibleResourcesQuery.isLoading;
	const hasData: boolean = getAccessibleResourcesQuery.data;
	const error = getAccessibleResourcesQuery.error;

	if (isLoading) return <BlockingLoader />;
	if (!hasData) return <BlockingLoader statusCode={1} />;

	return (
		<section>
			{error && <LocalErrorDisplay error={error} />}
			<h1 className="my-8">Dashboard</h1>
			<p className="mb-2">
				Here you can see your read-only resources and manage the resources you
				have write-permissions for.
			</p>
			<p className="mb-2">
				Read-only resources are grey and writable resources are green.
			</p>
			<ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{Object.keys(getAccessibleResourcesQuery.data).map(
					(resourceId: string) =>
						getAccessibleResourcesQuery.data[
							ResourceDisplayDetails[parseInt(resourceId)].checkPermissions
						] && ResourceDisplayDetails[parseInt(resourceId)].visible ? (
							<li key={resourceId}>
								<Link to={ResourceDisplayDetails[parseInt(resourceId)].url}>
									<div
										className={`p-4 flex flex-row justify-between items-center ${
											getAccessibleResourcesQuery.data[
												ResourceDisplayDetails[parseInt(resourceId)]
													.checkPermissions
											].permissionId < 3
												? "bg-zinc-500"
												: "bg-emerald-600"
										} hover:bg-zinc-800 text-white font-bold drop-shadow-md hover:drop-shadow-xl transition-all rounded-md cursor-pointer select-none`}
									>
										<p className="uppercase tracking-widest inline">
											{ResourceDisplayDetails[parseInt(resourceId)].displayName}
										</p>
										<FaAngleRight />
									</div>
								</Link>
							</li>
						) : null
				)}
			</ul>
		</section>
	);
};

export default DashboardScreen;
