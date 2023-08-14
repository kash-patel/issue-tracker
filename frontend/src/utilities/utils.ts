const ResourceDisplayDetails: {
	[resourceId: number]: {
		visible: boolean;
		displayName: string;
		url: string;
		checkPermissions: number;
	};
} = {
	1: {
		visible: true,
		displayName: "Animals",
		url: "/species",
		checkPermissions: 7,
	},
	2: {
		visible: true,
		displayName: "Departments and Roles",
		url: "/departments",
		checkPermissions: 2,
	},
	// 3: {
	// 	visible: true,
	// 	displayName: "Issues",
	// 	url: "/issues",
	// 	checkPermissions: 3,
	// },
	// 4: {
	// 	visible: false,
	// 	displayName: "Park Locations",
	// 	url: "/locations",
	// 	checkPermissions: 4,
	// },
	5: {
		visible: false,
		displayName: "Resources",
		url: "/",
		checkPermissions: 5,
	},
	6: {
		visible: false,
		displayName: "Roles",
		url: "/roles",
		checkPermissions: 6,
	},
	7: {
		visible: false,
		displayName: "Species",
		url: "/species",
		checkPermissions: 7,
	},
	// 8: {
	// 	visible: true,
	// 	displayName: "Systems and Park Locations",
	// 	url: "/systems",
	// 	checkPermissions: 4,
	// },
	9: {
		visible: true,
		displayName: "Users",
		url: "/users",
		checkPermissions: 9,
	},
	10: {
		visible: true,
		displayName: "Park Vehicles",
		url: "/vehicles",
		checkPermissions: 10,
	},
};

export { ResourceDisplayDetails };
