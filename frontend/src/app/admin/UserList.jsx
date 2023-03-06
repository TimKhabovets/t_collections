import React, { useState, useContext } from 'react';
import { useEffectOnce } from '../../shared/functions/useEffectOnce';
import { Box, Grid, ButtonGroup, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router";
import routes from '../../shared/constants/routes';

import { getUsers, removeUser, updateUser} from '../../shared/apis/userAPI';
import { getCollection } from '../../shared/apis/collectionAPI';

import GlobalContext from '../../shared/contexts/GlobalContext';
import { FormattedMessage } from "react-intl";
import styles from './style.module.scss';

function UserList() {
  let navigate = useNavigate();
  const {client} = useContext(GlobalContext);
  const { adminUserId, setAdminUserId } = useContext(GlobalContext);
  const { collection, setCollection } = useContext(GlobalContext);
  const [users, setUsers] = useState([]);

  useEffectOnce(() => {
    getAllUsers()
  }, true);

  const getAllUsers = async () => {
    const users = await getUsers();
    setUsers(users);
  }

  const deleteUser = async (event, id) => {
    event.stopPropagation();
    if (client.id === id) {
      return;
    }
    const userData = await removeUser(id);
    await getAllUsers();
  }

  const blockOrUnblockUser = async (event, params) => {
    event.stopPropagation();
    if (client.id === params.id) {
      return;
    }
    const userData = await updateUser({status: !params.row.status}, params.id);
    await getAllUsers();
  }

  const makeAdmin = async (event, params) => {
    event.stopPropagation();
    if (client.id === params.id || params.row.role === 'admin') {
      return;
    }
    const userData = await updateUser({role: 'admin'}, params.id);
    await getAllUsers();
  }

  const collectionPage = (user) => {
    setAdminUserId(user.id)
    navigate(routes.ADMINUSERPAGE);
  }

  const columns = [
    { field: 'id' },
    { field: 'name' },
    { field: 'email', width: 270 },
    { field: 'status' },
    { field: 'role' },
    {
      field: "do",
      width: 500,
      headerName: "",
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      renderCell: (params) => (
        <ButtonGroup size="small" ButtonGroup variant="outlined" aria-label="outlined button group" >
          <Button
            onClick={(event) => { makeAdmin(event, params) }}
            id={styles.tableButton}
          ><FormattedMessage id="app.admin.button.make"/></Button>
          <Button
            onClick={(event) => { blockOrUnblockUser(event, params) }}
            id={styles.tableButton}
          ><FormattedMessage id="app.admin.button.block"/></Button>
          <Button
            onClick={(event) => { deleteUser(event, params.id) }}
            id={styles.tableButton}
          ><FormattedMessage id="app.admin.button.delete"/></Button>
        </ButtonGroup >
      )
    }
  ];

  return (
    <Grid container justifyContent="center">
      <Box className={styles.table}>
        <DataGrid
          onRowClick={collectionPage}
          rows={users}
          columns={columns}
        />
      </Box>
    </Grid>
  )
}

export default UserList;