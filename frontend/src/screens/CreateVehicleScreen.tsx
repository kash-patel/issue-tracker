import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, FormEvent, useState } from "react";
import { useCreateVehicleMutation } from "../slices/vehiclesApiSlice";
import { useGetAccessibleResourcesQuery } from "../slices/usersApiSlice";
import BlockingLoader from "../components/BlockingLoader";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const CreateVehicleScreen = () => {
	const navigate = useNavigate();
	const { userDetails } = useSelector((state: any) => state.auth);

	useEffect(() => {
		if (!userDetails) navigate("/login");
	}, [navigate, userDetails]);

	const [
		createVehicle,
		{
			isLoading: createVehicleLoading,
			error: createVehicleError,
			isSuccess: createVehicleSuccess,
		},
	] = useCreateVehicleMutation();

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

	const [make, setMake] = useState("");
	const [model, setModel] = useState("");
	const [licensePlate, setLicensePlate] = useState("");

	const submitHandler = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await createVehicle({ make, model, licensePlate }).unwrap();
			navigate("/vehicles");
		} catch (err: any) {
			console.log(err?.data?.message || err?.message || err?.error);
		}
	};

	return (
		<section>
			{createVehicleLoading && <BlockingLoader />}
			<h1 className="my-8">Add Vehicle</h1>
			<Link to={"/vehicles"}>
				<p className="text-emerald-600">&larr; Back to all vehicles</p>
			</Link>
			<form onSubmit={submitHandler} className="my-4">
				<fieldset className="flex flex-col justify-evenly gap-8 items-start">
					<label className="w-full">
						Make
						<input
							type="text"
							id="make"
							name="make"
							onChange={(e) => setMake(e.target.value)}
							className="w-full"
						/>
					</label>
					<label className="w-full">
						Model
						<input
							type="text"
							id="model"
							name="model"
							onChange={(e) => setModel(e.target.value)}
							className="w-full"
						/>
					</label>
					<label className="w-full">
						License Plate
						<input
							type="text"
							id="license-plate"
							name="license-plate"
							onChange={(e) => setLicensePlate(e.target.value)}
							className="w-full"
						/>
					</label>
					{createVehicleError && (
						<p className="px-4 py-2 my-2 bg-red-800 text-white rounded-md">
							{createVehicleError.error?.data?.message ||
								createVehicleError.error?.message ||
								createVehicleError.error}
						</p>
					)}
					<button
						type="submit"
						className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 mx-auto text-white rounded-md"
					>
						Add Vehicle
					</button>
					<button
						type="button"
						onClick={() => navigate("/vehicles")}
						className="bg-zinc-800 hover:bg-emerald-600 transition-all px-4 py-2 mx-auto text-white rounded-md"
					>
						Cancel
					</button>
				</fieldset>
			</form>
		</section>
	);
};

export default CreateVehicleScreen;
