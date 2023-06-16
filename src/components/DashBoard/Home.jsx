import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import useTicketChart from "../../customHook/useTicketChart";
import CardComponent from "./CardComponent";
import Card from '@mui/material/Card';
import ToDoComponent from "./ToDoComponent";
import withMenu from '../../HOC/Menu';

const options = {
    title: "All Tickets",
    is3D: true,
    colors: ['grey', 'blue', 'yellow', 'green'],
};

function Home() {
    const [date, setDate] = useState(new Date());
    const userData = useSelector(state => state.login);
    const ticketdata = useTicketChart();

    useEffect(() => {
        const dateTimer = setInterval(function () {
            setDate(new Date());
        }, 1000);

        return function cleanup() {
            clearInterval(dateTimer);
        }
    })

    const checkTicketData = () => {
        return ticketdata.some((ticket) => {
            return typeof (ticket[1]) != 'string' && ticket[1] != 0
        });
    }
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    <h2>Welcome back {userData.name.toUpperCase()}</h2>
                </Grid>
                <Grid item xs={3}>
                    {date.toLocaleDateString() + ', ' + date.toLocaleTimeString()}
                </Grid>
            </Grid>
            <CardComponent ticketData={ticketdata} />

            <Grid container spacing={5} sx={{ mt: '1rem' }}>
                <Grid item xs={6}>
                    <Card sx={{ height: '50vh' }}>
                        <CardContent sx={{ ml: '1rem' }}>
                            {checkTicketData() ? <Chart
                                chartType="PieChart"
                                data={ticketdata}
                                options={options}
                                width={"100%"}
                                height={"500px"}
                            /> : <Typography variant="h5" align='center' sx={{ mt: '25%' }}>No Data</Typography>
                            }
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={5}>
                    <ToDoComponent />
                </Grid>
            </Grid>
        </>
    );
}

export default withMenu(Home);