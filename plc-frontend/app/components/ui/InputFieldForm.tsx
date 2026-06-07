import { TextField, TextFieldProps } from "@mui/material";

type InputFieldFormProps = TextFieldProps;

export default function InputFieldForm({
  variant = "outlined",
  fullWidth = true,
  size = "small",
  sx,
  ...props
}: InputFieldFormProps) {
  return (
    <TextField
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      {...props}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          background: "#fff",

          "& fieldset": {
            borderColor: "#e5e7eb",
          },

          "&:hover fieldset": {
            borderColor: "#1a4fd6",
          },

          "&.Mui-focused fieldset": {
            borderColor: "#1a4fd6",
            borderWidth: 2,
          },
        },

        "& .MuiInputLabel-root": {
          color: "#64748b",
        },

        "& .MuiInputLabel-root.Mui-focused": {
          color: "#1a4fd6",
        },

        ...sx,
      }}
    />
  );
}