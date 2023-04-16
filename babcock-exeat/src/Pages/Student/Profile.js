import { ArrowBack, Edit } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Checkbox,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../auth_service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";
import { useMutation } from "react-query";
import api from "../../api/api";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ExeatContext from "../../ExeatContext";
import UpdatePassword from "../../Components/UpdatePassword";
const Profile = () => {
  const { getCurrentAdmin, setWithExpiry } = AuthService;

  const { setIsSnackOpen, setSnackMessage, setSnackColor } =
    useContext(ExeatContext);

  const schema = yup.object().shape({
    firstname: yup.string().required("Firstname Is Required"),
    lastname: yup.string().required("Lastname Is Required"),
    hall: yup.string().required("Hall Is Required"),
    userNumber: yup.string().required("userNumber Is Required"),
  });
  const { handleSubmit, trigger, control, reset, setValue } = useForm({
    resolver: yupResolver(schema),
  });
  const [loadingArea, setLoadingArea] = useState(false);

  const currentUser = getCurrentAdmin();

  const loggIn = async ({ payload }) => {
    return api
      .put(`/api/editProfile/${getCurrentAdmin()?._id}`, payload)
      .then((res) => res.data);
  };
  const { mutate, isLoading } = useMutation(loggIn, {
    onError: (error) => {
      setSnackColor("red");
      setIsSnackOpen(true);
      setSnackMessage(
        error.response.data.actualError
          ? error.response.data.actualError
          : "Something Went Wrong"
      );
    },
    onSuccess: (data) => {
      setWithExpiry("user", data.user);
      setSnackColor("green");
      setIsSnackOpen(true);
      setSnackMessage("Editted Successfully");
    },
  });

  const onSubmit = (payload) => {
    // let formData = new FormData();

    // payload = {
    //   ...payload,
    // };

    // formData.append("firstname", payload.firstname);
    // formData.append("lastname", payload.lastname);
    // formData.append("userNumber", payload.userNumber);

    // const data = formData;

    mutate({ payload });
  };
  return (
    <>
      <Box sx={{ ml: { xs: "0", md: "240px" }, mt: 10 }}>
        <Box sx={{ pl: { xs: 3, md: 10 }, pr: { xs: 3, md: 10 }, mb: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
            <Typography
              sx={{
                fontSize: "30px",
                fontWeight: "700",
                color: "rgb(0,66,130)",
                pl: 2,
              }}
            >
              Edit Profile
            </Typography>
          </Box>
          <Box
            sx={{
              display: { xs: "block", md: "" },

              width: { xs: "100%" },
            }}
          >
            <Box
              sx={{
                width: { xs: "100%" },
                textAlign: { xs: "center", md: "center" },
                mt: 5,
              }}
            >
              <Controller
                name="firstname"
                control={control}
                defaultValue={getCurrentAdmin()?.firstname}
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    sx={{ width: { xs: "100%", md: "60%" }, mb: 3 }}
                    label="Firstname"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("firstname");
                    }}
                  />
                )}
              />
              <Controller
                name="lastname"
                control={control}
                defaultValue={getCurrentAdmin()?.lastname}
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    sx={{ width: { xs: "100%", md: "60%" }, mb: 3 }}
                    label="Lastame"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("lastname");
                    }}
                  />
                )}
              />
              <Controller
                name="hall"
                control={control}
                defaultValue={getCurrentAdmin()?.hall}
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    sx={{ width: { xs: "100%", md: "60%" }, mb: 3 }}
                    label="Hall"
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("hall");
                    }}
                  />
                )}
              />
              <Controller
                name="userNumber"
                control={control}
                defaultValue={getCurrentAdmin()?.userNumber}
                render={({
                  field: { ref, ...fields },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    sx={{ width: { xs: "100%", md: "60%" }, mb: 3 }}
                    label="User Number"
                    disabled
                    fullWidth
                    {...fields}
                    inputRef={ref}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    onKeyUp={() => {
                      trigger("userNumber");
                    }}
                  />
                )}
              />

              <Box sx={{ textAlign: "center" }}>
                <LoadingButton
                  sx={{
                    mb: 4,

                    height: "50px",
                    transition: "opacity 0.3s",
                    ":hover": {
                      bgcolor: "rgb(0,66,130)",
                      color: "white",
                      opacity: "0.8",
                    },
                    opacity: "1",
                    backgroundColor: "rgb(0,66,130)",

                    width: { xs: "100%", md: "60%" },
                  }}
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                  onClick={handleSubmit(onSubmit)}
                >
                  <span>Edit </span>
                </LoadingButton>
              </Box>
              <UpdatePassword />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
