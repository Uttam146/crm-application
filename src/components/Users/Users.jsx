import React from 'react';
import UserList from './UserList';
import withMenu from '../../HOC/Menu';
import { Grid } from '@mui/material';


function Users() {
    return (
        <>
            <Grid container spacing={1} sx={{ pt: '4rem' }}>
                <Grid item xs={12}>
                    <UserList />
                </Grid>
            </Grid>
        </>
    )
}

export default withMenu(Users);