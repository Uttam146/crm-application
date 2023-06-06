import SideNav from './SideNav'
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import { Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useState, useEffect } from 'react';
import NewUserList from './NewUserList';

export default function Users() {
    return (
        <>
            <NavBar />
            <Box sx={{ display: 'flex', backgroundColor: '#f7f7f7' }}>
                <SideNav />
                <Box component='main' sx={{ flexGrow: 1, pt: 12, pl: 20, maxWidth: '105rem',minHeight:"100vh"}}>
                    <Grid container spacing={1} sx={{ pt: '4rem' }}>

                        <Grid item xs={12}>
                            <NewUserList />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}