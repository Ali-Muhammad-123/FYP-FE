import React, { useState } from "react";
import { useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";
import Login from "../components/Login";
import Modal from "../components/Modal";

function AdminLayout(props) {
	const navigate = useNavigate();
	const location = useLocation();

	const [isOpen, setIsOpen] = useState(false);
	var user = JSON.parse(sessionStorage.getItem("user"));

	useEffect(() => {
		var user = JSON.parse(sessionStorage.getItem("user"));
		console.log(user);
		if (!user || user.role !== "administrator") {
			navigate("/login", { state: { redirectTo: location } });
		}
	}, []);
	return (
		<div className="flex max-h-screen flex-row overflow-hidden">
			<Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
				<Login />
			</Modal>

			<div className="min-h-screen">
				<Sidebar width={"300px"} customBreakPoint={"800px"}>
					<div>
						<img style={{ margin: "auto" }} src={logo} />
						<Menu>
							<Link to="/admin/">
								<MenuItem>About FYP</MenuItem>
							</Link>

							<Link to="/advisor/submittedProposals">
								<MenuItem>Submitted Proposals</MenuItem>
							</Link>
							<MenuItem>Iteration Plan</MenuItem>
							<SubMenu label="Announcements">
								<MenuItem>Proposal Defense Schedule </MenuItem>
							</SubMenu>
							<MenuItem>Results</MenuItem>
							<MenuItem>Current Projects</MenuItem>
							<MenuItem>Panel Details</MenuItem>
							<MenuItem>Open Ideas</MenuItem>
							<SubMenu label="Advisors">
								<MenuItem>Area of Intrest</MenuItem>
								<MenuItem>Available slots</MenuItem>
							</SubMenu>
							<SubMenu label="Arcive Projects">
								<MenuItem>Software Assist Tools</MenuItem>
								<MenuItem>Free Datasets</MenuItem>
							</SubMenu>
						</Menu>
					</div>
				</Sidebar>
			</div>
			<div className="w-full overflow-y-auto">
				<div className="sticky top-0 left-0 flex h-14 w-full justify-end bg-white">
					{user ? (
						<button
							className=" m-1 h-[calc(100%_-_8px)]  rounded-md bg-[#225bb2] px-8 font-semibold text-white shadow-md"
							onClick={() => {
								sessionStorage.clear();
								navigate("/login");
							}}
						>
							{user?.name} - Logout
						</button>
					) : (
						<button
							className=" m-1 h-[calc(100%_-_8px)]  rounded-md bg-[#225bb2] px-8 font-semibold text-white shadow-md"
							onClick={() => {
								navigate("/login");
							}}
						>
							Login
						</button>
					)}
				</div>

				<div className="mx-auto grid w-full gap-6  p-4 lg:container">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default AdminLayout;
