import React, { FC, useState } from "react";

import { AgGridReact } from "ag-grid-react";

// Styles
import styles from "./RPMResultsGrid.module.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { laptimeToHumanReadable } from "../../helpers/laps";

// Props
interface RPMResultsGridProps {
  data: any[];
}

const RPMResultsGrid: FC<RPMResultsGridProps> = ({ data }) => {
  const [resultsData, setResultsData] = useState<any[]>([]);

  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ]);

  const [columnDefs] = useState([
    { field: "finish_position", headerName: "#" },
    { field: "name" },
    { field: "class" },
    { field: "incidents" },
    {
      field: "best_lap",
      headerName: "Best lap",
      valueFormatter: (params: any) => {
        return laptimeToHumanReadable(params.value);
      },
    },
    {
      headerName: "Positions gained",
      valueGetter: (params: any) =>
        params.data.starting_position - params.data.finish_position,
    },
  ]);

  return (
    <div className={styles.RPMResultsGrid}>
      <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
        <AgGridReact rowData={data} columnDefs={columnDefs}></AgGridReact>
      </div>
    </div>
  );
};

export default RPMResultsGrid;
