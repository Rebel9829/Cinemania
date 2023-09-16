import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import AddManually from "./AddManually";
import AddByName from "./AddByName";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AddTabs = () => {
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="Add Movie">
          <Tab label="Add Manually" {...a11yProps(0)} />
          <Tab label="Add By Name" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AddManually />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AddByName />
      </CustomTabPanel>
    </>
  );
};

export default AddTabs;
