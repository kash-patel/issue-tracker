const BlockingLoader = () => {
	return (
		<div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen truncate bg-white flex flex-row justify-center items-center z-50">
			<p className="font-black tracking-widest animate-pulse">LOADING...</p>
		</div>
	);
};

export default BlockingLoader;
