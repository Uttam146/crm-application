import React, { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { saveTicket } from '../../api/ticketApi'
import Swal from "sweetalert2";
import FormControl from '@mui/material/FormControl';
import useLocalStorage from "../../customHook/useLocalStorage";

export default function AddTicket({ closeEvent ,getTicket}) {
    const localStorage = useLocalStorage();
    const [ticket, setTicket] = useState({ title: '', priority: '', description: '' });

    const handleChange = (event) => {
        setTicket({ ...ticket, [event.target.name]: event.target.value });
    };

    const createTicket = () => {
        const data = {
            title: ticket.title,
            priority: ticket.title,
            description: ticket.description,
            userId: localStorage.userId,
        }
        saveTicket(data)
            .then((res) => {
                closeEvent();
                Swal.fire("Success", `Ticket has been created Successfully`, "success");
                getTicket();
            })
            .catch((err) => {
                closeEvent();
                Swal.fire("Warning", `Something Went Wrong`, "warning");
                console.log(err);
            })
    };
    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant="h5" align='center'>
                Add Ticket
            </Typography>
            <IconButton
                style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={20} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" value={ticket.title} name='title' label="Title" variant="outlined" sx={{ minWidth: '100%' }} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='priority'
                            value={ticket.priority}
                            label="Priority"
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>One</MenuItem>
                            <MenuItem value={2}>Two</MenuItem>
                            <MenuItem value={3}>Three</MenuItem>
                            <MenuItem value={4}>Four</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" value={ticket.description} name='description' label="Description" size='small' variant="outlined" sx={{ minWidth: '100%' }} onChange={handleChange}
                        multiline
                        rows={4} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" align='center'>
                        <Button variant='contained' onClick={createTicket}>
                            Submit
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}