import React from "react";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField';
import { useState } from "react";
import Button from '@mui/material/Button';
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux';
import { saveCalendarEvents } from '../../store/slices/calendarSlice';

export default function AddCalendarEvents({closeEvent,eventsData}){
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [error,setError] = useState({error:false,errorname:''});
    const createEvent = () => {
        if(title){
            closeEvent();
            dispatch(saveCalendarEvents({title,...eventsData}));
            console.log(title,eventsData);
            Swal.fire("Success", `Event has been added Successfully`, "success");
        }else{
            setError({
                error:true,
                errorname:'Please Enter Event Title'
            });
        }   
    };
    return(
        <>
        <Box sx={{m:2}} />
            <Typography variant="h5" align='center'>
                Add Event
            </Typography>
            <IconButton
            style={{position:'absolute',top:'0',right:'0'}}
            onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
        <Box height={20} />
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField error={error.error} id="outlined-basic" value={title} label="Event Name" size='small' variant="outlined" sx={{minWidth:'100%'}} onChange={(e)=>{setTitle(e.target.value)}}  helperText={error.errorname}/>
            </Grid>
        <Grid item xs={12}>
        <Typography variant="h5" align='center'>
            <Button variant='contained' onClick={createEvent}>
                Submit
                </Button>
            </Typography>
        </Grid>
        </Grid>
        </>
    )
}