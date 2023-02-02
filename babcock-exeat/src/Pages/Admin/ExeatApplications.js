import { Box, Button, LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import api from "../../api/api";

const ExeatApplications = () => {
  const columns = [
    {
      field: "userNumber",
      headerName: "Matric Number",
      width: 110,
      renderCell: (cellValues) => (
        <Typography sx={{}}>{cellValues.row.student.userNumber}</Typography>
      ),
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
    },
    {
      field: "departDate",
      headerName: "Departure Date",
      width: 120,
    },
    {
      field: "returnDate",
      headerName: "Return Date",
      width: 120,
    },
    {
      field: "host",
      headerName: "Host",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: (cellValues) => (
        <Typography
          sx={{
            backgroundColor: "yellow",
            borderRadius: "5px",
            p: 0.5,
            color: "white",
          }}
        >
          {cellValues.row.status}
        </Typography>
      ),
    },
    {
      field: "view",
      headerName: "View Details",
      width: 150,
      renderCell: (cellValues) => (
        <Link
          to={`/admin/exeat-applications/${cellValues.row._id}`}
          style={{ textDecoration: "none" }}
        >
          <Button sx={{}} variant="contained" color="primary">
            View Details
          </Button>
        </Link>
      ),
    },
  ];
  const [isLoading, setLoading] = useState(true);
  const [exeats, setExeats] = useState();
  const rows = exeats;
  const fetchApplications = async () => {
    try {
      const response = await api.get("/api/exeats/Pending");
      console.log(response);
      if (response) setExeats(response.data);

      setLoading(false);
    } catch (error) {
      if (error.response) {
        //Not in 200 response range
        // console.log(error.response.data);
      } else {
        // console.log(error.message);
      }
    }
  };
  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <Box sx={{ ml: { xs: "0", md: "240px" }, mt: 10 }}>
      <Box sx={{ pl: { xs: 3, md: 10 }, pr: { xs: 3, md: 10 }, mb: 5 }}>
        <Typography
          sx={{ color: "rgb(0,66,130)", fontWeight: "700", fontSize: "30px" }}
        >
          Exeat Applications
        </Typography>
        {isLoading ? (
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <LinearProgress color="primary" />
          </Box>
        ) : exeats.length === 0 ? (
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Typography>No Applications Available </Typography>
          </Box>
        ) : (
          <Box sx={{ height: 480, width: "100%", mt: 5 }}>
            <DataGrid
              getRowId={(row) => row._id}
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ExeatApplications;
