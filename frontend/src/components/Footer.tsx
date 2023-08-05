const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="text-center p-4 text-sm text-zinc-500">
			&copy; {year} Kash Patel
		</footer>
	);
};

export default Footer;
