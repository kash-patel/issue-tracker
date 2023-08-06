import Constants from "../constants";

const ResourceDisplayDetails: {
	[resourceId: number]: {
		visible: boolean;
		displayName: string;
		url: string;
	};
} = {
	1: {
		visible: true,
		displayName: "Animals",
		url: Constants.ANIMALS_AND_SPECIES_URL,
	},
	2: {
		visible: false,
		displayName: "Departments",
		url: Constants.DEPARTMENTS_URL,
	},
	3: {
		visible: true,
		displayName: "Issues",
		url: Constants.ISSUES_URL,
	},
	4: {
		visible: false,
		displayName: "Park Locations",
		url: Constants.LOCATIONS_URL,
	},
	5: {
		visible: false,
		displayName: "Resources",
		url: "/",
	},
	6: {
		visible: true,
		displayName: "Roles and Departments",
		url: Constants.ROLES_AND_DEPARTMENTS_URL,
	},
	7: {
		visible: false,
		displayName: "Species",
		url: Constants.SPECIES_URL,
	},
	8: {
		visible: true,
		displayName: "Systems and Park Locations",
		url: Constants.SYSTEMS_AND_LOCATIONS_URL,
	},
	9: {
		visible: true,
		displayName: "Users",
		url: Constants.USERS_URL,
	},
	10: {
		visible: true,
		displayName: "Park Vehicles",
		url: Constants.VEHICLES_URL,
	},
};

export { ResourceDisplayDetails };
