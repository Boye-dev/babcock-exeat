import { createContext, useState } from "react";
import { Snackbar } from "@mui/material";

const ExeatContext = createContext();
export const ExeatProvider = ({ children }) => {
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackColor, setSnackColor] = useState();
  const handleClose = () => {
    setIsSnackOpen(false);
  };
  return (
    <ExeatContext.Provider
      value={{
        setIsSnackOpen,
        setSnackMessage,

        snackColor,
        setSnackColor,
      }}
    >
      {isSnackOpen && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={isSnackOpen}
          onClose={handleClose}
          autoHideDuration={3000}
          message={`${snackMessage}`}
          key="topcenter"
          sx={{
            color: "black !important",
            "& .MuiSnackbarContent-root": {
              backgroundColor: `${snackColor ? `${snackColor}` : "darkred"}`,
            },
          }}
        />
      )}
      {children}
    </ExeatContext.Provider>
  );
};

export default ExeatContext;
