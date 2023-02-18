import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router";
import routes from '../../../shared/constants/routes';
import { useEffectOnce } from '../../../common/functions/useEffectOnce';
import GlobalContext from "../../../shared/contexts/GlobalContext";
import { getAllCollections } from '../../../shared/apis/collectionAPI';

import TableRow from '@mui/material/TableRow';
import { Box, Button, Grid, Paper, TableContainer, Table, TableBody, ButtonGroup } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function UserPage() {
  let navigate = useNavigate();
  const { client } = useContext(GlobalContext);
  const { currentCollection, setCurrentCollection } = useContext(GlobalContext);
  const [collections, setCollections] = useState([]);

  useEffectOnce(() => {
    if (client.id) {
      getAllCollection();
    }
  }, client.id);

  const getAllCollection = async () => {
    let response = await getAllCollections(client.id);
    setCollections(response);
  }

  const toNewCollection = () => {
    navigate(routes.CREATECOLLECTION)
  }

  const editCollection = (id) => {
    setCurrentCollection(id);
    navigate(routes.CREATECOLLECTION);
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
      </Box>
      <TableContainer sx={{ minWidth: 500, maxWidth: '95%' }} component={Paper}>
        <Table aria-label="customized table">
          <TableBody>
            {collections.map((collection) => {
              return (
                <StyledTableRow kay={collection.id} >
                  <StyledTableCell sx={{ width: 20 }} component="th" scope="row">
                    <AutoAwesomeMotionIcon />
                  </StyledTableCell>
                  <StyledTableCell align="left" >
                    {collection.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                      <Button
                        onClick={() => {editCollection(collection.id)}}
                        sx={{
                          ':hover': {
                            backgroundColor: '#272727',
                            border: '1px solid #272727',
                            color: 'white',
                          },
                          border: '1px solid #272727',
                          color: '#272727',
                          backgroundColor: 'white',
                        }}>edit</Button>
                      <Button
                        sx={{
                          ':hover': {
                            backgroundColor: '#272727',
                            border: '1px solid #272727',
                            color: 'white',
                          },
                          border: '1px solid #272727',
                          color: '#272727',
                          backgroundColor: 'white',
                        }}>delete</Button>
                    </ButtonGroup>
                  </StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default UserPage;