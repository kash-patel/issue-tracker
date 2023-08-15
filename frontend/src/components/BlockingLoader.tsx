const LoadingText: { [statusCode: number]: { text: string; pulse: boolean } } =
	{
		0: {
			text: "Loading...",
			pulse: true,
		},
		1: {
			text: "Something went wrong. One or more requests failed to return the expected data.",
			pulse: false,
		},
	};

const BlockingLoader = ({ statusCode = 0 }) => {
	return (
		<div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-white flex flex-row justify-center items-center z-50">
			<p
				className={`font-black tracking-widest ${
					LoadingText[statusCode ? statusCode : 0].pulse && "animate-pulse"
				}`}
			>
				{LoadingText[statusCode ? statusCode : 0].text}
			</p>
		</div>
	);
};

export default BlockingLoader;
