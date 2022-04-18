import React, { FC } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";

// Styles
import styles from "./RPMTabPanel.module.css";
import RPMResultsGrid from "../RPMResultsGrid/RPMResultsGrid";
import RPMBoxPlot from "../RPMBoxPlot/RPMBoxPlot";

// Props
interface RPMTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const RPMTabPanel: FC<RPMTabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div className={styles.RPMTabPanel} data-testid="RPMTabPanel">
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    </div>
  );
};

export default RPMTabPanel;
