import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  Button,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import CodeIcon from "@material-ui/icons/Code";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import { Line } from "react-chartjs-2";
import { useState } from "react";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};
const ChartBox = (props) => {
  const [chartPeriod, setChartPeriod] = useState("1month");
  const [labels, setLabels] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ]);
  const [count, setCount] = useState([
    12,
    19,
    0,
    5,
    0,
    3,
    19,
    3,
    11,
    2,
    3,
    10,
    33,
    5,
    2,
    3,
    28,
    3,
    5,
    6,
    3,
    15,
    3,
    1,
    2,
    12,
    3,
    5,
    20,
    30,
  ]);
  const data = {
    labels,
    datasets: [
      {
        label: "Nominations",
        data: count,
        fill: false,
        backgroundColor: "rgb(25, 118, 210)",
        borderColor: "rgba(25, 118, 210,.2)",
      },
    ],
  };
  const year = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = [];
  for (let i = -6; i < 0; i++) {
    month[6 + i] =
      year[new Date(new Date().setMonth(new Date().getMonth() + i)).getMonth()];
  }
  const handleClick1Month = () => {
    setChartPeriod("1month");
    setLabels([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
    ]);
    setCount([
      12,
      19,
      0,
      5,
      0,
      3,
      19,
      3,
      11,
      2,
      3,
      10,
      33,
      5,
      2,
      3,
      28,
      3,
      5,
      6,
      3,
      15,
      3,
      1,
      2,
      12,
      3,
      5,
      20,
      30,
    ]);
  };
  const handleClick6Month = () => {
    setChartPeriod("6month");
    setLabels(month);
    setCount([162, 19, 50, 5, 120, 80]);
  };
  const handleClickYear = () => {
    setChartPeriod("1year");
    setLabels(year);
    setCount([120, 10, 0, 50, 100, 70, 10, 90, 120, 80, 0, 100]);
  };
  return (
    <Card style={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} style={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='h6'>
              Chart
            </Typography>
          </Grid>

          <Grid item>
            <Avatar
              style={{
                backgroundColor: blue[600],
                height: "56px",
                width: "56px",
              }}
            >
              <EqualizerIcon />
            </Avatar>
          </Grid>
        </Grid>
        <div style={{ textAlign: "center" }}>
          <Button
            variant='outlined'
            color='primary'
            style={{
              marginRight: "12px",
              backgroundColor: chartPeriod === "1month" && "rgba(0, 0, 0, 0.1)",
            }}
            onClick={handleClick1Month}
          >
            Last Month
          </Button>

          <Button
            variant='outlined'
            color='primary'
            style={{
              marginRight: "12px",
              backgroundColor: chartPeriod === "6month" && "rgba(0, 0, 0, 0.1)",
            }}
            onClick={handleClick6Month}
          >
            Last 6 Months
          </Button>
          <Button
            variant='outlined'
            color='primary'
            style={{
              backgroundColor: chartPeriod === "1year" && "rgba(0, 0, 0, 0.1)",
            }}
            onClick={handleClickYear}
          >
            This Year
          </Button>
        </div>

        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <Line data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartBox;
