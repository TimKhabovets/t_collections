import React from "react";
import { Box } from "@mui/material";
import { ErrorMessage } from '@hookform/error-message';

export default function FormCheckbox({register, placeholder, name }) {
  return (
    <Box width="100%" my={1} sx={{
      display: 'flex',
      alignItems: 'center',
    }}>
      <input
        className="optionCheckbox"
        type="checkbox"
        {...register(name, { required: true})}
      />
      <label for={name}>{placeholder}</label>
    </Box>
  );
}
