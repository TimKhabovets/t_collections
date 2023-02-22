import React from "react";
import { Box } from "@mui/material";
import { ErrorMessage } from '@hookform/error-message';

export default function FormText({errors, register, placeholder, name}) {
  return (
    <Box width="100%" my={1}>
      <textarea
        className='comment'
        placeholder={placeholder}
        {...register(name, {required: true, minLength: 1})}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        message="enter the text"
        render={({ message }) => <p className='error'>{message}</p>}
      />
    </Box>
  );
}