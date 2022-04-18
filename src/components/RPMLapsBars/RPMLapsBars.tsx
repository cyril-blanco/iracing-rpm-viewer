import React, { FC, useEffect, useState } from "react";
import Chart from "react-apexcharts";

// Styles
import styles from "./RPMLapsBars.module.css";
import { laptimeToHumanReadable } from "../../helpers/laps";

// Props
interface RPMLapsBarsProps {
  data: any[];
  lap_type?: string;
}

const colors = {
  Gold: "#fff714",
  Silver: "#eeeeee",
  Bronze: "#ab7d00",
};

const RPMLapsBars: FC<RPMLapsBarsProps> = ({ data, lap_type = "best_lap" }) => {
  const [barData, setBarData] = useState<any[]>([]);
  const [chartConfig, setChartConfig] = useState({});

  const getChartConfig = (data: any[]) => {
    return {
      dataLabels: {
        formatter: laptimeToHumanReadable,
        style: {
          colors: ["#333"],
        },
        offsetX: 10,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
        grid: {
          show: false, // you can either change hear to disable all grids
          xaxis: {
            lines: {
              show: false, //or just here to disable only x axis grids
            },
          },
          yaxis: {
            lines: {
              show: false, //or just here to disable only y axis
            },
          },
        },
      },
      tooltip: {
        y: {
          formatter: laptimeToHumanReadable,
        },
      },
      xaxis: {
        labels: {
          formatter: laptimeToHumanReadable,
        },
        min: Math.floor(data[0][lap_type] / 10000) * 10000,
        max:
          Math.ceil(
            data.reduce((prev, curr) =>
              prev[lap_type] > curr[lap_type] ? prev : curr
            )[lap_type] / 10000
          ) * 10000,
        tickAmount: 10,
      },
      yaxis: {
        axisTicks: {
          show: false,
        },
      },
    };
  };

  useEffect(() => {
    if (data.length < 1) return;

    const sortedData = [...data].sort((x, y) =>
      x[lap_type] < y[lap_type] ? -1 : 1
    );

    const barData: any[] = [];
    sortedData.forEach((driver) => {
      if (driver[lap_type] === null || driver[lap_type] === -1) return;
      barData.push({
        x: driver["name"],
        y: driver[lap_type],
        // @ts-ignore
        fillColor: colors[driver["class"]],
      });
    });
    setChartConfig(getChartConfig(data));
    setBarData([
      {
        name: "Best lap",
        data: barData,
        tooltip: { valueFormatter: laptimeToHumanReadable },
      },
    ]);
  }, [data]);

  return (
    <div className={styles.RPMLapsBars} data-testid="RPMLapsBars">
      {data.length > 0 ? (
        <Chart options={chartConfig} series={barData} type="bar" width="100%" />
      ) : (
        <></>
      )}
    </div>
  );
};

export default RPMLapsBars;
