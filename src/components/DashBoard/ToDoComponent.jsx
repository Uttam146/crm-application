import React,{useState} from "react";
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function ToDoComponent() {
    const [inputTodo, setInputTodo] = useState('');
    const [todoData, setTodoData] = useState([]);
    const [length, setLength] = useState(0);
    const [total, setTotal] = useState(0);
    const addTodo = () => {
        const newData = todoData.map((item, i) => {
            return item;
        })
        newData.push({ data: inputTodo, ischecked: false });
        setTodoData(newData);
        setInputTodo('');
        setTotal(total + 1);
    }
    const removeTodoData = () => {
        let newData = [];
        todoData.map((item, i) => {
            if (item.ischecked == false) {
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
                    return { data: item.data, ischecked: true }
                }
                return item;
            })
            setTodoData(newData);
            setLength(length + 1);
        } else {
            const newData = todoData.map((item, i) => {
                if (i == index) {
                    return { data: item.data, ischecked: false }
                }
                return item;
            })
            setTodoData(newData);
            setLength(length - 1);
        }
    }

        return (
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
                    </FormGroup>
                    <Stack spacing={2} direction="row" sx={{ mt: '1rem' }}>
                        <TextField id="outlined-basic" variant="outlined" onChange={(e) => { setInputTodo(e.target.value) }} value={inputTodo} />
                        <Button variant="contained" sx={{
                            background: 'grey', '&:hover': {
                                backgroundColor: 'grey',
                            }
                        }}
                            onClick={addTodo}
                        >Add</Button>
                    </Stack>
                </CardContent>
            </Card>
        )
}