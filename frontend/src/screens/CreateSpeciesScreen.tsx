import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, FormEvent, useState } from "react";
import { useCreateSpeciesMutation } from "../slices/speciesApiSlice";
import { useGetAccessibleResourcesQuery } from "../slices/usersApiSlice";
import BlockingLoader from "../components/BlockingLoader";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const CreateSpeciesScreen = () => {
	const navigate = useNavigate();
	const { userDetails } = useSelector((state: any) => state.auth);

	useEffect(() => {
		if (!userDetails) navigate("/login");
	}, [navigate, userDetails]);

	const [
		createSpecies,
		{ isLoading: createSpeciesLoading, error: createSpeciesError },
	] = useCreateSpeciesMutation();

	const getAccessibleResourcesQuery = useGetAccessibleResourcesQuery(
		userDetails ? userDetails.userId : skipToken
	);

	useEffect(() => {
		if (
			getAccessibleResourcesQuery.data &&
			getAccessibleResourcesQuery.data[10] < 3
		)
			navigate("/login");
	}, [navigate, userDetails]);

	const [genusName, setGenusName] = useState("");
	const [speciesName, setSpeciesName] = useState("");

	const submitHandler = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await createSpecies({ genus: genusName, species: speciesName }).unwrap();
			navigate("/species");
		} catch (err: any) {
			console.log(err?.data?.message || err?.message || err?.error);
		}
	};

	return (
		<section>
			{createSpeciesLoading && <BlockingLoader />}
			<Link to={"/species"} className="inline-block mt-8">
				<p className="text-emerald-600">&larr; Back to all species</p>
			</Link>
			<h1 className="mb-8">Add Species</h1>
			<form onSubmit={submitHandler} className="my-4">
				<fieldset className="flex flex-col justify-evenly gap-8 items-start">
					<label className="w-full">
						Genus
						<input
							type="text"
							id="make"
							name="make"
							onChange={(e) => setGenusName(e.target.value)}
							className="w-full"
						/>
					</label>
					<label className="w-full">
						Species
						<input
							type="text"
							id="model"
							name="model"
							onChange={(e) => setSpeciesName(e.target.value)}
							className="w-full"
						/>
					</label>
					{createSpeciesError && (
						<p className="px-4 py-2 my-2 bg-red-800 text-white rounded-md">
							{createSpeciesError.error?.data?.message ||
								createSpeciesError.error?.message ||
								createSpeciesError.error}
						</p>
					)}
					<button
						type="submit"
						className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 mx-auto text-white rounded-md"
					>
						Add Species
					</button>
					<button
						type="button"
						onClick={() => navigate("/species")}
						className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 mx-auto text-white rounded-md"
					>
						Cancel
					</button>
				</fieldset>
			</form>
		</section>
	);
};

export default CreateSpeciesScreen;
