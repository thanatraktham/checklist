import { Divider } from "@mui/material";

const BoxHeader = ({ children }) => {
  return (
    <Divider
      textAlign="left"
      sx={{
        color: "var(--yellow)",
        "&::before": {
          borderTop: "solid white",
        },
        "&::after": {
          borderTop: "solid white",
        },
      }}
    >
      <strong style={{ fontSize: "20px" }}>{children}</strong>
    </Divider>
  );
};

export default BoxHeader;
