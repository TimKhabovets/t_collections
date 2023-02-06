import React from 'react';
import { useNavigate } from "react-router";
import { Box, Button, Grid } from '@mui/material';
import routes from '../../../shared/constants/routes'

function UserPage() {
  let navigate = useNavigate();

  const toNewCollection = () => {
    navigate(routes.NEWCOL)
  }
  
  return (
    <Grid container justifyContent="center">
      <Box my={2} width='80%'>
        <Button onClick={toNewCollection} variant="outlined"  sx={{ 
            ':hover': {
              backgroundColor: '#272727',
              border: '1px solid #272727',
              color: 'white',
            },
            border: '1px solid #272727',
            color: '#272727', 
            backgroundColor: 'white',
            width: '100%',
        }}>
          Add New Collections
        </Button>
      </Box>
    </Grid>
  );
}

export default UserPage;