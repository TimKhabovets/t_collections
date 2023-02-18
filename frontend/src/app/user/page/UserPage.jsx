import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router";
import routes from '../../../shared/constants/routes';
import { useEffectOnce } from '../../../common/functions/useEffectOnce';
import GlobalContext from "../../../shared/contexts/GlobalContext";
import { getAllCollections } from '../../../shared/apis/collectionAPI';

import TableRow from '@mui/material/TableRow';
import { Box, Button, Grid, Paper, TableContainer, Table, TableBody } from '@mui/material';
import TableCell from '@mui/material/TableCell';

function UserPage() {
  let navigate = useNavigate();
  const { client } = useContext(GlobalContext);
  const [collections, setCollections] = useState([]);

  useEffectOnce(() => {
    if (client.id) {
      getAllCollection();
    }
  }, true);

  const getAllCollection = async () => {
    const response = await getAllCollections(client.id);
    setCollections(response);
  }

  const toNewCollection = () => {
    navigate(routes.NEWCOL)
  }

  return (
    <Grid container justifyContent="center">
      <Box my={2} width='80%'>
        <Button onClick={toNewCollection} variant="outlined" sx={{
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
              {collections.map((collection) => {
                <TableRow key={collection.id}>
                  <TableCell component="th" scope="row">
                    {collection.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {collection.topic}
                  </TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}

export default UserPage;