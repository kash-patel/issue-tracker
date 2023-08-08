import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store.ts";
import { Provider } from "react-redux";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import HomeScreen from "./screens/HomeScreen.tsx";
import LoginScreen from "./screens/LoginScreen.tsx";
import DashboardScreen from "./screens/DashboardScreen.tsx";
import VehiclesScreen from "./screens/VehiclesScreen.tsx";
import CreateVehicleScreen from "./screens/CreateVehicleScreen.tsx";
import SpeciesScreen from "./screens/SpeciesScreen.tsx";
import CreateSpeciesScreen from "./screens/CreateSpeciesScreen.tsx";
import IndividualsScreen from "./screens/IndividualsScreen.tsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<HomeScreen />} />
			<Route path="/login" element={<LoginScreen />} />
			<Route path="/dashboard" element={<DashboardScreen />} />
			<Route path="/vehicles" element={<VehiclesScreen />} />
			<Route path="/vehicles/new" element={<CreateVehicleScreen />} />
			<Route path="/species" element={<SpeciesScreen />} />
			<Route path="/species/new" element={<CreateSpeciesScreen />} />
			<Route path="/species/:speciesId" element={<IndividualsScreen />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
