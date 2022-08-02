import { Close } from "@mui/icons-material";
import { Alert, Collapse, IconButton } from "@mui/material";
import React from "react";
import getAlertHeaderText from "../functions/getAlertHeaderText";

const AlertBox = ({ showAlert, setShowAlert, alertStatus }) => {
  return (
    <Collapse sx={{ width: "300px" }} in={showAlert}>
      <Alert
        severity={alertStatus}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setShowAlert(false);
            }}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
      >
        <strong>
          {getAlertHeaderText(alertStatus)}
          {" . . ."}
        </strong>
      </Alert>
    </Collapse>
  );
};

export default AlertBox;
