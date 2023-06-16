import React,{ useState } from "react";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { editUserById } from '../../api/usersApi';
import Swal from "sweetalert2";

export default function EditUser({ closeEvent, getUsers, editData }) {
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const editUser = () => {
    const data = {
      id:editData,
      status:status
    }
    editUserById(data)
      .then((res) => {
        closeEvent();
        Swal.fire("Success", `User has been Updated Successfully`, "success");
        getUsers();
      })
      .catch((err) => {
        console.log(err);
      })
  };
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align='center'>
        Edit User
      </Typography>
      <IconButton
        style={{ position: 'absolute', top: '0', right: '0' }}
        onClick={closeEvent}>
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            select // tell TextField to render select
            label="Status"
            size='small'
            sx={{ minWidth: '100%' }}
          >
            <MenuItem key={1} value="PENDING">
              PENDING
            </MenuItem>
            <MenuItem key={2} value="APPROVED">
              APPROVED
            </MenuItem>
            <MenuItem key={3} value="BLOCKED">
              BLOCKED
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align='center'>
            <Button variant='contained' onClick={editUser}>
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}