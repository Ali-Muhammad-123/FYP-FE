import { createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";
import React, { forwardRef, useEffect, useState } from "react";
import { BASE_URL } from "../../../config";
import {
	AddBox,
	ArrowDownward,
	Check,
	ChevronLeft,
	ChevronRight,
	Clear,
	DeleteOutline,
	Edit,
	FilterList,
	FirstPage,
	LastPage,
	Remove,
	SaveAlt,
	Search,
	ViewColumn,
	PictureAsPdf,
} from "@material-ui/icons";
import MaterialTable from "material-table";

function AssignGroups(props) {
	const [data, setData] = useState([]);
	const [panels, setPanels] = useState([]);
	const [refresh, setRefresh] = useState(false);

	const tableIcons = {
		Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
		Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
		Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
		Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
		DetailPanel: forwardRef((props, ref) => (
			<ChevronRight {...props} ref={ref} />
		)),
		Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
		Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
		Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
		FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
		LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
		NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
		PreviousPage: forwardRef((props, ref) => (
			<ChevronLeft {...props} ref={ref} />
		)),
		ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
		Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
		SortArrow: forwardRef((props, ref) => (
			<ArrowDownward {...props} ref={ref} />
		)),
		ThirdStateCheck: forwardRef((props, ref) => (
			<Remove {...props} ref={ref} />
		)),
		ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
		PDF: forwardRef((props, ref) => <PictureAsPdf {...props} ref={ref} />),
	};
	useEffect(() => {
		axios({
			method: "GET",
			url: `${BASE_URL}/panel`,
		}).then((res) => {
			console.log(res.data.panel);
			setPanels(res.data.panel);
		});

		axios({
			method: "GET",
			url: `${BASE_URL}/group`,
		})
			.then((res) => {
				console.log(res.data.groups);
				setData(
					res.data.groups
						.filter((el) => el.assigned !== true)
						.map((el) => {
							return {
								...el,
								studentOne: el.studentOne.name,
								studentTwo: el.studentTwo.name,
								studentOneRegno: el.studentOne.regno,
								studentTwoRegno: el.studentTwo.regno,
								program: el.studentOne.program,
								advisor: el.advisor.name,
								designation: el.advisor.designation,
								department: el.advisor.department,
								contactNumber: el.advisor.contactNumber,
								qualification: el.advisor.highestQualification,
								email: el.advisor.email,
								approved: !!el.approved,
							};
						})
				);
			})
			.catch((err) => {
				setData([]);
			});
	}, [refresh]);
	const defaultMaterialTheme = createTheme();

	return (
		<div className="w-full">
			<ThemeProvider theme={defaultMaterialTheme}>
				<MaterialTable
					title={"groups"}
					icons={tableIcons}
					columns={[
						{ title: "Name", field: "projectTitle" },
						{
							title: "Student One",
							field: "studentOne",
						},
						{
							title: "Student Two",
							field: "studentTwo",
						},
						{
							title: "Advisor",
							field: "advisor",
						},
						{
							title: "Approved",
							field: "approved",
						},
					]}
					data={data}
					actions={panels.map((el, i) => {
						return {
							icon: () => <div>{i + 1}</div>,
							tooltip: `Assign to panel ${i + 1}`,
							onClick: (event, rowData) => {
								axios({
									method: "PUT",
									url: `${BASE_URL}/panel/assign`,
									params: { id: el._id },
									data: {
										group: rowData._id,
									},
								}).then((el) => setRefresh(!refresh));
							},
						};
					})}
					options={{
						actionsColumnIndex: -1,
					}}
				/>
			</ThemeProvider>
		</div>
	);
}

export default AssignGroups;
