const Footer = () => {
	return (
		<footer className="text-gray-600 body-font">
			<div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
				<a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
					<span className="ml-3 text-xl">Find us on GitHub </span>
				</a>
				<p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
					Made with 💖 by
					<a
						href="https://github.com/ArnavGuptaaa"
						className="ml-1 underline text-blue-500"
						rel="noopener noreferrer"
						target="_blank"
					>
						@ArnavGuptaaa
					</a>
					,
					<a
						href="https://github.com/sumedhdixit"
						className="ml-1 underline text-blue-500"
						rel="noopener noreferrer"
						target="_blank"
					>
						@SumedhDixit
					</a>
					&nbsp;and
					<a
						href="https://github.com/ratneshjain40"
						className="ml-1 underline text-blue-500"
						rel="noopener noreferrer"
						target="_blank"
					>
						@RatneshJain40
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
