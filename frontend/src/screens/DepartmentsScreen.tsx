import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetDepartmentsQuery } from "../slices/departmentsApiSlice";
import { useGetAccessibleResourcesQuery } from "../slices/usersApiSlice";
import BlockingLoader from "../components/BlockingLoader";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import LocalErrorDisplay from "../components/LocalErrorDisplay";

const DepartmentsScreen = () => {
	const navigate = useNavigate();
	const { userDetails } = useSelector((state: any) => state.auth);

	useEffect(() => {
		if (!userDetails) navigate("/login");
	}, [navigate, userDetails]);

	useEffect(() => {
		if (
			getAccessibleResourcesQuery.data &&
			getAccessibleResourcesQuery.data[2].permissionId < 2
		)
			navigate("/login");
	}, [navigate, userDetails]);

	const getAccessibleResourcesQuery = useGetAccessibleResourcesQuery(
		userDetails ? userDetails.userId : skipToken
	);

	const getDepartmentsQuery = useGetDepartmentsQuery(null);

	const isLoading =
		getDepartmentsQuery.isLoading || getAccessibleResourcesQuery.isLoading;
	const hasData: boolean =
		getDepartmentsQuery.data || getAccessibleResourcesQuery.data;
	const error = getAccessibleResourcesQuery.error || getDepartmentsQuery.error;

	if (isLoading) return <BlockingLoader />;
	if (!hasData) return <BlockingLoader statusCode={1} />;

	return (
		<section>
			<Link to={"/dashboard"} className="inline-block mt-8">
				<p className="text-emerald-600">&larr; Back to your dashboard</p>
			</Link>
			<h1 className="mb-8">Departments</h1>
			<p className="mb-2">
				Here at Jurassic Park, every department is valued and needed.
			</p>
			{error && <LocalErrorDisplay error={error} />}

			{isLoading ? (
				<BlockingLoader />
			) : (
				<ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{Object.keys(getDepartmentsQuery.data).map((id: string) => (
						<li key={id}>
							<Link to={`/departments/${id}`}>
								<div
									className={
										"p-4 flex flex-row justify-between items-center bg-emerald-600 hover:bg-zinc-800 text-white font-bold drop-shadow-md hover:drop-shadow-xl transition-all rounded-md cursor-pointer select-none"
									}
								>
									<p className="uppercase tracking-widest inline">
										{getDepartmentsQuery.data[id]}
									</p>
								</div>
							</Link>
						</li>
					))}
					{getAccessibleResourcesQuery.data[2].permissionId >= 3 && (
						<li key={"new"}>
							<Link to={"/departments/new"}>
								<div
									className={
										"p-4 flex flex-row justify-between items-center bg-zinc-800 hover:bg-emerald-600 text-white font-bold drop-shadow-md hover:drop-shadow-xl transition-all rounded-md cursor-pointer select-none"
									}
								>
									<p className="uppercase tracking-widest inline">
										Add New Department
									</p>
								</div>
							</Link>
						</li>
					)}
				</ul>
			)}
		</section>
	);
};

export default DepartmentsScreen;
