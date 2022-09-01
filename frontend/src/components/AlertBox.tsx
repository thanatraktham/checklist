import { Close } from "@mui/icons-material";
import { Alert, AlertColor, Collapse, IconButton } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import getAlertHeaderText from "../functions/getAlertHeaderText";

type Props = {
  showAlert: boolean;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  alertStatus: AlertColor;
};

const AlertBox = ({ showAlert, setShowAlert, alertStatus }: Props) => {
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
