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
		url: "/species",
	},
	2: {
		visible: true,
		displayName: "Departments and Roles",
		url: "/departments",
	},
	3: {
		visible: true,
		displayName: "Issues",
		url: "/issues",
	},
	4: {
		visible: false,
		displayName: "Park Locations",
		url: "/locations",
	},
	5: {
		visible: false,
		displayName: "Resources",
		url: "/",
	},
	6: {
		visible: false,
		displayName: "Roles",
		url: "/roles",
	},
	7: {
		visible: false,
		displayName: "Species",
		url: "/species",
	},
	8: {
		visible: true,
		displayName: "Systems and Park Locations",
		url: "/systems",
	},
	9: {
		visible: true,
		displayName: "Users",
		url: "/users",
	},
	10: {
		visible: true,
		displayName: "Park Vehicles",
		url: "/vehicles",
	},
};

export { ResourceDisplayDetails };
