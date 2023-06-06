import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { fetchAllUsers, deleteUserById } from "../api/fetchUsers";
import {fetchAllTicket}  from '../api/ticketApi';
import Modal from '@mui/material/Modal';
import AddTicket from './AddTicket';
import EditTicket from './EditTicket';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function TicketList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const handleEdit = () => setEdit(true);
    const handleEditClose = () => setEdit(false); 
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); 
    const [editData,setEditData] = useState({ticketId:''});

    useEffect(() => {
        getTicket();
    }, []);

    const getTicket = async () => {
        fetchAllTicket()
            .then((res) => {
                setRows(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    };
    const deleteUser = (id, userid) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.value) {
                deleteApi(id, userid);
            }
        });
    };

    const deleteApi = async (id, userid) => {
        deleteUserById({ id })
            .then((res) => {
                Swal.fire("Deleted!", `User ${userid} has been deleted.`, "success");
                getTicket();
            })
            .catch((err) => {
                Swal.fire("ERROR!", `OOPS Something went wrong`, "warning");
                console.log(err);
            })
    };
    const editTicket = async (id) => {
        setEditData({ticketId:id});
        handleEdit();
        // deleteUserById({ id })
        //     .then((res) => {
        //         Swal.fire("Deleted!", `User ${userid} has been deleted.`, "success");
        //         getTicket();
        //     })
        //     .catch((err) => {
        //         Swal.fire("ERROR!", `OOPS Something went wrong`, "warning");
        //         console.log(err);
        //     })
    };
    const filterData = (v) => {
        if (v) {
            setRows([v]);
        } else {
            setRows([]);
            getTicket();
        }
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <div>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AddTicket closeEvent={handleClose} getTicket={getTicket}/>
                    </Box>
                </Modal>
                <Modal
                    open={edit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <EditTicket closeEvent={handleEditClose} getTicket={getTicket} editData={editData}/>
                    </Box>
                </Modal>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ padding: "20px" }}
                >
                    Ticket List
                </Typography>
                <Divider />
                <Box height={10} />
                <Stack direction="row" spacing={2} className="my-2 mb-2">
                    {/* <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={rows}
                        sx={{ width: 300 }}
                        onChange={(e, v) => filterData(v)}
                        getOptionLabel={(rows) => rows.ticketId || ""}
                        renderInput={(params) => (
                            <TextField {...params} size="small" label="Search TicketId" />
                        )}
                    /> */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    ></Typography>
                    <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
                        Add
                    </Button>
                </Stack>
                <Box height={10} />
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align='left'
                                    style={{ minWidth: '100px' }}
                                >
                                    Ticket Id
                                </TableCell>
                                <TableCell
                                    align='left'
                                    style={{ minWidth: '100px' }}
                                >
                                    Title
                                </TableCell>
                                <TableCell
                                    align='left'
                                    style={{ minWidth: '100px' }}
                                >
                                    Description
                                </TableCell>
                                <TableCell
                                    align='left'
                                    style={{ minWidth: '100px' }}
                                >
                                    Requested By
                                </TableCell>
                                <TableCell
                                    align='left'
                                    style={{ minWidth: '100px' }}
                                >
                                    Priority
                                </TableCell>
                                <TableCell
                                    align='left'
                                    style={{ minWidth: '100px' }}
                                >
                                    Assignee To
                                </TableCell>
                                <TableCell
                                    align='left'
                                    style={{ minWidth: '100px' }}
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    align='left'
                                    style={{ minWidth: '100px' }}
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows && rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>

                                            <TableCell align='left'>
                                                {row.ticketId}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.title}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.description}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.requestedBy}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.priority}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.assignedTo}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.status}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Stack spacing={2} direction="row">
                                                    <EditIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            color: "blue",
                                                            cursor: "pointer",
                                                        }}
                                                        className="cursor-pointer"
                                                    onClick={() => editTicket(row.ticketId)}
                                                    />
                                                    <DeleteIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            color: "darkred",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            deleteUser(row.id, row.userid);
                                                        }}
                                                    />
                                                </Stack>
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}