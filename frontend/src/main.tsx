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
import CreateIndividualScreen from "./screens/CreateIndividualScreen.tsx";
import DepartmentsScreen from "./screens/DepartmentsScreen.tsx";
import RolesScreen from "./screens/RolesScreen.tsx";
import CreateDepartmentScreen from "./screens/CreateDepartmentScreen.tsx";
import CreateRoleScreen from "./screens/CreateRoleScreen.tsx";
import UpdateRoleScreen from "./screens/UpdateRoleScreen.tsx";
import UsersScreen from "./screens/UsersScreen.tsx";
import CreateUserScreen from "./screens/CreateUserScreen.tsx";
import UpdateUserScreen from "./screens/UpdateUserScreen.tsx";
import ErrorElement from "./components/ErrorElement.tsx";
import AboutScreen from "./screens/AboutScreen.tsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" errorElement={<ErrorElement />} element={<App />}>
			<Route index={true} path="/" element={<HomeScreen />} />
			<Route path="/login" element={<LoginScreen />} />
			<Route path="/dashboard" element={<DashboardScreen />} />
			<Route path="/vehicles" element={<VehiclesScreen />} />
			<Route path="/vehicles/new" element={<CreateVehicleScreen />} />
			<Route path="/species" element={<SpeciesScreen />} />
			<Route path="/species/new" element={<CreateSpeciesScreen />} />
			<Route path="/species/:speciesId" element={<IndividualsScreen />} />
			<Route
				path="/species/:speciesId/new"
				element={<CreateIndividualScreen />}
			/>
			<Route path="/departments" element={<DepartmentsScreen />} />
			<Route path="/departments/new" element={<CreateDepartmentScreen />} />
			<Route path="/departments/:departmentId" element={<RolesScreen />} />
			<Route
				path="/departments/:departmentId/new"
				element={<CreateRoleScreen />}
			/>
			<Route path="/roles/:roleId" element={<UpdateRoleScreen />} />
			<Route path="/users" element={<UsersScreen />} />
			<Route path="/users/new" element={<CreateUserScreen />} />
			<Route path="/users/:userId" element={<UpdateUserScreen />} />
			<Route path="/about" element={<AboutScreen />} />
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
