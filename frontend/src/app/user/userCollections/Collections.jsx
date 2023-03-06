import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router";
import routes from '../../../shared/constants/routes';
import { useEffectOnce } from '../../../shared/functions/useEffectOnce';
import GlobalContext from "../../../shared/contexts/GlobalContext";
import { getAllCollections, removeCollection } from '../../../shared/apis/collectionAPI';
import styles from './style.module.scss';
import { FormattedMessage } from "react-intl";

import TableRow from '@mui/material/TableRow';
import { Box, Button, Grid, Paper, TableContainer, Table, TableBody, ButtonGroup } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import CircularProgress from '@mui/material/CircularProgress';

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
  const { adminUserId } = useContext(GlobalContext);
  const { collection, setCollection } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const { currentCollection, setCurrentCollection } = useContext(GlobalContext);
  const [collections, setCollections] = useState([]);

  useEffectOnce(() => {
    getAllCollection();
  }, client.id);

  const getAllCollection = async () => {
    setIsLoading(true);
    try {
      if (adminUserId) {
        let response = await getAllCollections(adminUserId);
        setCollections(response);
      }
      else {
        let response = await getAllCollections(client.id);
        setCollections(response);
      }
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setIsLoading(false);
    }
  }

  const toNewCollection = () => {
    setCurrentCollection('');
    navigate(routes.CREATECOLLECTION)
  }

  const editCollection = (id) => {
    setCurrentCollection(id);
    navigate(routes.CREATECOLLECTION);
  }

  const deleteCollection = async (id) => {
    const collectionData = await removeCollection(id);
    const collectionsData = await getAllCollection();
  }

  const collectionPage = (collection) => {
    setCollection(collection)
    if (adminUserId) {
      navigate(routes.ADMINITEMS);
    }
    else {
      navigate(routes.ITEMS);
    }
  }

  return (
    <Grid className={styles.collections} container justifyContent="center" direction="column" alignItems="center">
      <Box my={2} width='80%'>
        <Button id={styles.button} onClick={toNewCollection} variant="outlined" >
        <FormattedMessage id="app.userpage.add"/>
        </Button>
      </Box>
      {isLoading ? (
        <Box >
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <TableContainer className={styles.table} component={Paper}>
          <Table aria-label="customized table">
            <TableBody>
              {collections.map((collection) => {
                return (
                  <StyledTableRow kay={collection.id} >
                    <StyledTableCell className={styles.tableRow} component="th" scope="row" onClick={() => { collectionPage(collection) }}>
                      <AutoAwesomeMotionIcon />
                      {collection.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button
                          onClick={() => { editCollection(collection.id) }}
                          id={styles.tableButton}
                        ><FormattedMessage id="app.userpage.button.edit"/></Button>
                        <Button
                          onClick={() => { deleteCollection(collection.id) }}
                          id={styles.tableButton}
                        ><FormattedMessage id="app.userpage.button.delete"/></Button>
                      </ButtonGroup>
                    </StyledTableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Grid>
  );
}

export default UserPage;