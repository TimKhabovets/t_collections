import React from "react";
import { Box, TextField } from "@mui/material";
import { ErrorMessage } from '@hookform/error-message';

export default function FormInput({errors, register, placeholder, name, type}) {
  return (
    <Box width="100%" my={1}>
      <TextField
        name={name}
        color="dark"
        variant="filled"
        label={placeholder}
        type={type}
        {...register(name, {required: true})}
        sx={{ width: '100%' }}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        message="enter the "
        render={({ message }) => <p className='error'>{message} {type}</p>}
      />
    </Box>
  );
}
