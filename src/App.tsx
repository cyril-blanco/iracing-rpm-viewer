import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Box, Container, CssBaseline, Tab, Tabs } from "@mui/material";

// Components
import RPMBoxPlot from "./components/RPMBoxPlot/RPMBoxPlot";
import RPMIncidents from "./components/RPMIncidents/RPMIncidents";
import RPMLapsBars from "./components/RPMLapsBars/RPMLapsBars";
import RPMResultsGrid from "./components/RPMResultsGrid/RPMResultsGrid";
import RPMTabPanel from "./components/RPMTabPanel/RPMTabPanel";

const App = () => {
  const [data, setData] = useState<any>({});
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    axios.get("data.json").then((res) => setData(res.data));
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <div className="App">
      <CssBaseline />
      <Container sx={{ height: "100%" }}>
        <h2>
          {data.league_name} - {data.track_name}
        </h2>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="Race results tabs"
            >
              <Tab label="Results" {...a11yProps(0)} />
              <Tab label="Qualy laps" {...a11yProps(1)} />
              <Tab label="Race laps" {...a11yProps(2)} />
              <Tab label="Lap times distribution" {...a11yProps(3)} />
              <Tab label="Incidents" {...a11yProps(4)} />
            </Tabs>
          </Box>
          <RPMTabPanel value={value} index={0}>
            <RPMResultsGrid data={data.drivers_statistics} />
          </RPMTabPanel>
          <RPMTabPanel value={value} index={1}>
            <RPMLapsBars
              data={data.drivers_statistics}
              lap_type={"best_qual_lap_time"}
            />
          </RPMTabPanel>
          <RPMTabPanel value={value} index={2}>
            <RPMLapsBars data={data.drivers_statistics} />
          </RPMTabPanel>
          <RPMTabPanel value={value} index={3}>
            <RPMBoxPlot data={data.drivers_statistics} />
          </RPMTabPanel>
          <RPMTabPanel value={value} index={4}>
            <RPMIncidents data={data.drivers_statistics} />
          </RPMTabPanel>
        </Box>
      </Container>
    </div>
  );
};

export default App;
