import React from "react";
import { GrTicket } from "react-icons/all.js";
import CountUp from 'react-countup';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function CardComponent({ ticketData }) {
    return (
        <Stack direction="row" spacing={12} sx={{ mt: '4rem' }}>
            <Card sx={{ minWidth: 280 }}>
                <CardContent sx={{ ml: '1rem' }}>
                    <div style={{ marginBottom: '4%' }}>
                        <GrTicket size={25} />
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                        <CountUp start={0} end={ticketData.length == 0 ? 0 : ticketData[1][1]} delay={0.5} />
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
                        Proposed Ticket
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 280 }}>
                <CardContent sx={{ ml: '1rem' }}>
                    <div style={{ marginBottom: '4%' }}>
                        <GrTicket size={25} />
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                        <CountUp start={0} end={ticketData.length == 0 ? 0 : ticketData[2][1]} delay={0.5} />
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
                        Active Ticket
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 280 }}>
                <CardContent sx={{ ml: '1rem' }}>
                    <div style={{ marginBottom: '4%' }}>
                        <GrTicket size={25} />
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                        <CountUp start={0} end={ticketData.length == 0 ? 0 : ticketData[3][1]} delay={0.5} />
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
                        Resolved Ticket
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 280 }}>
                <CardContent sx={{ ml: '1rem' }}>
                    <div style={{ marginBottom: '4%' }}>
                        <GrTicket size={25} />
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                        <CountUp start={0} end={ticketData.length == 0 ? 0 : ticketData[4][1]} delay={0.5} />
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
                        Closed Ticket
                    </Typography>
                </CardContent>
            </Card>
        </Stack>
    )
}