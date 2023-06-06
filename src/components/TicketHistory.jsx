import React, { useState, useEffect } from 'react';
import SideNav from './SideNav'
import Box from '@mui/material/Box';
import NavBar from './NavBar';
import { Grid } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from "@mui/material/Divider";
import TextField from '@mui/material/TextField';
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getHistory } from '../api/historyApi';
const theme = createTheme({
    palette: {
        color1: {
            main: "blue"
        },
        color2: {
            main: "yellow"
        }
    }
});

export default function TicketHistory() {
    const [showHistory, setShowHistory] = useState('none');
    const [ticketId, setTicketId] = useState('');
    const [ticketHistory, setTicketHistory] = useState([]);
    const search = () => {
        getData();

    }
    const getData = async () => {
        const data = {
            ticketId
        }
        getHistory({ ticketId })
            .then((res) => {
                setTicketHistory(res.data);
                setShowHistory('block');
            }).catch((err) => console.log(err));
    }
    return (
        <>
            <ThemeProvider theme={theme}>
                <NavBar />
                <Box sx={{ display: 'flex', backgroundColor: '#f7f7f7' }}>
                    <SideNav />
                    <Box component='main' sx={{ flexGrow: 1, pt: 12, pl: 20, maxWidth: '105rem', minHeight: "100vh" }}>
                        <Grid container spacing={1} sx={{ pt: '4rem' }}>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="div"
                                    sx={{ padding: "20px" }}
                                >
                                    Ticket History
                                </Typography>
                                <Divider />
                                <Box height={10} />
                                <Stack direction="row" spacing={2} className="m-4">
                                    <TextField id="outlined-basic" value={ticketId} onChange={(e) => { setTicketId(e.target.value) }} label="Ticket Id" variant="outlined" />
                                    <Button variant="contained" sx={{
                                        background: 'grey', '&:hover': {
                                            backgroundColor: 'grey',
                                            borderColor: 'red',
                                            boxShadow: 'none',
                                        }
                                    }}
                                        onClick={search}

                                    >Search</Button>
                                </Stack>

                                <Grid container spacing={1} sx={{ pt: '4rem' }} style={{ display: showHistory }}>
                                    <Timeline position="alternate">
                                        {
                                            ticketHistory && ticketHistory.map((history) => {
                                                if (history.status == 'proposed') {
                                                    return (
                                                        <TimelineItem>
                                                            <TimelineOppositeContent
                                                                sx={{ m: 'auto 0' }}
                                                                align="right"
                                                                variant="body2"
                                                                color="grey"
                                                            >
                                                               {history.createdAt}
                                                            </TimelineOppositeContent>
                                                            <TimelineSeparator>
                                                                <TimelineDot color="grey" />
                                                                <TimelineConnector />
                                                            </TimelineSeparator>
                                                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                                                <Typography variant="h6" component="span">
                                                                    Proposed
                                                                </Typography>
                                                                <Typography>{history.remarks}</Typography>
                                                            </TimelineContent>
                                                        </TimelineItem>

                                                    )
                                                }else if(history.status == 'ACTIVE'){
                                                    return (
                                                        <TimelineItem>
                                                            <TimelineOppositeContent
                                                                sx={{ m: 'auto 0' }}
                                                                align="right"
                                                                variant="body2"
                                                                color="color1"
                                                            >
                                                                {history.createdAt}
                                                            </TimelineOppositeContent>
                                                            <TimelineSeparator>
                                                                <TimelineDot color="color1" />
                                                                <TimelineConnector />
                                                            </TimelineSeparator>
                                                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                                                <Typography variant="h6" component="span">
                                                                    Active
                                                                </Typography>
                                                                <Typography>{history.remarks}</Typography>
                                                            </TimelineContent>
                                                        </TimelineItem>

                                                    )
                                                }else if(history.status == 'RESOLVED'){
                                                    return (
                                                        <TimelineItem>
                                                            <TimelineOppositeContent
                                                                sx={{ m: 'auto 0' }}
                                                                align="right"
                                                                variant="body2"
                                                                color="color2"
                                                            >
                                                                {history.createdAt}
                                                            </TimelineOppositeContent>
                                                            <TimelineSeparator>
                                                                <TimelineDot color="color2" />
                                                                <TimelineConnector />
                                                            </TimelineSeparator>
                                                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                                                <Typography variant="h6" component="span">
                                                                    Resolved
                                                                </Typography>
                                                                <Typography>{history.remarks}</Typography>
                                                            </TimelineContent>
                                                        </TimelineItem>

                                                    )
                                                }else{
                                                    return (
                                                        <TimelineItem>
                                                            <TimelineOppositeContent
                                                                sx={{ m: 'auto 0' }}
                                                                align="right"
                                                                variant="body2"
                                                                color="success"
                                                            >
                                                               {history.createdAt}
                                                            </TimelineOppositeContent>
                                                            <TimelineSeparator>
                                                                <TimelineDot color="success" />
                                                                <TimelineConnector />
                                                            </TimelineSeparator>
                                                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                                                <Typography variant="h6" component="span">
                                                                    Closed
                                                                </Typography>
                                                                <Typography>{history.remarks}</Typography>
                                                            </TimelineContent>
                                                        </TimelineItem>
                                                    )
                                                }
                                            })
                                        }
                                        {/* <TimelineItem>
                                            <TimelineOppositeContent
                                                sx={{ m: 'auto 0' }}
                                                align="right"
                                                variant="body2"
                                                color="grey"
                                            >
                                                9:30 am
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot color="grey" />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                                <Typography variant="h6" component="span">
                                                    Proposed
                                                </Typography>
                                                <Typography>Ticket Title</Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineOppositeContent
                                                sx={{ m: 'auto 0' }}
                                                variant="body2"
                                                color="color1"
                                            >
                                                10:00 am
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineConnector />
                                                <TimelineDot color="color1" />
                                            </TimelineSeparator>
                                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                                <Typography variant="h6" component="span">
                                                    Active
                                                </Typography>
                                                <Typography>Ticket Actve by</Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineConnector />
                                                <TimelineDot color="color2" />
                                                <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                                            </TimelineSeparator>
                                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                                <Typography variant="h6" component="span">
                                                    Resolved
                                                </Typography>
                                                <Typography>Resolved By</Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                                                <TimelineDot color="success">
                                                </TimelineDot>
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                                <Typography variant="h6" component="span">
                                                    Closed
                                                </Typography>
                                                <Typography>Closed By</Typography>
                                            </TimelineContent>
                                        </TimelineItem> */}
                                    </Timeline>

                                </Grid>

                            </Paper>
                        </Grid>


                    </Box>
                </Box>
            </ThemeProvider>
        </>
    )
}
