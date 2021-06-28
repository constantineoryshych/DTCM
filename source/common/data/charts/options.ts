export default [
	{
		h1: "Number of Interactions ",
		desc: "Number of passengers interacted and \r\n aborted the interactions",
		options: {
			graph_id: "interaction",
			chartType: "PieChart",
			options: {
				pieSliceText: "value",
				pieHole: 0.55,
				is3D: false,
				legend: {
					position: "labeled"
				},
				colors: ["#009bdf", "#cb5599", "#e1582a"]
			},
			data: [["", ""]],
			width: "100%",
			height: "80%"
		}
	},
	{
		h1: "Language Selection, %",
		desc: "Percentage overview of people choosing \r\n the specific language",
		options: {
			graph_id: "language",
			chartType: "PieChart",
			options: {
				pieHole: 0.55,
				pieSliceText: "value",
				is3D: false,
				legend: {
					position: "labeled"
				},
				colors: ["#cb5599", "#009bdf", "#0067b9", "#115e67", "#e1582a", "#00a9ac", "#6e2b62", "#a6192e"]
			},
			data: [["Task", "Day Visitors"]],
			width: "100%",
			height: "80%"
		}
	},
	{
		h1: "Areas of Interest by Language\n",
		desc: "Statistics on areas of interest (experience) by languages",
		options: {
			graph_id: "interest",
			chartType: "ComboChart",
			data: [
				["package", "Arts & Heritage", "Beaches", "Family \n Entertainment", "Sports &\n  Adventure", "Dining", "Spa", "Shopping", "Events"]
			],
			options: {
				vAxis: {
					gridlines: {
						color: "none"
					},
					lineWidth: 1
				},
				seriesType: "bars",
				legend: {
					position: "bottom",
					maxLines: 3
				},
				colors: ["#0090d7", "#6e2b62", "#c6579a", "#f89c1b", "#a6192e", "#00a9ac", "#115e67", "#0067b9"],
				bar: { groupWidth: "50%" }
			},
			width: "100%",
			height: "100%"
		}
	},

	{
		h1: "Time Spent on Interaction\n",
		desc: "Time spent on each experience or package (Data are presented in minutes)",
		options: {
			graph_id: "timespent",
			chartType: "PieChart",
			options: {
				pieSliceText: "value",
				pieHole: 0.55,
				is3D: false,
				legend: {
					position: "labeled"
				},
				colors: [
					"#115e67",
					"#0067b9",
					"#6e2b62",
					"#00a9ac",
					"#cb5599",
					"#a6192e",
					"#c69a2f",
					"#66676a",
					"#009bdf",
					"#d8d2c4",
					"#f89c1b",
					"#e1582a",
					"#7bb76f"
				]
			},
			data: [["", ""]],
			width: "100%",
			height: "100%"
		}
	},
	{
		h1: "TIME PERFORMANCE",
		desc: "Number of interactions during the specific time",
		options: {
			graph_id: "hourly",
			chartType: "ComboChart",
			data: [["Users", "Users"]],
			options: {
				vAxis: {
					gridlines: {
						color: "none"
					},
					lineWidth: 1
				},
				seriesType: "bars",
				legend: {
					position: "bottom",
					maxLines: 3
				},
				annotation: {

				},
				colors: ["#009bdf", "#6e2b62", "#115e67", "#63666a", "#a6192e"],
				bar: { groupWidth: "50%" }
			},
			width: "100%",
			height: "100%"
		}
	},
	{
		h1: "DAILY PERFORMANCE\n",
		desc: "NUMBER OF ITERACTIONS ABORTED DURING THE SPECIFIC time",
		options: {
			graph_id: "daily",
			chartType: "ComboChart",
			data: [["Days", "Interacted", "Aborted"]],
			options: {
				vAxis: {
					gridlines: {
						color: "none"
					},
					lineWidth: 1
				},
				seriesType: "bars",
				legend: {
					position: "bottom",
					maxLines: 3
				},
				colors: ["#009bdf", "#cb5599"],
				bar: { groupWidth: "50%" }
			},
			width: "100%",
			height: "100%"
		}
	},
	{
		h1: "EMAILS COLLECTED\n",
		desc: "Number of emails collected",
		options: {
			graph_id: "collected",
			chartType: "ComboChart",
			data: [["Emails", "Emails"]],
			options: {
				vAxis: {
					gridlines: {
						color: "none"
					},
					lineWidth: 1
				},
				seriesType: "bars",
				legend: {
					position: "bottom",
					maxLines: 3
				},
				colors: ["#009bdf"],
				bar: { groupWidth: "50%" }
			},
			width: "100%",
			height: "100%"
		}
	},
	{
		h1: "ABORTED SECTIONS OVERVIEW\n",
		desc: "At what stage do people abort the experience",
		options: {
			graph_id: "aborted",
			chartType: "ColumnChart",
			data: [["", "", { role: "style" }]],
			width: "100%",
			height: "100%",
			options: {
				vAxis: {
					gridlines: {
						color: "none"
					},
					lineWidth: 1
				},
				legend: { position: "none" },
				bar: { groupWidth: "50%" }
			}
		}
	},
	{
		h1: "Average time of Interactions ",
		desc: "",
		options: {
			graph_id: "average",
			chartType: "PieChart",
			options: {
				pieSliceText: "value",
				pieHole: 0.55,
				is3D: false,
				legend: {
					position: "labeled"
				},
				colors: ["#009bdf", "#cb5599", "#e1582a"]
			},
			data: [["", ""]],
			width: "100%",
			height: "80%"
		}
	},
	{
		h1: "LIST OF EMAILS COLLECTED\n",
		desc: "",
		options: {
			graph_id: "emails",
			options: {}
		}
	}
];
