import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { editTicketyId } from '../api/ticketApi';
import Swal from "sweetalert2";
import FormControl from '@mui/material/FormControl';

export default function EditTicket({ closeEvent, getTicket, editData }) {
  const [ticket, setTicket] = useState({ status: '', remark: '' });
  console.log(editData);

  const handleChange = (event) => {
    setTicket({...ticket,[event.target.name]: event.target.value});
  };
  const editTicket = () => {
    const data = {
      status:ticket.status,
      userId:"Another Person",
      remark:ticket.remark,
      ticketId:editData.ticketId
    }
    editTicketyId(data)
      .then((res) => {
        closeEvent();
        Swal.fire("Success", `User has been Updated Successfully`, "success");
        getTicket();
      })
      .catch((err) => {
        console.log(err);
      })
  };
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align='center'>
        Edit Ticket
      </Typography>
      <IconButton
        style={{ position: 'absolute', top: '0', right: '0' }}
        onClick={closeEvent}>
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name='status'
              value={ticket.status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value={'ACTIVE'}>ACTIVE</MenuItem>
              <MenuItem value={'RESOLVED'}>RESOLVED</MenuItem>
              <MenuItem value={'CLOSED'}>CLOSED</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField id="outlined-basic" value={ticket.remark} name='remark' label="Remark" size='small' variant="outlined" sx={{ minWidth: '100%' }} onChange={handleChange}
            multiline
            rows={4} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align='center'>
            <Button variant='contained' onClick={editTicket}>
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}