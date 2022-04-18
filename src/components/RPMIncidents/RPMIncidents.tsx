import React, { FC, useEffect, useState } from "react";

// Styles
import styles from "./RPMIncidents.module.css";
import Chart from "react-apexcharts";

// Props
interface RPMIncidentsProps {
  data: any[];
}

const colors = {
  Gold: "#fff714",
  Silver: "#eeeeee",
  Bronze: "#ab7d00",
};

const RPMIncidents: FC<RPMIncidentsProps> = ({ data }) => {
  const incProperty = "incidents";
  const incPerLapProperty = "incidents_per_lap";
  const [barData, setBarData] = useState<any[]>([]);
  const [chartConfig, setChartConfig] = useState({});

  const series = [
    {
      name: "Website Blog",
      type: "column",
      data: data.map((driver) => driver["incidents"]),
    },
    {
      name: "Social Media",
      type: "line",
      data: data.map((driver) => driver["incidents_per_lap"]),
    },
  ];

  const cfg = {
    stroke: {
      width: [0, 4],
    },
    title: {
      text: "Traffic Sources",
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: data.map((driver) => driver["name"]),
    xaxis: {
      // type: 'datetime'
    },
    yaxis: [
      {
        title: {
          text: "Website Blog",
        },
      },
      {
        opposite: true,
        title: {
          text: "Social Media",
        },
      },
    ],
  };

  useEffect(() => {
    if (data.length < 1) return;

    const sortedData = [...data].sort((x, y) =>
      x[incProperty] < y[incProperty] ? -1 : 1
    );

    const barData: any[] = [];
    sortedData.forEach((driver) => {
      barData.push({
        x: driver["name"],
        y: driver[incProperty],
        // @ts-ignore
        // fillColor: colors[driver['class']]
      });
    });

    const lineData: any[] = [];
    sortedData.forEach((driver) => {
      lineData.push({
        x: driver["name"],
        y: driver[incPerLapProperty],
        // @ts-ignore
        // fillColor: colors[driver['class']]
      });
    });

    setBarData([
      { type: "column", data: barData },
      { type: "line", data: lineData, fillColor: "#330000" },
    ]);
    console.log([{ type: "column", data: barData }]);
  }, [data]);

  return (
    <div className={styles.RPMIncidents} data-testid="RPMIncidents">
      {data.length > 0 ? (
        <Chart options={cfg} series={series} type="line" width="100%" />
      ) : (
        <></>
      )}
    </div>
  );
};

export default RPMIncidents;
