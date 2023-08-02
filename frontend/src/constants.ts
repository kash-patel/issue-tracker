const BASE_URL =
	process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
const DEPARTMENTS_URL = "/api/departments";
const ROLES_URL = "/api/roles";
const USERS_URL = "/api/users";
const LOCATIONS_URL = "/api/locations";
const SYSTEMS_URL = "/api/systems";
const SPECIES_URL = "/api/species";
const ANIMALS_URL = "/api/animals";
const VEHICLES_URL = "/api/vehicles";
const ISSUES_URL = "/api/issues";

const Constants = {
	BASE_URL,
	DEPARTMENTS_URL,
	ROLES_URL,
	USERS_URL,
	LOCATIONS_URL,
	SYSTEMS_URL,
	SPECIES_URL,
	ANIMALS_URL,
	VEHICLES_URL,
	ISSUES_URL,
};

export default Constants;
