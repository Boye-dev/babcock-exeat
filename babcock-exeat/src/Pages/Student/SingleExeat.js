import { Box, LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const SingleExeat = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTalent = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/exeat/${id}`);
        if (response && response.data) setLoading(false);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        if (error.response) {
          setLoading(false);
        } else {
        }
      }
    };
    fetchTalent();
  }, [id]);
  return (
    <Box sx={{ ml: { xs: "0", md: "240px" }, mt: 10 }}>
      <Box sx={{ pl: { xs: 10, md: 20 }, pr: { xs: 10, md: 20 } }}>
        <Typography
          sx={{ color: "rgb(0,66,130)", fontWeight: "700", fontSize: "30px" }}
        >
          Exeat Application Details
        </Typography>
        {loading ? (
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <LinearProgress color="primary" />
          </Box>
        ) : (
          <Box sx={{ height: 480, width: "100%", mt: 5 }}>
            <Typography sx={{ fontWeight: "400", fontSize: "20px", pb: 1 }}>
              Name - {data.student?.lastname} {data.student?.firstname}
            </Typography>
            <Typography sx={{ fontWeight: "400", fontSize: "20px", pb: 1 }}>
              Matric Number - {data.student?.userNumber}
            </Typography>
            <Typography sx={{ fontWeight: "400", fontSize: "20px", pb: 1 }}>
              Type - {data.type}
            </Typography>
            <Typography sx={{ fontWeight: "400", fontSize: "20px", pb: 1 }}>
              Reason - {data.reason}
            </Typography>
            <Typography sx={{ fontWeight: "400", fontSize: "20px", pb: 1 }}>
              Host - {data.host}
            </Typography>
            <Typography sx={{ fontWeight: "400", fontSize: "20px", pb: 1 }}>
              Address - {data.address}
            </Typography>
            <Typography sx={{ fontWeight: "400", fontSize: "20px", pb: 1 }}>
              Departure Date - {data.departDate}
            </Typography>
            <Typography sx={{ fontWeight: "400", fontSize: "20px", pb: 1 }}>
              Return Date - {data.returnDate}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SingleExeat;
