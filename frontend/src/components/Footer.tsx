const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="text-center p-4 bottom-0">
			&copy; {year} Kash Patel
		</footer>
	);
};

export default Footer;
