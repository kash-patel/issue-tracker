import { useListQuery } from "../slices/usersApiSlice";

const HomeScreen = () => {
	const { data: users, isLoading, error } = useListQuery(null);

	return (
		<section>
			{isLoading ? (
				<p>Loading...</p>
			) : error ? (
				<p>Error!</p>
			) : (
				<>
					<h2>Users</h2>
					<ul>
						{users.map(
							(userDetails: {
								id: number;
								username: string;
								password_hashed: string;
								first_name: string;
								last_name: string;
							}) => (
								<li key={userDetails.id}>{userDetails.first_name}</li>
							)
						)}
					</ul>
				</>
			)}
		</section>
	);
};

export default HomeScreen;
