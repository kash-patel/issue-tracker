import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, FormEvent, useState } from "react";
import { useCreateIndividualMutation } from "../slices/individualsApiSlice";
import { useGetAccessibleResourcesQuery } from "../slices/usersApiSlice";
import BlockingLoader from "../components/BlockingLoader";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const CreateIndividualScreen = () => {
	const navigate = useNavigate();
	const { userDetails } = useSelector((state: any) => state.auth);
	const { speciesId } = useParams();

	useEffect(() => {
		if (!userDetails) navigate("/login");
	}, [navigate, userDetails]);

	const [
		createIndividual,
		{ isLoading: createIndividualLoading, error: createIndividualError },
	] = useCreateIndividualMutation();

	const getAccessibleResourcesQuery = useGetAccessibleResourcesQuery(
		userDetails ? userDetails.userId : skipToken
	);

	useEffect(() => {
		if (
			getAccessibleResourcesQuery.data &&
			getAccessibleResourcesQuery.data[1] < 3
		)
			navigate("/login");
	}, [navigate, userDetails]);

	const [name, setName] = useState("");

	const submitHandler = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await createIndividual({
				name,
				speciesId,
			}).unwrap();
			navigate(`/species/${speciesId}`);
		} catch (err: any) {
			console.log(err?.data?.message || err?.message || err?.error);
		}
	};

	return (
		<section>
			{createIndividualLoading && <BlockingLoader />}
			<Link to={`/species/${speciesId}`} className="inline-block mt-8">
				<p className="text-emerald-600">&larr; Back to species page</p>
			</Link>
			<h1 className="mb-8">Add Individual</h1>
			<form onSubmit={submitHandler} className="my-4">
				<fieldset className="flex flex-col justify-evenly gap-8 items-start">
					<label className="w-full">
						Name
						<input
							type="text"
							id="name"
							name="name"
							onChange={(e) => setName(e.target.value)}
							className="w-full"
						/>
					</label>
					{createIndividualError && (
						<p className="px-4 py-2 my-2 bg-red-800 text-white rounded-md">
							{createIndividualError.error?.data?.message ||
								createIndividualError.error?.message ||
								createIndividualError.error}
						</p>
					)}
					<button
						type="submit"
						className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 mx-auto text-white rounded-md"
					>
						Add Individual
					</button>
					<button
						type="button"
						onClick={() => navigate(`/species/${speciesId}`)}
						className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 mx-auto text-white rounded-md"
					>
						Cancel
					</button>
				</fieldset>
			</form>
		</section>
	);
};

export default CreateIndividualScreen;
