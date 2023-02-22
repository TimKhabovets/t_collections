import React from "react";
import { Box, TextField } from "@mui/material";
import { ErrorMessage } from '@hookform/error-message';

export default function FormCheckbox({errors, register, placeholder, name}) {
  return (
    <Box width="100%" my={1} >
      <TextField
        variant="filled"
        label={placeholder}
        name={name}
        type="number"
        {...register(name, {required: true})}
        sx={{width: '100%'}}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        message="enter the number"
        render={({ message }) => <p className='error'>{message}</p>}
      />
    </Box>
  );
}
