import MaterialTable from "material-table";

import { forwardRef, useEffect, useRef } from "react";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
	PDF: forwardRef((props, ref) => <PictureAsPdf {...props} ref={ref} />),
};
const defaultMaterialTheme = createTheme();

function SubmittedProposals(props) {
	const [data, setData] = useState([]);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${BASE_URL}/group`,
		})
			.then((res) => {
				console.log(res.data.groups);
				setData(
					res.data.groups.map((el) => {
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
	}, []);
	return (
		<ThemeProvider theme={defaultMaterialTheme}>
			<MaterialTable
				title={"Proposals"}
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
				actions={[
					{
						icon: () => <PictureAsPdf />,
						tooltip: "Geneate PDF",
						onClick: (event, rowData) => {
							console.log(rowData);
							document.getElementById("advisor").innerHTML = rowData.advisor;
							document.getElementById("projectTitle").innerHTML =
								rowData.projectTitle;
							document.getElementById("designation").innerHTML =
								rowData.designation;
							document.getElementById("department").innerHTML =
								rowData.department;
							document.getElementById("qualification").innerHTML =
								rowData.qualification;
							document.getElementById("specialization").innerHTML =
								rowData.projectTitle;
							document.getElementById("contact").innerHTML =
								rowData.contactNumber;
							document.getElementById("email").innerHTML = rowData.email;
							document.getElementById("semester").innerHTML = rowData.semester;
							document.getElementById("year").innerHTML = rowData.year;
							document.getElementById("program").innerHTML = rowData.program;
							document.getElementById("creditHours").innerHTML =
								rowData.creditHours;
							document.getElementById("compensation").innerHTML =
								rowData.compensation;
							document.getElementById("detail").innerHTML = rowData.briefDetail;
							document.getElementById("tools").innerHTML =
								rowData.hardwareRequirement;
							document.getElementById("cost").innerHTML =
								rowData.approximateCost;
							document.getElementById("studentOneName").innerHTML =
								rowData.studentOne;
							document.getElementById("studentOneReg").innerHTML =
								rowData.studentOneRegno;
							document.getElementById("studentTwoName").innerHTML =
								rowData.studentTwo;
							document.getElementById("studentTwoReg").innerHTML =
								rowData.studentTwoRegno;

							html2canvas(document.getElementById("pdfPrint")).then(
								(canvas) => {
									const componentWidth =
										document.getElementById("pdfPrint").offsetWidth;
									const componentHeight =
										document.getElementById("pdfPrint").offsetHeight;

									const orientation = "p";

									const imgData = canvas.toDataURL("image/png");
									const pdf = new jsPDF({
										orientation,
										unit: "pt",
										format: "a4",
									});

									// pdf.internal.pageSize.width = componentWidth;
									// pdf.internal.pageSize.height = componentHeight;

									pdf.addImage(
										imgData,
										"PNG",
										0,
										0,
										pdf.internal.pageSize.width,
										pdf.internal.pageSize.height
									);
									pdf.save("download.pdf");
								}
							);
						},
					},
				]}
				options={{
					actionsColumnIndex: -1,
				}}
			/>

			<div style={{ position: "absolute", bottom: "200%" }}>
				<div id="pdfPrint" style={{ padding: "20pt", maxWidth: "595px" }}>
					<div>
						<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
						<div>
							<p
								style={{
									textAlign: "justify",
									margin: "auto",
								}}
							>
								<img
									src="../../src/assets/Logo.png"
									width={201}
									height={43}
									alt=""
									style={{
										margin: "auto",

										AwLeftPos: "0pt",
										AwRelHpos: "column",
										AwRelVpos: "paragraph",
										AwTopPos: "0pt",
										AwWrapType: "inline",
									}}
								/>
							</p>
							<p
								style={{
									marginTop: "1.2pt",
									marginBottom: "10pt",
									textAlign: "justify",
									fontSize: "1pt",
								}}
							>
								<span style={{ fontFamily: "Arial", AwImport: "spaces" }}>
									&nbsp;
								</span>
							</p>
							<table
								cellSpacing={0}
								cellPadding={0}
								style={{
									border: "0.75pt solid #000000",
									AwBorder: "0.5pt single",
									AwBorderInsideh: "0.5pt single #000000",
									AwBorderInsidev: "0.5pt single #000000",
									borderCollapse: "collapse",
									width: "100%",
								}}
							>
								<tbody>
									<tr style={{ AwHeightRule: "exactly" }}>
										<td
											colSpan={2}
											style={{
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "5.12pt",
												verticalAlign: "top",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "3.7pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
												>
													Name of Project Advisor:
												</span>
												<span
													style={{
														fontSize: "10pt",
														fontWeight: "bold",
														letterSpacing: "5.35pt",
													}}
												></span>
												<span
													style={{
														fontSize: "10pt",
														fontWeight: "bold",
														color: "#2d2d2d",
														backgroundColor: "#f7f7f7",
													}}
													id="advisor"
												></span>
											</p>
										</td>
									</tr>
									<tr
										style={{
											AwHeightRule: "exactly",
										}}
									>
										<td
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderRightStyle: "solid",
												borderRightWidth: "0.75pt",
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "5.12pt",
												verticalAlign: "top",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderRight: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "4.5pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
												>
													Designation:
												</span>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														letterSpacing: "2.7pt",
													}}
												></span>
												<span
													style={{ fontFamily: "Calibri", fontSize: "12pt" }}
													id="designation"
												></span>
											</p>
										</td>
										<td
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderLeftStyle: "solid",
												borderLeftWidth: "0.75pt",
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "4.38pt",
												verticalAlign: "top",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderLeft: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "4.5pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
												>
													Department:
												</span>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
													}}
													id="department"
												></span>
												<span
													style={{ fontFamily: "Calibri", fontSize: "12pt" }}
												></span>
											</p>
										</td>
									</tr>
									<tr
										style={{
											AwHeightRule: "exactly",
										}}
									>
										<td
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderRightStyle: "solid",
												borderRightWidth: "0.75pt",
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "5.12pt",
												verticalAlign: "top",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderRight: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "4.25pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
												>
													Highest Qualification:{" "}
													<span id="qualification"> </span>
												</span>
											</p>
										</td>
										<td
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderLeftStyle: "solid",
												borderLeftWidth: "0.75pt",
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "4.38pt",
												verticalAlign: "top",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderLeft: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "4.25pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
												>
													Area of Specialization:
												</span>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														letterSpacing: "2.7pt",
													}}
												></span>
												<span
													style={{ fontFamily: "Calibri", fontSize: "12pt" }}
													id="specialization"
												></span>
											</p>
										</td>
									</tr>
									<tr
										style={{
											AwHeightRule: "exactly",
										}}
									>
										<td
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderRightStyle: "solid",
												borderRightWidth: "0.75pt",
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "5.12pt",
												verticalAlign: "top",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderRight: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "4pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
												>
													Contact No:
												</span>
												<span
													style={{ fontFamily: "Calibri", fontSize: "12pt" }}
													id="contact"
												></span>
											</p>
										</td>
										<td
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderLeftStyle: "solid",
												borderLeftWidth: "0.75pt",
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "4.38pt",
												verticalAlign: "top",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderLeft: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "4pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
												>
													Email:
												</span>
												<span
													style={{ fontSize: "10pt", letterSpacing: "2.65pt" }}
												>
													{" "}
												</span>
												<span
													style={{
														fontSize: "10pt",
														letterSpacing: "0.1pt",
														color: "#2d2d2d",
														backgroundColor: "#f7f7f7",
													}}
													id="email"
												></span>
											</p>
										</td>
									</tr>
									<tr
										style={{
											AwHeightRule: "exactly",
										}}
									>
										<td
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderRightStyle: "solid",
												borderRightWidth: "0.75pt",
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "5.12pt",
												verticalAlign: "top",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderRight: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "3.75pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
												>
													Semester:
												</span>
												<span
													style={{ fontFamily: "Calibri", fontSize: "12pt" }}
													id="semester"
												></span>
											</p>
										</td>
										<td
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderLeftStyle: "solid",
												borderLeftWidth: "0.75pt",
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "4.38pt",
												verticalAlign: "top",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderLeft: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "3.75pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
												>
													Year:
												</span>
												<span
													style={{ fontFamily: "Calibri", fontSize: "12pt" }}
													id="year"
												></span>
											</p>
										</td>
									</tr>
									<tr
										style={{
											AwHeightRule: "exactly",
										}}
									>
										<td
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderRightStyle: "solid",
												borderRightWidth: "0.75pt",
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "5.12pt",
												verticalAlign: "top",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderRight: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "4.5pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
												>
													Program
												</span>
												<span
													style={{ fontFamily: "Calibri", fontSize: "12pt" }}
												>
													:
												</span>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														AwImport: "spaces",
													}}
												>
													&nbsp;{" "}
												</span>
												<span
													style={{ fontFamily: "Calibri", fontSize: "12pt" }}
													id="program"
												></span>
											</p>
										</td>
										<td
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderLeftStyle: "solid",
												borderLeftWidth: "0.75pt",
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "4.38pt",
												verticalAlign: "top",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderLeft: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "4.5pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
												>
													Cr. Hrs.:
												</span>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														letterSpacing: "2.7pt",
													}}
												></span>
												<span
													style={{ fontFamily: "Calibri", fontSize: "12pt" }}
													id="creditHours"
												></span>
											</p>
										</td>
									</tr>
									<tr
										style={{
											AwHeightRule: "exactly",
										}}
									>
										<td
											colSpan={2}
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "5.12pt",
												verticalAlign: "top",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "4.25pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
												>
													Compensation Offered Per Project:
												</span>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														letterSpacing: "2.7pt",
													}}
												></span>
												<span
													style={{ fontFamily: "Calibri", fontSize: "12pt" }}
													id="compensation"
												></span>
											</p>
										</td>
									</tr>
									<tr
										style={{
											AwHeightRule: "exactly",
										}}
									>
										<td
											colSpan={2}
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "5.12pt",
												verticalAlign: "bottom",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
												>
													Project Title:
												</span>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
														AwImport: "spaces",
													}}
												>
													&nbsp;{" "}
												</span>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
													id="projectTitle"
												></span>
											</p>
										</td>
									</tr>
									<tr
										style={{
											AwHeightRule: "exactly",
										}}
									>
										<td
											colSpan={2}
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "5.12pt",
												verticalAlign: "bottom",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "0.05pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
												>
													Brief Detail:
												</span>
											</p>
										</td>
									</tr>
									<tr
										style={{
											AwHeightRule: "exactly",
										}}
									>
										<td
											colSpan={2}
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderBottom: "0.75pt solid #e5e7eb",
												paddingLeft: "5.12pt",
												verticalAlign: "top",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "2.4pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "16.45pt",
												}}
											>
												<span
													style={{ fontFamily: "Calibri", fontSize: "13.5pt" }}
													id="detail"
												></span>
											</p>
										</td>
									</tr>

									<tr
										style={{
											AwHeightRule: "exactly",
										}}
									>
										<td
											colSpan={2}
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "5.12pt",
												verticalAlign: "top",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "7.85pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
												>
													Hardware &amp; Software Tools Required:
												</span>
											</p>
										</td>
									</tr>
									<tr
										style={{
											AwHeightRule: "exactly",
										}}
									>
										<td
											colSpan={2}
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "8.88pt",
												verticalAlign: "top",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "3.55pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{ fontFamily: "Calibri", fontSize: "12pt" }}
													id="tools"
												></span>
											</p>
										</td>
									</tr>
									<tr
										style={{
											AwHeightRule: "exactly",
										}}
									>
										<td
											colSpan={2}
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "5.12pt",
												verticalAlign: "bottom",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "0.05pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
												>
													Approximate Cost of the Project:
												</span>
											</p>
											<p
												style={{
													marginTop: "0.05pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{ fontFamily: "Calibri", fontSize: "12pt" }}
													id="cost"
												></span>
											</p>
										</td>
									</tr>
									<tr
										style={{
											AwHeightRule: "exactly",
										}}
									>
										<td
											colSpan={2}
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												borderBottomStyle: "solid",
												borderBottomWidth: "0.75pt",
												paddingLeft: "8.88pt",
												verticalAlign: "top",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<p
												style={{
													marginTop: "7.9pt",
													marginBottom: "10pt",
													textAlign: "justify",
													lineHeight: "14.6pt",
												}}
											>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
														textDecoration: "underline",
													}}
												>
													Students’ Names
												</span>
												<span
													style={{
														fontFamily: "Calibri",
														fontSize: "12pt",
														fontWeight: "bold",
													}}
												>
													:
												</span>
											</p>
										</td>
									</tr>
									<tr
										style={{
											AwHeightRule: "exactly",
										}}
									>
										<td
											colSpan={2}
											style={{
												borderTopStyle: "solid",
												borderTopWidth: "0.75pt",
												paddingLeft: "5.12pt",
												verticalAlign: "top",
												backgroundColor: "#ffffff",
												AwBorderBottom: "0.5pt single",
												AwBorderTop: "0.5pt single",
											}}
										>
											<ol
												type={1}
												style={{ margin: "0pt", paddingLeft: "0pt" }}
											>
												<li
													style={{
														marginTop: "3.6pt",
														marginLeft: "12pt",
														textAlign: "justify",
														lineHeight: "14.6pt",
														fontFamily: "Calibri",
														fontSize: "12pt",
													}}
												>
													<span style={{ fontWeight: "bold" }}>Name:</span>
													<span id="studentOneName"> </span>
													<span
														style={{
															fontWeight: "bold",
															letterSpacing: "162.75pt",
														}}
													></span>
													<span
														style={{ paddingLeft: "20pt", fontWeight: "bold" }}
													>
														Reg. No.
													</span>
													<span id="studentOneReg"> </span>
												</li>
												<li
													style={{
														marginTop: "17.6pt",
														marginLeft: "12pt",
														textAlign: "justify",
														lineHeight: "14.6pt",
														fontFamily: "Calibri",
														fontSize: "12pt",
													}}
												>
													<span style={{ fontWeight: "bold" }}>Name:</span>
													<span id="studentTwoName"> </span>
													<span
														style={{
															fontWeight: "bold",
															letterSpacing: "170.9pt",
														}}
													></span>
													<span
														style={{ paddingLeft: "20pt", fontWeight: "bold" }}
													>
														Reg. No.
													</span>
													<span id="studentTwoReg"> </span>
												</li>
											</ol>
										</td>
									</tr>
									<tr
										style={{
											AwHeightRule: "exactly",
										}}
									>
										<td colSpan={2} style={{}}>
											<p
												style={{
													marginTop: "0pt",
													marginBottom: "10pt",
													fontSize: "12pt",
												}}
											>
												<span style={{ AwImport: "ignore" }}>&nbsp;</span>
											</p>
										</td>
									</tr>
								</tbody>
							</table>
							<p
								style={{
									marginTop: "1.2pt",
									marginLeft: "164.35pt",
									marginBottom: "10pt",
									textAlign: "justify",
									lineHeight: "17.05pt",
								}}
							>
								<span
									style={{
										fontFamily: "Calibri",
										fontSize: "14pt",
										fontWeight: "bold",
									}}
								>
									Final Year Project
								</span>
							</p>
							<p
								style={{
									marginTop: "20.4pt",
									marginLeft: "6pt",
									marginBottom: "20pt",
									textAlign: "justify",
									lineHeight: "14.6pt",
								}}
							>
								<span style={{ fontFamily: "Calibri", fontWeight: "bold" }}>
									REFERENCE NO
								</span>
								<span
									style={{
										fontFamily: "Calibri",
										fontWeight: "bold",
										AwImport: "spaces",
									}}
								>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									&nbsp;&nbsp;&nbsp;
								</span>
								<span style={{ fontFamily: "Calibri", fontWeight: "bold" }}>
									Signature (Project Advisor): _________________
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default SubmittedProposals;
