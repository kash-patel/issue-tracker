const notFoundError = (req: any, res: any, next: any) => {
	const error = Error(`URL not found: ${req.originalUrl}.`);
	res.status(404);
	next(error);
};

const errorHandler = (error: Error, req: any, res: any, next: any) => {
	let statusCode: number = res.statusCode === 200 ? 500 : res.statusCode;
	let message: string = error.message;

	res.status(statusCode);
	res.json({
		message: message,
		stack: process.env.NODE_ENV === "production" ? null : error.stack,
	});
};

export { notFoundError, errorHandler };
