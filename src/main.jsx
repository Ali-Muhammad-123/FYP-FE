import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import StudentLayout from "./layouts/studentLayout";
import Home from "./pages/home";
import AdminLayout from "./layouts/adminLayout";
import AddAdvisor from "./pages/admin/addAdvisor";
import AddStudent from "./pages/admin/addStudent";
import LoginPage from "./pages/login";
import SubmittedProposals from "./pages/admin/submittedProposals";
import AssignGroups from "./pages/admin/assignGroups";
import ActiveExam from "./pages/admin/activeExam";
const AdvisorForm = React.lazy(() => import("./pages/advisorForm"));
const FYPDetails = React.lazy(() => import("./pages/admin/FYPDetails"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <StudentLayout />,
		children: [
			{
				path: "/",
				element: (
					<React.Suspense fallback={<>...</>}>
						<Home />
					</React.Suspense>
				),
			},
			{
				path: "/login",
				element: (
					<React.Suspense fallback={<>...</>}>
						<LoginPage />
					</React.Suspense>
				),
			},
			{
				path: "/advisorform",
				element: (
					<React.Suspense fallback={<>...</>}>
						<AdvisorForm />
					</React.Suspense>
				),
			},
		],
	},
	{
		path: "/admin",
		element: <AdminLayout />,
		children: [
			{
				path: "/admin",
				element: (
					<React.Suspense fallback={<>...</>}>
						<FYPDetails />
					</React.Suspense>
				),
			},
			{
				path: "/admin/addAdvisor",
				element: (
					<React.Suspense fallback={<>...</>}>
						<AddAdvisor />
					</React.Suspense>
				),
			},
			{
				path: "/admin/addStudent",
				element: (
					<React.Suspense fallback={<>...</>}>
						<AddStudent />
					</React.Suspense>
				),
			},
			{
				path: "/admin/submittedProposals",
				element: (
					<React.Suspense fallback={<>...</>}>
						<SubmittedProposals />
					</React.Suspense>
				),
			},
			{
				path: "/admin/assignGroups",
				element: (
					<React.Suspense fallback={<>...</>}>
						<AssignGroups />
					</React.Suspense>
				),
			},
			{
				path: "/admin/setExam",
				element: (
					<React.Suspense fallback={<>...</>}>
						<ActiveExam />
					</React.Suspense>
				),
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ProSidebarProvider>
			<RouterProvider router={router} />
		</ProSidebarProvider>
	</React.StrictMode>
);
