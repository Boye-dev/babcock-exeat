import { Box, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";

import api from "../../api/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import ExeatContext from "../../ExeatContext";

const ApplyExeat = () => {
  const { setSnackMessage, setIsSnackOpen } = useContext(ExeatContext);

  const navigate = useNavigate();
  const schema = yup.object().shape({
    host: yup.string().required("Host Is Required"),
    reason: yup.string().required("Reason Is Required"),
    returnDate: yup.string().required("Return Date Required"),
    departDate: yup.string().required("Departure Date Is Required"),
    type: yup.string().required("Type Is Required"),
    address: yup.string().required("Address Is Required"),
  });
  const { handleSubmit, trigger, control } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      setLoading(true);

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const body = data;

      const res = await api.post("/api/apply", body, config);
      if (res.data) {
        navigate("/student/exeat-status");
      }
    } catch (err) {
      if (!err.response) {
        setLoading(false);

        setSnackMessage("Server Is Not Responding");
        setIsSnackOpen(true);
      } else if (err.response) {
        setSnackMessage(err.response.data.actualError);
        setIsSnackOpen(true);

        setLoading(false);
      } else if (err.request) {
        setSnackMessage(err.request);
        setIsSnackOpen(true);
        setLoading(false);
      } else {
        setSnackMessage(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ ml: { xs: "0", md: "240px" }, mt: 10 }}>
      <Box sx={{ pl: { xs: 5, md: 10 }, pr: { xs: 5, md: 10 } }}>
        <Typography
          sx={{
            color: "rgb(0,66,130)",
            fontWeight: "700",
            fontSize: "30px",
            pb: 5,
          }}
        >
          Apply For Exeat
        </Typography>
        <Box sx={{ pl: { xs: 0, md: 10 }, pr: { xs: 0, md: 10 } }}>
          <Grid2 container>
            <Grid2 item xs={12} md={6}>
              <Controller
                name="host"
                control={control}
                defaultValue=""
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    sx={{ mb: 4 }}
                    label="Name Of Host"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("host");
                    }}
                  />
                )}
              />
            </Grid2>
            <Grid2 item xs={12} md={6} sx={{ pl: { xs: 0, md: 5 } }}>
              <Controller
                name="type"
                control={control}
                defaultValue=""
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    sx={{ mb: 4 }}
                    label="Type Of Exeat"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("type");
                    }}
                  />
                )}
              />
            </Grid2>{" "}
            <Grid2 item xs={12} md={6}>
              <Controller
                name="departDate"
                control={control}
                defaultValue=""
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    sx={{ mb: 4 }}
                    label="Departure Date"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("departDate");
                    }}
                  />
                )}
              />
            </Grid2>{" "}
            <Grid2 item xs={12} md={6} sx={{ pl: { xs: 0, md: 5 } }}>
              <Controller
                name="returnDate"
                control={control}
                defaultValue=""
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    sx={{ mb: 4 }}
                    label="Return Date"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("returnDate");
                    }}
                  />
                )}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <Controller
                name="reason"
                control={control}
                defaultValue=""
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    sx={{ mb: 4 }}
                    label="Reason"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("reason");
                    }}
                  />
                )}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    sx={{ mb: 4 }}
                    label="Address Of Host"
                    fullWidth
                    multiline
                    rows={10}
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("address");
                    }}
                  />
                )}
              />
            </Grid2>
          </Grid2>
          <Box sx={{ textAlign: "center" }}>
            <LoadingButton
              sx={{
                mb: 2,
                width: "100%",
                height: "50px",
                backgroundColor: "blue",
              }}
              type="submit"
              variant="contained"
              loading={loading}
              onClick={handleSubmit(onSubmit)}
            >
              <span>Submit</span>
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ApplyExeat;
