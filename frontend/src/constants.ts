const BASE_URL =
	import.meta.env.ENV === "development" ? "http://localhost:3000" : "";
const DEPARTMENTS_URL = "/api/departments";
const ROLES_AND_DEPARTMENTS_URL = "/api/roles-departments";
const USERS_URL = "/api/users";
const LOCATIONS_URL = "/api/locations";
const SYSTEMS_AND_LOCATIONS_URL = "/api/systems-locations";
const SPECIES_URL = "/api/species";
const ANIMALS_AND_SPECIES_URL = "/api/animals-species";
const VEHICLES_URL = "/api/vehicles";
const ISSUES_URL = "/api/issues";

const Constants = {
	BASE_URL,
	DEPARTMENTS_URL,
	ROLES_AND_DEPARTMENTS_URL,
	USERS_URL,
	LOCATIONS_URL,
	SYSTEMS_AND_LOCATIONS_URL,
	SPECIES_URL,
	ANIMALS_AND_SPECIES_URL,
	VEHICLES_URL,
	ISSUES_URL,
};

export default Constants;
