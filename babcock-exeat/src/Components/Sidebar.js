import { Box, Drawer } from "@mui/material";
import React, { useState } from "react";

import MainDrawer from "./MainDrawer";
import Navbar from "./Navbar";

const drawerWidth = 240;
const Sidebar = (props) => {
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <Navbar setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} />
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },

          flexShrink: { md: 0 },
          backgroundColor: "rgb(0,66,130)",
          zIndex: "1",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              mt: "10",
              backgroundColor: "rgb(0,66,130)",
            },
          }}
        >
          <MainDrawer setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "rgb(0,66,130)",
            },
          }}
          open
        >
          <MainDrawer />
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
