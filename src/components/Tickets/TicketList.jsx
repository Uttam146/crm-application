import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
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
import { deleteTicket } from '../../api/ticketApi';
import Modal from '@mui/material/Modal';
import AddTicket from './AddTicket';
import EditTicket from './EditTicket';
import useFetchTickets from '../../customHook/useFetchTickets';
import useLocalStorage from '../../customHook/useLocalStorage';
import { userType } from '../../constants/constant';


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
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const handleEdit = () => setEdit(true);
    const handleEditClose = () => setEdit(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [editData, setEditData] = useState({ ticketId: '' });
    const [ticketDetails, setTicketDetails, fetchTickets] = useFetchTickets();
    const localStorage = useLocalStorage();


    const deleteTickets = (id) => {
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
                deleteApi(id);
            }
        });
    };

    const deleteApi = async (id) => {
        deleteTicket(id, localStorage.accessToken)
            .then((res) => {
                Swal.fire("Deleted!", `Ticket ${id} has been deleted.`, "success");
                fetchTickets();
            })
            .catch((err) => {
                Swal.fire("ERROR!", `OOPS Something went wrong`, "warning");
                console.log(err);
            })
    };

    const editTicket = async (id) => {
        setEditData({ ticketId: id });
        handleEdit();
    };

    const filterData = (v) => {
        if (v) {
            setTicketDetails([v]);
        } else {
            setTicketDetails([]);
            fetchTickets();
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
                        <AddTicket closeEvent={handleClose} getTicket={fetchTickets} />
                    </Box>
                </Modal>
                <Modal
                    open={edit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <EditTicket closeEvent={handleEditClose} getTicket={fetchTickets} editData={editData} />
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
                <Stack direction="row" spacing={2} className="my-2 mb-2 mx-4">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={ticketDetails}
                        sx={{ width: 300 }}
                        onChange={(e, v) => filterData(v)}
                        getOptionLabel={(ticketDetails) => ticketDetails.ticketId || ""}
                        renderInput={(params) => (
                            <TextField {...params} size="small" label="Search TicketId" />
                        )}
                    />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    ></Typography>
                    {localStorage.userType === userType.customer ?
                        <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
                            Add
                        </Button> : null
                    }
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
                                {localStorage.userType !== userType.customer ?
                                    <TableCell
                                        align='left'
                                        style={{ minWidth: '100px' }}
                                    >
                                        Action
                                    </TableCell> : null
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ticketDetails && ticketDetails
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
                                            {
                                                localStorage.userType !== userType.customer ?
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
                                                                    deleteTickets(row.ticketId);
                                                                }}
                                                            />
                                                        </Stack>
                                                    </TableCell>
                                                    : null
                                            }

                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={ticketDetails.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}