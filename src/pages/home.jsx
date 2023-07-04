import React from "react";
import rocket from "../assets/rocket.svg";

function Home(props) {
	return (
		<div class="flex flex-col items-center justify-center gap-8  bg-white">
			<div class="container grid max-w-screen-xl gap-8 lg:grid-cols-2 lg:grid-rows-2">
				<div class="row-span-2 flex flex-col rounded-md border border-slate-200 shadow">
					<div class="px-10 pt-10">
						<h3 class="text-xl font-medium text-gray-700">
							Welcome to FYP Portal Fall 2022
						</h3>
						<p class="mt-2 text-slate-500">
							This potral is to be used for all the matters concerning FYP. All
							relevant information would be present here
						</p>
					</div>
					<div class="h-1/2 flex-1">
						<img
							src={rocket}
							class="h-full w-full object-cover "
							alt="omnichannel"
						/>
					</div>
				</div>
				<div class=" flex rounded-md border border-slate-200 shadow">
					<div class="flex-1 p-10">
						<h3 class="text-xl font-medium text-gray-700">
							FYP Points of Contact
						</h3>
						<p class="mt-2 font-[700] text-slate-500">FYP Coordinator</p>
						<p class=" font-[700] text-slate-500">Mr. Muhammad Adeel Karim</p>
						<p class="text-slate-500 ">Room 204, 100 Campus</p>
						<div className="mt-4 w-full">
							<p class=" font-[700] text-slate-500">FYP Support Officers</p>
							<div className="flex w-full flex-row">
								<div className="flex-grow-1 flex-shrink-0 basis-2/4 ">
									<p class=" font-[700] text-slate-500">Mr. Mubeen Khan</p>
									<p class="text-slate-500 ">Room 204, 100 Campus</p>
								</div>
								<div className="flex-grow-1 flex-shrink-0 basis-2/4 ">
									<p class=" font-[700] text-slate-500">Mr. Faraz Afsar</p>
									<p class="text-slate-500 ">Room 204, 100 Campus</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class=" flex rounded-md border border-slate-200 shadow">
					<div class="flex-1 p-10">
						<h3 class="text-xl font-medium text-gray-700">Support Officers</h3>
						<p class="mt-2 font-[700] text-slate-500">
							Program Support Officer
						</p>
						<p class=" font-[700] text-slate-500">Mr. Sarang Ahmed</p>
						<p class="text-slate-500 ">Room 204, 100 Campus</p>

						<p class="mt-4 font-[700] text-slate-500">Technical Support</p>
						<p class=" font-[700] text-slate-500">Mr. Ali Mobin Memon</p>
						<p class="text-slate-500 ">Room 303-A, 100 campus</p>
					</div>
				</div>
			</div>
			<div class=" flex w-full overflow-hidden rounded-md border border-slate-200 shadow"></div>
		</div>
	);
}

export default Home;
