import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
	const error: any = useRouteError();
	const errorString: string = (
		"status" in error
			? "error" in error
				? error?.error
				: error?.data?.message
			: error.message
	) as string;

	return (
		<section className="min-w-screen min-h-screen p-8 flex flex-row justify-center items-center">
			<div className="z-50">
				<p className="text-zinc-700 text-3xl font-black uppercase tracking-wide mb-4">
					Ah, ah, ah! You didn&rsquo;t say the magic word!
				</p>
				<p className="mb-4">
					...Or maybe you did. Either way, something went wrong:
				</p>
				<p className="bg-red-100 px-4 py-2 rounded-md mb-4">{`${errorString}`}</p>
				<p className="">
					Once you&rsquo;ve made sure this is not due to a mistake on your end,
					please contact the system administrator, Mr. John Arnold, in the
					Engineering department.
				</p>
			</div>
		</section>
	);
};

export default ErrorElement;
