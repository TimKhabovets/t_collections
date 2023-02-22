import React from "react";
import { Box, TextField } from "@mui/material";
import { ErrorMessage } from '@hookform/error-message';

export default function FormDate({errors, register, placeholder, name}) {
  return (
    <Box width="100%" my={1}>
      <TextField
        variant="filled"
        name={name}
        label={placeholder}
        type="date"
        {...register(name, {required: true})}
        sx={{ width: 220 }}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        message="chose the date"
        render={({ message }) => <p className='error'>{message}</p>}
      />
    </Box>
  );
}
