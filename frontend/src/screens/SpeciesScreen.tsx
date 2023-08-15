import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetSpeciesQuery } from "../slices/speciesApiSlice";
import { useGetAccessibleResourcesQuery } from "../slices/usersApiSlice";
import BlockingLoader from "../components/BlockingLoader";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import LocalErrorDisplay from "../components/LocalErrorDisplay";

const SpeciesScreen = () => {
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
			getAccessibleResourcesQuery.data[7].permissionId < 2
		)
			navigate("/login");
	}, [navigate, userDetails]);

	const getSpeciesQuery = useGetSpeciesQuery(null);

	const isLoading =
		getAccessibleResourcesQuery.isLoading || getSpeciesQuery.isLoading;
	const hasData: boolean =
		getAccessibleResourcesQuery.data || getSpeciesQuery.data;
	const error = getAccessibleResourcesQuery.error || getSpeciesQuery.error;

	if (isLoading) return <BlockingLoader />;
	if (!hasData) return <BlockingLoader statusCode={1} />;

	return (
		<section>
			<Link to={"/dashboard"} className="inline-block mt-8">
				<p className="text-emerald-600">&larr; Back to your dashboard</p>
			</Link>
			<h1 className="mb-8">Prehistoric Species</h1>
			<p className="mb-2">
				Please note that the prehistoric animal biodiversity in Jurassic Park is
				carefully managed by the Genetic Engineering department. If you have
				questions or concerns, please do <em>not</em> contact Chief Geneticist
				Dr. Henry Wu directly.
			</p>
			{error && <LocalErrorDisplay error={error} />}
			<ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{Object.keys(getSpeciesQuery.data).map((sid: string) => (
					<li key={sid}>
						<Link to={`/species/${sid}`}>
							<div
								className={
									"p-4 flex flex-row justify-between items-center bg-emerald-600 hover:bg-zinc-800 text-white font-bold drop-shadow-md hover:drop-shadow-xl transition-all rounded-md cursor-pointer select-none"
								}
							>
								<p className="uppercase tracking-widest inline">
									{getSpeciesQuery.data[sid].genusName}&nbsp;
									{getSpeciesQuery.data[sid].speciesName}
								</p>
							</div>
						</Link>
					</li>
				))}
				{getAccessibleResourcesQuery.data[7].permissionId >= 3 && (
					<li key={"new"}>
						<Link to={"/species/new"}>
							<div
								className={
									"p-4 flex flex-row justify-between items-center bg-zinc-800 hover:bg-emerald-600 text-white font-bold drop-shadow-md hover:drop-shadow-xl transition-all rounded-md cursor-pointer select-none"
								}
							>
								<p className="uppercase tracking-widest inline">
									Add New Species
								</p>
							</div>
						</Link>
					</li>
				)}
			</ul>
		</section>
	);
};

export default SpeciesScreen;
