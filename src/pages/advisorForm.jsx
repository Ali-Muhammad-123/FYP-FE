import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";

function AdvisorForm(props) {
	const navigate = useNavigate();
	var user = JSON.parse(sessionStorage.getItem("user"));
	const [selectedStudent, setSelectedStudent] = useState(null);
	const [selectedAdvisor, setSelectedAdvisor] = useState(null);
	const [suggestStudents, setSuggestStudents] = useState(false);
	const [suggestAdvisors, setSuggestAdvisors] = useState([]);
	const [submitted, setSubmitted] = useState(false);
	const [students, setStudents] = useState([]);
	const [advisors, setAdvisors] = useState([]);
	const [checkGroup, setCheckGroup] = useState(false);
	var user = JSON.parse(sessionStorage.getItem("user"));

	useEffect(() => {
		!user ? navigate("/login") : "";
		axios({
			method: "GET",
			url: `${BASE_URL}/group/search`,
			params: {
				id: user?._id,
			},
		})
			.then((res) => setSubmitted(res.data))
			.catch((err) => {
				setSubmitted(false);
			});
	}, [checkGroup]);

	const getAdvisor = debounce((value) => {
		axios({
			method: "GET",
			url: `${BASE_URL}/user/search`,
			params: {
				name: value,
				role: "advisor",
			},
		})
			.then((res) => setAdvisors(res.data))
			.catch((err) => {
				console.log(err);
			});
	}, 500);

	const getStudent = debounce(
		(value) =>
			axios({
				method: "GET",
				url: `${BASE_URL}/user/search`,
				params: {
					regno: value,
					role: "student",
				},
			})
				.then((res) => {
					setStudents(res.data);
				})
				.catch((err) => setStudents([])),
		500
	);

	function submit(e) {
		e.preventDefault();
		axios({
			method: "POST",
			url: `${BASE_URL}/group`,
			data: {
				studentOne: selectedStudent._id,
				studentTwo: user._id,
				advisor: selectedAdvisor._id,
				semester: e.target.semester.value,
				year: e.target.year.value,
				projectTitle: e.target.projectTitle.value,
				briefDetail: e.target.briefDetail.value,
				creditHours: e.target.creditHours.value,
				compensation: e.target.compensation.value,
				hardwareRequirement: e.target.hardwareRequirement.value,
				approximateCost: e.target.approximateCost.value,
			},
		}).then((res) => {
			setCheckGroup(!checkGroup);
		});
	}

	useEffect(() => {
		sessionStorage.getItem("user");
	}, []);
	return (
		<div>
			{submitted ? (
				<div>
					<div class="md:grid md:grid-cols-3 md:gap-6">
						<div class="mt-5 md:col-span-3 md:mt-0">
							<div class="shadow sm:overflow-hidden sm:rounded-md">
								<div class="space-y-6 bg-white px-4 py-5 text-center sm:p-6">
									Your proposal for{" "}
									<span class="font-bold">
										{submitted?.group?.projectTitle}
									</span>{" "}
									has already been submitted. Kindly reach out to the FYP
									Coordinator for any ammendments.
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<form onSubmit={(e) => submit(e)}>
					<div>
						<div class="md:grid md:grid-cols-3 md:gap-6">
							<div class="mt-5 md:col-span-3 md:mt-0">
								<div class="shadow sm:overflow-hidden sm:rounded-md">
									<div class="space-y-6 bg-white px-4 py-5 sm:p-6">
										<div class="grid grid-cols-4 gap-6">
											<div class="col-span-4 sm:col-span-2">
												<label
													for="company-website"
													class="block text-sm font-medium text-gray-700"
												>
													Name of project Advisor
												</label>
												<div class="relative mt-1 flex rounded-md shadow-sm">
													<input
														type="text"
														name="company-website"
														required
														id="company-website"
														class="block w-full flex-1  rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														placeholder="Sir John Doe"
														value={selectedAdvisor?.name}
														onChange={(e) => {
															setSelectedAdvisor({ name: e.target.value });
															getAdvisor(e.target.value);
														}}
														onFocus={() => setSuggestAdvisors(true)}
													/>
													{advisors.length > 0 && suggestAdvisors ? (
														<div class="absolute top-[35px] left-0  h-full w-full">
															<div class=" max-h-25 overflow-y-scroll rounded-md border-2 border-gray-300 bg-white">
																{advisors.map((el) => (
																	<button
																		class="w-full border-b"
																		onClick={() => {
																			setSelectedAdvisor(el);
																			setSuggestAdvisors(false);
																		}}
																	>
																		{el.name}
																	</button>
																))}
															</div>
														</div>
													) : (
														""
													)}
												</div>
											</div>
											<div class="col-span-4 sm:col-span-2">
												<label
													for="company-website"
													class="block text-sm font-medium text-gray-700"
												>
													Department
												</label>
												<div class="mt-1 flex rounded-md shadow-sm">
													<input
														type="text"
														readOnly
														required
														value={selectedAdvisor?.department}
														name="company-website"
														id="company-website"
														class="readOnly block w-full flex-1 rounded-md border-gray-300 bg-gray-100 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														placeholder="Department"
													/>
												</div>
											</div>

											<div class="col-span-4 sm:col-span-2">
												<label
													for="company-website"
													class="block text-sm font-medium text-gray-700"
												>
													Highest Qualification
												</label>
												<div class="mt-1 flex rounded-md shadow-sm">
													<input
														type="text"
														value={selectedAdvisor?.highestQualification}
														readOnly
														required
														name="company-website"
														id="company-website"
														class="block w-full flex-1 rounded-md border-gray-300 bg-gray-100 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														placeholder="Masters"
													/>
												</div>
											</div>
											<div class="col-span-4 sm:col-span-2">
												<label
													for="company-website"
													class="block text-sm font-medium text-gray-700"
												>
													Designation
												</label>
												<div class="mt-1 flex rounded-md shadow-sm">
													<input
														type="text"
														readOnly
														required
														value={selectedAdvisor?.designation}
														name="company-website"
														id="company-website"
														class="block w-full flex-1 rounded-md border-gray-300 bg-gray-100 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														placeholder="Professor"
													/>
												</div>
											</div>

											<div class="col-span-4 sm:col-span-2">
												<label
													for="company-website"
													class="block text-sm font-medium text-gray-700"
												>
													Contact Number
												</label>
												<div class="mt-1 flex rounded-md shadow-sm">
													<input
														type="number"
														value={user?.contactNumber}
														readOnly
														required
														name="company-website"
														id="company-website"
														class="block w-full flex-1 rounded-md border-gray-300 bg-gray-100 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														placeholder="03311232312"
													/>
												</div>
											</div>
											<div class="col-span-4 sm:col-span-2">
												<label
													for="company-website"
													class="block text-sm font-medium text-gray-700"
												>
													E-Mail
												</label>
												<div class="mt-1 flex rounded-md shadow-sm">
													<input
														type="email"
														readOnly
														value={user?.email}
														name="company-website"
														id="company-website"
														required
														class="block w-full flex-1 rounded-md border-gray-300 bg-gray-100 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														placeholder="John@szabist.com"
													/>
												</div>
											</div>
											<div class="col-span-2 sm:col-span-1">
												<label
													for="semester"
													class="block text-sm font-medium text-gray-700"
												>
													Semester
												</label>
												<div class="mt-1 flex rounded-md shadow-sm">
													<input
														type="number"
														name="semester"
														required
														id="semester"
														class="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														placeholder="Sir John Doe"
													/>
												</div>
											</div>
											<div class="col-span-2 sm:col-span-1">
												<label
													for="year"
													class="block text-sm font-medium text-gray-700"
												>
													Year
												</label>
												<div class="mt-1 flex rounded-md shadow-sm">
													<input
														type="number"
														name="year"
														id="year"
														required
														class="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														placeholder="Sir John Doe"
													/>
												</div>
											</div>
											<div class="col-span-2 sm:col-span-1">
												<label
													for="company-website"
													class="block text-sm font-medium text-gray-700"
												>
													Program
												</label>
												<div class="mt-1 flex rounded-md shadow-sm">
													<input
														type="email"
														value={user?.program}
														name="company-website"
														id="company-website"
														required
														readOnly
														class="block w-full flex-1 rounded-md border-gray-300 bg-gray-100 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														placeholder="Sir John Doe"
													/>
												</div>
											</div>
											<div class="col-span-2 sm:col-span-1">
												<label
													for="creditHours"
													class="block text-sm font-medium text-gray-700"
												>
													Credit Hours
												</label>
												<div class="mt-1 flex rounded-md shadow-sm">
													<input
														type="number"
														required
														name="creditHours"
														id="creditHours"
														class="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														placeholder="Sir John Doe"
													/>
												</div>
											</div>
											<div class="col-span-4 sm:col-span-2">
												<label
													for="projectTitle"
													class="block text-sm font-medium text-gray-700"
												>
													Project Title
												</label>
												<div class="mt-1 flex rounded-md shadow-sm">
													<input
														type="text"
														required
														name="projectTitle"
														id="projectTitle"
														class="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														placeholder="Sir John Doe"
													/>
												</div>
											</div>
											<div class="col-span-4 sm:col-span-2">
												<label
													for="compensation"
													class="block text-sm font-medium text-gray-700"
												>
													Compensation Offered Per Project
												</label>
												<div class="mt-1 flex rounded-md shadow-sm">
													<input
														type="number"
														required
														name="compensation"
														id="compensation"
														class="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														placeholder="Sir John Doe"
													/>
												</div>
											</div>
											<div class="col-span-4">
												<div>
													<label
														for="briefDetail"
														class="block text-sm font-medium text-gray-700"
													>
														Brief Detail
													</label>
													<div class="mt-1">
														<textarea
															id="briefDetail"
															name="briefDetail"
															required
															rows="3"
															class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
															placeholder="you@example.com"
														></textarea>
													</div>
													<p class="mt-2 text-sm text-gray-500">
														Brief description of your project.
													</p>
												</div>
											</div>
											<div class="col-span-4 sm:col-span-3">
												<label
													for="hardwareRequirement"
													class="block text-sm font-medium text-gray-700"
												>
													Hardware & Software Tools Required
												</label>
												<div class="mt-1 flex rounded-md shadow-sm">
													<textarea
														id="hardwareRequirement"
														name="hardwareRequirement"
														required
														rows="3"
														class=" block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														placeholder="you@example.com"
													></textarea>
												</div>
											</div>
											<div class="col-span-4 sm:col-span-1">
												<div>
													<label
														for="approximateCost"
														class="block text-sm font-medium text-gray-700"
													>
														Approximate Cost of the Project
													</label>
													<div class="mt-1">
														<input
															type="number"
															required
															name="approximateCost"
															id="approximateCost"
															class="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
															placeholder="2000"
														/>
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
									<div class="bg-white px-4 py-5 sm:p-6">
										<div class="grid grid-cols-3 gap-6">
											<div class="col-span-3 sm:col-span-1">
												<label
													for="first-name"
													class="block text-sm font-medium text-gray-700"
												>
													Registration Number of Partner
												</label>

												<div class="relative mt-1 flex rounded-md shadow-sm">
													<input
														type="number"
														name="company-website"
														id="company-website"
														required
														class="block w-full flex-1  rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														placeholder="Sir John Doe"
														onChange={(e) => getStudent(e.target.value)}
														onFocus={() => setSuggestStudents(true)}
													/>
													{students.length > 0 && suggestStudents ? (
														<div class="absolute top-[35px] left-0  h-full w-full">
															<div class=" max-h-[80px] rounded-md border-2 border-gray-300 bg-white">
																{students.map((el) => {
																	return el.regno !== user.regno ? (
																		<button
																			class="w-full border-b"
																			onClick={() => {
																				setSelectedStudent(el);
																				setSuggestStudents(false);
																			}}
																		>
																			{el.name}
																		</button>
																	) : (
																		""
																	);
																})}
															</div>
														</div>
													) : (
														""
													)}
												</div>
											</div>

											<div class="col-span-4 sm:col-span-2">
												<label
													for="last-name"
													class="block text-sm font-medium text-gray-700"
												>
													Name
												</label>
												<input
													type="text"
													value={selectedStudent?.name}
													readOnly
													required
													name="last-name"
													id="last-name"
													autocomplete="family-name"
													class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 bg-clip-padding shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
												/>
											</div>
										</div>
									</div>
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
			)}
		</div>
	);
}

export default AdvisorForm;
