const LocalErrorDisplay = (error: any) => {
	return (
		<p className="px-4 py-2 my-2 bg-red-800 text-white rounded-md">
			{"status" in error
				? "error" in error
					? error?.error
					: JSON.stringify(error?.data)
				: error.message}
		</p>
	);
};

export default LocalErrorDisplay;
