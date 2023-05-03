import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from "../../../config";
import Alert from "../../components/Alert";

function ActiveExam(props) {
	const [alert, setAlert] = useState(false);
	const [mode, setMode] = useState(null);
	const [response, setResponse] = useState(null);
	const [activeExam, setActiveExam] = useState(null);

	useEffect(() => {
		getActive();
	}, []);

	function getActive() {
		axios({
			method: "GET",
			url: `${BASE_URL}/activeExam`,
		})
			.then((res) => {
				setActiveExam(res.data.activeExam.activeExam);
			})
			.catch((err) => console.log(err));
	}
	function sendUpdate(value) {
		axios({
			method: "POST",
			url: `${BASE_URL}/activeExam`,

			data: {
				activeExam: value,
			},
		})
			.then((res) => {
				setMode("success");
				setActiveExam(value);
				setResponse(res.data.message);
				setAlert(true);
			})
			.catch((err) => {
				setMode("danger");
				setResponse(err.response.data.message);
				setAlert(true);
			});
	}
	return (
		<div>
			<Alert
				isOpen={alert}
				handleClose={() => setAlert(false)}
				mode={mode}
				content={response}
			/>
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
											Active FYP
										</label>
										<div class="mt-1 flex rounded-md shadow-sm">
											<select
												onChange={(e) => sendUpdate(e.target.value)}
												value={activeExam}
												name="company-website"
												id="company-website"
												class="block w-full flex-1  rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
											>
												<option value="mid1">Mid 1</option>
												<option value="final1">Final 1</option>
												<option value="mid2">Mid 2</option>
												<option value="final2">Final 2</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ActiveExam;
