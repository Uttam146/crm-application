import { useState, useEffect } from "react";
import SideNav from './SideNav';
import NavBar from './NavBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { GrTicket } from "react-icons/all.js";
import CountUp from 'react-countup';
import { Chart } from "react-google-charts";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';


export const data = [
    ["Tickets", "Tickets Data"],
    ["Proposed", 85],
    ["Active", 58],
    ["Resolved", 150],
];

export const options = {
    title: "All Tickets",
    is3D: true,
};

function Home() {
    const [date, setDate] = useState(new Date());
    const [inputTodo, setInputTodo] = useState('');
    const [todoData, setTodoData] = useState([]);
    const [length, setLength] = useState(0);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const dateTimer = setInterval(function () {
            setDate(new Date());
        }, 1000);

        return function cleanup() {
            clearInterval(dateTimer);
        }
    })
    const addTodo = () => {
        const newData = todoData.map((item, i) => {
            return item;
        })
        newData.push({data:inputTodo,ischecked:false});
        setTodoData(newData);
        setInputTodo('');
        setTotal(total + 1);
    }
    const removeTodoData = () => {
        let newData = [];
        todoData.map((item, i) => {
            if(item.ischecked == false){
                newData.push(item);
            }
        })
        setTodoData(newData);
        setTotal(newData.length);
        setLength(0);
    }
    const handlecheckbox = (e) => {
        const index = e.target.name;
        if (e.target.checked == true) {
            const newData = todoData.map((item, i) => {
                if (i == index) {
                    return {data:item.data,ischecked:true}
                }
                return item;
            })
            setTodoData(newData);
            setLength(length + 1);
        } else {
            const newData = todoData.map((item, i) => {
                if (i == index) {
                    return {data:item.data,ischecked:false}
                }
                return item;
            })
            setTodoData(newData);
            setLength(length - 1);
        }

    }
    return (
        <>
            <NavBar />
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <Box component='main' sx={{ flexGrow: 1, pt: 20, pl: 20, backgroundColor: '#f7f7f7' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={9}>
                            <h2>Welcome back Name</h2>
                        </Grid>
                        <Grid item xs={3}>
                            {date.toLocaleDateString() + ', ' + date.toLocaleTimeString()}
                        </Grid>
                    </Grid>
                    <Stack direction="row" spacing={36} sx={{ mt: '4rem' }}>
                        <Card sx={{ minWidth: 320 }}>
                            <CardContent sx={{ ml: '1rem' }}>
                                <div style={{ marginBottom: '4%' }}>
                                    <GrTicket size={25} />
                                </div>
                                <Typography gutterBottom variant="h5" component="div">
                                    <CountUp start={0} end={85} delay={0.5} />
                                </Typography>
                                <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
                                    Proposed Ticket
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ minWidth: 320 }}>
                            <CardContent sx={{ ml: '1rem' }}>
                                <div style={{ marginBottom: '4%' }}>
                                    <GrTicket size={25} />
                                </div>
                                <Typography gutterBottom variant="h5" component="div">
                                    <CountUp start={0} end={58} delay={0.5} />
                                </Typography>
                                <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
                                    Active Ticket
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ minWidth: 320 }}>
                            <CardContent sx={{ ml: '1rem' }}>
                                <div style={{ marginBottom: '4%' }}>
                                    <GrTicket size={25} />
                                </div>
                                <Typography gutterBottom variant="h5" component="div">
                                    <CountUp start={0} end={150} delay={0.5} />
                                </Typography>
                                <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
                                    Resolved Ticket
                                </Typography>
                            </CardContent>
                        </Card>
                    </Stack>
                    <Grid container spacing={5} sx={{ mt: '1rem' }}>
                        <Grid item xs={6}>
                            <Card sx={{ height: '50vh' }}>
                                <CardContent sx={{ ml: '1rem' }}>
                                    <Chart
                                        chartType="PieChart"
                                        data={data}
                                        options={options}
                                        width={"100%"}
                                        height={"500px"}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={5}>
                            <Card sx={{ height: '50vh', minWidth: '10rem', overflow: "hidden", overflowY: "scroll" }} >
                                <CardContent sx={{ ml: '1rem' }}>
                                    <Typography variant="h5" >
                                        Todo
                                    </Typography>
                                    <Stack spacing={20} sx={{ pt: '1rem' }} direction="row">
                                        <Typography variant="h6" >
                                            {total - length} of {total} remaining
                                        </Typography>
                                        <Button variant="contained" sx={{
                                            background: 'grey', '&:hover': {
                                                backgroundColor: 'grey',
                                                borderColor: 'red',
                                                boxShadow: 'none',
                                            }
                                        }}
                                            onClick={removeTodoData}
                                        >Archive</Button>
                                    </Stack>
                                    <FormGroup sx={{ mt: '2%' }}>
                                        {
                                            todoData && todoData.map((item, index) => {
                                                return <FormControlLabel key={index} control={<Checkbox checked={item.ischecked} name={index + ''} />} onClick={(e) => handlecheckbox(e)} label={item.ischecked ? <del>{item.data}</del> : item.data} />
                                            })
                                        }
                                        {/* <FormControlLabel control={<Checkbox />} />sdsd
                                        <FormControlLabel control={<Checkbox />} onClick={(e)=>handlecheckbox(e)} label={<del>Required</del>} /> */}
                                    </FormGroup>
                                    <Stack spacing={2} direction="row" sx={{ mt: '1rem' }}>
                                        <TextField id="outlined-basic" variant="outlined" onChange={(e) => { setInputTodo(e.target.value) }} value={inputTodo} />
                                        <Button variant="contained" sx={{
                                            background: 'grey', '&:hover': {
                                                backgroundColor: 'grey',
                                                borderColor: 'red',
                                                boxShadow: 'none',
                                            }
                                        }}
                                            onClick={addTodo}
                                        >Add</Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default Home;