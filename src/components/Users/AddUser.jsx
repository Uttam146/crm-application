import React, { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { SignInFormV2 } from '../../api/userAuth';
import Swal from "sweetalert2";

export default function AddUser({ closeEvent, getUsers }) {
    const [signup, setSignup] = useState({ role: '', userid: '', username: '', emailid: '' });
    const handleChange = (event) => {
        setSignup({ ...signup, [event.target.name]: event.target.value });
    };
    const createUser = () => {
        const data = {
            name: signup.username,
            userId: signup.userid,
            email: signup.emailid,
            userTypes: signup.role,
        }

        SignInFormV2(data)
            .then((res) => {
                closeEvent();
                Swal.fire("Success", `User has been created Successfully`, "success");
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
                Add User
            </Typography>
            <IconButton
                style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={20} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" value={signup.userid} name='userid' label="Enter UserId" size='small' variant="outlined" sx={{ minWidth: '100%' }} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" value={signup.username} name='username' label="Enter UserName" size='small' variant="outlined" sx={{ minWidth: '100%' }} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} >
                    <TextField id="outlined-basic" value={signup.emailid} name='emailid' label="Enter EmailId" size='small' variant="outlined" sx={{ minWidth: '100%' }} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <Select
                        value={signup.role}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        size='small'
                        sx={{ minWidth: '100%' }}
                        name='role'
                    >
                        <MenuItem value={'CUSTOMER'}>CUSTOMER</MenuItem>
                        <MenuItem value={'ENGINEER'}>ENGINEER</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" align='center'>
                        <Button variant='contained' onClick={createUser}>
                            Submit
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}