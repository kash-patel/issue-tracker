export type UserDetails = {
	userId: number;
	username: string;
	firstName: string;
	lastName: string;
	roles: {
		[roleId: number]: {
			roleName: string;
			departmentId: number;
			departmentName: string;
			resourcePermissions: {
				[resourceId: number]: {
					resourceName: string;
					permissionId: number;
					permissionName: string;
				};
			};
		};
	};
};
