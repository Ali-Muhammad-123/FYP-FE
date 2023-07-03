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
import csvDownload from "json-to-csv-export";

function MarksAssigned(props) {
	const [data, setData] = useState([]);
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
			url: `${BASE_URL}/activeExam`,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then(async (resp) => {
			axios({
				method: "GET",
				url: `${BASE_URL}/getGrades`,
			}).then((res) => {
				setData(
					res.data.result
						.map((el) => {
							if (el.regno) {
								var group = res.data.groups.find(
									(ele) => ele.studentOne == el._id || ele.studentTwo == el._id
								);
								// console.log(group);
								if (group !== undefined)
									return {
										...el,
										erd: el[resp.data.activeExam.activeExam].erd,
										formatting: el[resp.data.activeExam.activeExam].formatting,
										presentation:
											el[resp.data.activeExam.activeExam].presentation,
										remarks: el[resp.data.activeExam.activeExam].remarks,
										srs: el[resp.data.activeExam.activeExam].srs,
										group: group?.projectTitle,
									};
							}
						})
						.filter((el) => el !== undefined)
				);
			});
		});
	}, [refresh]);
	const defaultMaterialTheme = createTheme();

	const dataToConvert = {
		data: data.map((el) => {
			return {
				Name: el.name,
				regno: el.regno,
				email: el.email,
				group: el.group,
				erd: el.erd,
				formatting: el.formatting,
				presentation: el.presentation,
				remarks: el.remarks,
				srs: el.srs,
			};
		}),
		filename: "results",
		delimiter: ",",
		headers: [
			"Name",
			"Registration Number",
			"E-Mail",
			"Group",
			"ERD",
			"Formatting",
			"Presentation",
			"Remarks",
			"SRS",
		],
	};

	return (
		<div className="w-full">
			<div className="flex w-full justify-end">
				<button
					className="m-2 rounded border-2 p-2"
					onClick={() => csvDownload(dataToConvert)}
				>
					Download Results
				</button>
			</div>
			<ThemeProvider theme={defaultMaterialTheme}>
				<MaterialTable
					title={"Results"}
					icons={tableIcons}
					columns={[
						{ title: "Name", field: "name" },
						{ title: "Reg No", field: "regno" },
						{
							title: "Group",
							field: "group",
						},
						{
							title: "ERD",
							field: "erd",
						},
						{
							title: "Formatting",
							field: "formatting",
						},
						{
							title: "Presentation",
							field: "presentation",
						},
						{
							title: "Remarks",
							field: "remarks",
						},
						{
							title: "SRS",
							field: "srs",
						},
					]}
					data={data}
				/>
			</ThemeProvider>
		</div>
	);
}

export default MarksAssigned;
