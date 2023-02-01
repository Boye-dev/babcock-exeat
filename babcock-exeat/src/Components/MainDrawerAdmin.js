import React from "react";
import { Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../Assets/log2.png";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Person3Icon from "@mui/icons-material/Person3";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
const MainDrawerAdmin = ({ setMobileOpen, mobileOpen }) => {
  const side = [
    {
      name: "Exeat Applications",
      icon: <AddHomeIcon sx={{ color: "white" }} />,
    },
    {
      name: "Declined",
      icon: <ThumbDownAltIcon sx={{ color: "white" }} />,
    },
    {
      name: "Approved",
      icon: <ThumbUpAltIcon sx={{ color: "white" }} />,
    },
    {
      name: "Profile",
      icon: <Person3Icon sx={{ color: "white" }} />,
    },
  ];
  const handleClick = () => {
    setMobileOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
          mb: 10,
          outline: "none",
        }}
      >
        <img src={logo} style={{ width: "80%" }} alt="logo" />
      </Box>
      <Box>
        {side.map((text, index) => (
          <NavLink
            key={index}
            to={`${text.name.toLowerCase().replace(/ /g, "-")}`}
            style={({ isActive }) =>
              isActive
                ? {
                    display: "flex",
                    textDecoration: "none",
                    backgroundColor: "rgb(185,141,59)",

                    textAlign: "center",
                    "&:hover": {
                      background: "rgb(185,141,59)",
                    },
                  }
                : {
                    textDecoration: "none",
                    display: "flex",

                    "&:hover": {
                      background: "rgb(185,141,59)",
                    },
                  }
            }
            onClick={() => handleClick()}
          >
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                width: "100%",
                paddingTop: "8%",
                pl: 5,

                paddingBottom: "8%",
                "&:hover": {
                  background: "rgb(185,141,59)",
                },
              }}
            >
              <Typography
                sx={{
                  pr: 2,
                }}
              >
                {text.icon}
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "600",
                }}
              >
                {text.name}
              </Typography>
            </Box>
          </NavLink>
        ))}
      </Box>
    </>
  );
};

export default MainDrawerAdmin;
