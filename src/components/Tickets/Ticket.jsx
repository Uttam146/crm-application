import React, { useState, useEffect } from 'react';
import TicketList from './TicketList';
import withMenu from '../../HOC/Menu';
import { Grid } from '@mui/material';

function Ticket() {
    const [loading, setLoading] = useState(true);
    return (
        <>
            <Grid container spacing={1} sx={{ pt: '4rem' }}>
                <Grid item xs={12}>
                    <TicketList />
                </Grid>
            </Grid>
        </>
    )
}

export default withMenu(Ticket);