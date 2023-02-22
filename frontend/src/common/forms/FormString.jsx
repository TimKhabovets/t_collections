import React from "react";
import { Box, TextField } from "@mui/material";
import { ErrorMessage } from '@hookform/error-message';

export default function FormString({errors, register, placeholder, name}) {
  return (
    <Box width="100%" my={1}>
      <TextField
        name={name}
        variant="filled"
        label={placeholder}
        type="text"
        {...register(name, {required: true})}
        sx={{ width: '100%' }}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        message="enter the string"
        render={({ message }) => <p className='error'>{message}</p>}
      />
    </Box>
  );
}
