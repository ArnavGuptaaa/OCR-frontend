import { useRef, useEffect, useState } from 'react';

const Main = () => {
	const [file, setFile] = useState();
	const [objectURL, setObjectURL] = useState();
	const [OCRText, setOCRText] = useState();
	const [convertedImageObjectURL, setConvertedImageObjectURL] = useState();

	useEffect(() => {
		const createObjURL = () => {
			// console.log(URL.createObjectURL(file));
			setObjectURL(URL.createObjectURL(file));

			// free memory when ever this component is unmounted
			return () => URL.revokeObjectURL(objectURL);
		};

		if (file) {
			createObjURL();
		}
	}, [file]);

	const handleUpload = (e) => {
		e.preventDefault();

		const data = new FormData();
		data.append('file', file);
		console.log(data);

		fetch(process.env.REACT_APP_API_ENDPOINT, {
			method: 'POST',
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const base64 = data.img;

				setConvertedImageObjectURL(`data:image/png;base64,${base64}`);
				setOCRText(data.text.join(' '));
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8  bg-no-repeat bg-cover">
			<div className="absolute bg-black opacity-60 inset-0 z-0"></div>
			<div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
				<div className="text-center">
					<h2 className="mt-5 text-3xl font-bold text-gray-900">
						Text Recognition OCR
					</h2>
					<p className="mt-2 text-sm text-gray-400">
						we will try our best to recognize all the text within the image
					</p>
				</div>
				<form
					className="mt-8 space-y-3"
					// onClick={() => fileRef.current.click()}
				>
					<div className="grid grid-cols-1 space-y-2">
						<span className="text-sm font-bold text-gray-500 tracking-wide">
							{objectURL ? 'Uploaded Image' : 'Attach Document'}
						</span>
						{objectURL ? (
							<img src={objectURL} />
						) : (
							<div className="flex items-center justify-center w-full">
								<label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
									<div className="h-full w-full text-center flex flex-col items-center justify-center">
										<div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
											<img
												className="object-center"
												src={process.env.PUBLIC_URL + '/static/hero.png'}
												alt=""
											/>
										</div>
										<p className="pointer-none text-gray-500 ">
											<span className="underline text-blue-500">
												click to upload
											</span>{' '}
											from your computer
										</p>
										<input
											className="hidden"
											// ref={fileRef}
											onChange={(e) => {
												setFile(e.target.files[0]);
											}}
											multiple={false}
											type="file"
											accept="image/*"
											hidden
										/>
									</div>
								</label>
							</div>
						)}
					</div>
					<p className="text-sm text-gray-300">
						<span>
							{objectURL
								? `File name: ${file.name}`
								: 'File type: All image types'}
						</span>
					</p>
					{convertedImageObjectURL && (
						<>
							<div>
								<img src={convertedImageObjectURL} alt="shid" />
							</div>
							<div>Recognized Text : {OCRText}</div>
						</>
					)}

					<div>
						<button
							className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
							onClick={handleUpload}
						>
							Upload
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Main;
