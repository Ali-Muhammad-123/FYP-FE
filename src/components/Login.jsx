import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

function Login({ redirectTo }) {
	const navigate = useNavigate();

	const login = (e) => {
		e.preventDefault();
		if (e.target.email.value && e.target.password.value) {
			axios({
				method: "POST",
				url: `${BASE_URL}/login`,
				data: {
					email: e.target.email.value,
					password: e.target.password.value,
				},
			})
				.then((res) => {
					sessionStorage.setItem("user", JSON.stringify(res.data));
					navigate(
						redirectTo
							? redirectTo
							: res.data.role === "administrator"
							? "/admin"
							: "/"
					);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	return (
		<div class="flex h-full w-full flex-col items-center justify-center ">
			<div class="flex w-full max-w-md flex-col rounded-md bg-white px-4 py-8 shadow-md sm:px-6 md:px-8 lg:px-10">
				<div class="self-center text-xl font-medium uppercase text-gray-800 sm:text-2xl">
					Login To Your Account
				</div>

				<div class="mt-10">
					<form onSubmit={(e) => login(e)}>
						<div class="mb-6 flex flex-col">
							<label
								for="email"
								class="mb-1 text-xs tracking-wide text-gray-600 sm:text-sm"
							>
								E-Mail Address:
							</label>
							<div class="relative">
								<div class="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400">
									<svg
										class="h-6 w-6"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
									</svg>
								</div>

								<input
									id="email"
									type="email"
									required
									name="email"
									class="w-full rounded-lg border border-gray-400 py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-blue-400 focus:outline-none sm:text-base"
									placeholder="E-Mail Address"
								/>
							</div>
						</div>
						<div class="mb-6 flex flex-col">
							<label
								for="password"
								class="mb-1 text-xs tracking-wide text-gray-600 sm:text-sm"
							>
								Password:
							</label>
							<div class="relative">
								<div class="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400">
									<span>
										<svg
											class="h-6 w-6"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
										</svg>
									</span>
								</div>

								<input
									id="password"
									type="password"
									name="password"
									required
									class="w-full rounded-lg border border-gray-400 py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-blue-400 focus:outline-none sm:text-base"
									placeholder="Password"
								/>
							</div>
						</div>

						<div class="flex w-full">
							<button
								type="submit"
								class="flex w-full items-center justify-center rounded bg-blue-600 py-2 text-sm text-white transition duration-150 ease-in hover:bg-blue-700 focus:outline-none sm:text-base"
							>
								<span class="mr-2 uppercase">Login</span>
								<span>
									<svg
										class="h-6 w-6"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
