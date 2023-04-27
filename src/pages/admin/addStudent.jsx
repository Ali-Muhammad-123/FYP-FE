import axios from "axios";
import React from "react";
import { useState } from "react";
import { BASE_URL } from "../../../config";
import Alert from "../../components/Alert";

function AddStudent(props) {
	const [profilePicture, setProfilePicture] = useState(null);
	const [alert, setAlert] = useState(false);
	const [mode, setMode] = useState(null);
	const [response, setResponse] = useState(null);

	const submit = (e) => {
		e.preventDefault();
		const form = new FormData();
		form.append("name", e.target.name.value);
		form.append("regno", e.target.regNo.value);
		form.append("email", e.target.email.value);
		form.append("program", e.target.program.value);
		form.append("contactNumber", e.target.contactNumber.value);
		form.append("profilePicture", profilePicture);
		form.append("role", "student");
		axios({
			method: "POST",
			url: `${BASE_URL}/user`,
			headers: {
				"Content-Type": "multipart/form-data",
			},
			data: form,
		})
			.then((res) => {
				setMode("success");
				setResponse(res.data.message);
				setAlert(true);
			})
			.catch((err) => {
				setMode("danger");
				setResponse(err.response.data.message);
				setAlert(true);
			});
	};
	return (
		<div>
			<Alert
				isOpen={alert}
				handleClose={() => setAlert(false)}
				mode={mode}
				content={response}
			/>
			<form onSubmit={(e) => submit(e)}>
				<div>
					<div class="md:grid md:grid-cols-3 md:gap-6">
						<div class="mt-5 md:col-span-3 md:mt-0">
							<div class="shadow sm:overflow-hidden sm:rounded-md">
								<div class="space-y-6 bg-white px-4 py-5 sm:p-6">
									<div class="grid grid-cols-4 gap-6">
										<div class="col-span-4 sm:col-span-2">
											<label
												for="name"
												class="block text-sm font-medium text-gray-700"
											>
												Name
											</label>
											<div class="mt-1 flex rounded-md shadow-sm">
												<input
													required
													type="text"
													name="name"
													id="name"
													class="block w-full flex-1  rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													placeholder="Sir John Doe"
												/>
											</div>
										</div>
										<div class="col-span-4 sm:col-span-2">
											<label
												for="regNo"
												class="block text-sm font-medium text-gray-700"
											>
												Registration Number
											</label>
											<div class="mt-1 flex rounded-md shadow-sm">
												<input
													required
													type="number"
													name="regNo"
													id="regNo"
													class="block w-full flex-1  rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													placeholder="1912259"
												/>
											</div>
										</div>

										<div class="col-span-4 sm:col-span-2">
											<label
												for="program"
												class="block text-sm font-medium text-gray-700"
											>
												Program
											</label>
											<div class="mt-1 flex rounded-md shadow-sm">
												<input
													required
													type="text"
													name="program"
													id="program"
													class="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													placeholder="BSCS"
												/>
											</div>
										</div>

										<div class="col-span-4 sm:col-span-2">
											<label
												for="contactNumber"
												class="block text-sm font-medium text-gray-700"
											>
												Contact Number
											</label>
											<div class="mt-1 flex rounded-md shadow-sm">
												<input
													required
													type="number"
													name="contactNumber"
													id="contactNumber"
													class="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													placeholder="Sir John Doe"
												/>
											</div>
										</div>
										<div class="col-span-4 sm:col-span-2">
											<label
												for="email"
												class="block text-sm font-medium text-gray-700"
											>
												E-Mail
											</label>
											<div class="mt-1 flex rounded-md shadow-sm">
												<input
													required
													type="email"
													name="email"
													id="email"
													class="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													placeholder="Sir John Doe"
												/>
											</div>
										</div>
										<div class="col-span-4">
											<div>
												<label class="block text-sm font-medium text-gray-700">
													Profile Picture
												</label>
												<div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
													<div class="space-y-1 text-center">
														<svg
															class="mx-auto h-12 w-12 text-gray-400"
															stroke="currentColor"
															fill="none"
															viewBox="0 0 48 48"
															aria-hidden="true"
														>
															<path
																d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
																stroke-width="2"
																stroke-linecap="round"
																stroke-linejoin="round"
															/>
														</svg>
														<div class="flex text-sm text-gray-600">
															<label
																for="profilePicture"
																class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
															>
																<span>Upload a file</span>
																<input
																	onChange={(e) =>
																		setProfilePicture(e.target.files[0])
																	}
																	id="profilePicture"
																	name="profilePicture"
																	type="file"
																	class="sr-only"
																/>
															</label>
															<p class="pl-1">or drag and drop</p>
														</div>
														<p class="text-xs text-gray-500">
															PNG, JPG, GIF up to 10MB
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="hidden sm:block" aria-hidden="true">
					<div class="py-5">
						<div class="border-t border-gray-200"></div>
					</div>
				</div>

				<div class="mt-10 sm:mt-0">
					<div class="md:grid md:grid-cols-3 md:gap-6">
						<div class="mt-5 md:col-span-3 md:mt-0">
							<div class="overflow-hidden shadow sm:rounded-md">
								<div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
									<button
										type="submit"
										class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									>
										Submit
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddStudent;
