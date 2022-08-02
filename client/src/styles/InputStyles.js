import { InputBase, styled, TextField } from "@mui/material";

const TextInput = styled(InputBase)(() => ({
  padding: "0 10px",
  borderRadius: 3,
  height: 40,
  backgroundColor: "white",
}));

const TextFieldInput = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    height: 40,
    backgroundColor: "white",
    "& > fieldset": {
      border: "none",
    },
  },
  "& .MuiOutlinedInput-root:hover": {
    "& > fieldset": {
      border: "none",
    },
  },
}));

const TextFieldSelect = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    height: 40,
    backgroundColor: "white",
    "& > fieldset": {
      borderColor: "#FF004D",
    },
  },
  "& .MuiOutlinedInput-root:hover": {
    "& > fieldset": {
      borderColor: "#FF004D",
    },
  },
  "& .MuiInputLabel-root": { color: "#FF004D" },
  input: {
    "&::placeholder": {
      color: "#FF004D",
    },
  },
}));

export { TextFieldInput, TextFieldSelect, TextInput };
