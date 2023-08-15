const BASE_URL =
	import.meta.env.VITE_ENV === "development"
		? "http://localhost:3000"
		: import.meta.env.VITE_API_URL;
const DEPARTMENTS_URL = BASE_URL + "/api/departments";
const ROLES_URL = BASE_URL + "/api/roles";
const USERS_URL = BASE_URL + "/api/users";
const LOCATIONS_URL = BASE_URL + "/api/locations";
const SYSTEMS_URL = BASE_URL + "/api/systems";
const SPECIES_URL = BASE_URL + "/api/species";
const ANIMALS_URL = BASE_URL + "/api/animals";
const VEHICLES_URL = BASE_URL + "/api/vehicles";
const ISSUES_URL = BASE_URL + "/api/issues";
const ROLE_RESOURCE_PERMISSIONS_URL = BASE_URL + "/api/roleResourcePermissions";

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
	ROLE_RESOURCE_PERMISSIONS_URL,
};

export default Constants;
