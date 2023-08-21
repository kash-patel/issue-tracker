const AboutScreen = () => {
	return (
		<section>
			<h1 className="my-8">About ParkMan</h1>

			<p className="mb-4">ParkMan is the Jurassic Park resource manager.</p>
			<p className="mb-4">
				Constructed over the course of several weeks, the all-JavaScript full
				stack application is built on the base of a PostgreSQL database. A
				relational database was chosen to ensure consistency of relations and to
				make debugging easy &mdash; a crucial element of any big project!
			</p>

			<h2 className="my-4">The Database</h2>
			<p className="mb-4">
				The PostgreSQL database that forms the foundation of ParkMan took some
				planning. In fact, over a week was spent designing the relationships and
				constraints between different entities.
			</p>
			<p className="mb-4">
				It started its life as normalized as a database can be. Each table
				contained at most three columns, one for an identitifier, and another
				for a value, and an optional third for the identitifier of the record in
				another table to which that record was associated.
			</p>
			<p className="mb-4">
				Eventually, some strong links between entities emerged, and the
				corresponding tables were combined. Now, the <code>users</code> table,
				for instance, contains a username, first name, last name, and hashed
				password.
			</p>

			<h2 className="my-4">The Backend</h2>
			<p className="mb-4">
				PakMan&rsquo;s backend is built with ExpressJs and makes use of{" "}
				<code>react-router</code> to provide snappy navigation that doesn't need
				to fetch data unless a database operation is being performed.
			</p>

			<h3 className="my-4">User Security</h3>
			<p className="mb-4">
				Every time a user logs in, the backend verifies the correctness of the
				credentials; if they are valid, a JSON Web Token (JWT) is generated and
				stored in a secure HTTP-only cookie.
			</p>
			<p className="mb-4">
				This JWT contains no sensitive user information, and a separate query is
				sent to the database every time information concerning that user, e.g.
				their roles, is required.
			</p>

			<h3 className="my-4">Role-Based Access Control</h3>
			<p className="mb-4">
				Jurassic Park has several resources: vehicles, departments, roles,
				users, and most famously, dinosaurs. Obviously, only the most trusted
				and qualified people should have access to modify such resource.
			</p>
			<p className="mb-4">
				To that end, ParkMan implments resource-based access control (RBAC).
				This means that resource access is dependent on the roles that a given
				user has. Only our Chief Geneticist (Dr. Henry Wu) has access to create
				entries for new species and individuals, for instance, though several
				other roles have access to see what species currently exist!
			</p>
			<p className="mb-4">
				RBAC ensures that only qualified users have access to sensitive system
				resources, and that changing the roles per user and each role&rsquo;s
				resource access permissions is easy as pie.
			</p>
		</section>
	);
};

export default AboutScreen;
