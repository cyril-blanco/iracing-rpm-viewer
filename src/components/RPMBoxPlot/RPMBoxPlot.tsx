import React, { FC, useEffect, useState } from "react";
import Chart from "react-apexcharts";

// Helpers
import { laptimeToHumanReadable } from "../../helpers/laps";

// Styles
import styles from "./RPMBoxPlot.module.css";

// Props
interface RPMBoxPlotProps {
  data: any[];
}

const RPMBoxPlot: FC<RPMBoxPlotProps> = ({ data }) => {
  const [boxPlotData, setBoxPlotData] = useState<any[]>([]);
  const [chartConfig, setChartConfig] = useState({
    yaxis: {
      labels: {
        formatter: laptimeToHumanReadable,
      },
      min: 880000,
      max: 880000 + 80000,
      tickAmount: 8,
    },
  });

  useEffect(() => {
    if (data.length < 1) return;

    const sortedData = [...data].sort((x, y) =>
      x["finish_position"] < y["finish_position"] ? -1 : 1
    );

    const boxPlotData: any[] = [];
    sortedData.forEach((driver) => {
      if (driver["best_lap"] === null) return;
      boxPlotData.push({
        x: `${driver["finish_position"] + 1}. ${driver["name"]}`,
        y: [
          driver["best_lap"],
          driver["quartile_1_lap"],
          driver["average_lap"],
          driver["quartile_3_lap"],
          driver["worst_lap"],
        ],
      });
    });
    setBoxPlotData([{ data: boxPlotData }]);

    chartConfig.yaxis.min = Math.floor(data[0]["best_lap"] / 10000) * 10000;
    chartConfig.yaxis.max = chartConfig.yaxis.min + 80000;

    setChartConfig(chartConfig);
  }, [data]);

  return (
    <div className={styles.RPMBoxPlot}>
      {boxPlotData.length > 0 ? (
        <Chart
          options={chartConfig}
          series={boxPlotData}
          type="boxPlot"
          width="100%"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default RPMBoxPlot;
