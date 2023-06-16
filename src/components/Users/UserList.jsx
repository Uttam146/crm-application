import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableContainer, TableCell, Typography } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
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
import { fetchAllUsers, deleteUserById } from "../../api/usersApi";
import Modal from '@mui/material/Modal';
import AddUser from './AddUser';
import EditUser from './EditUser';
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
    p: 4
};


export default function UserList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const handleEdit = () => setEdit(true);
    const handleEditClose = () => setEdit(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [editData, setEditData] = useState({ id: '' });
    const localstorage = useLocalStorage();

    useEffect(() => {
        getUsers();
    }, []);
    const getUsers = async () => {
        fetchAllUsers(localstorage.userType)
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
                getUsers();
            })
            .catch((err) => {
                Swal.fire("ERROR!", `OOPS Something went wrong`, "warning");
                console.log(err);
            })
    };
    const editUser = async (id) => {
        setEditData(id);
        handleEdit();
    };

    const filterData = (v) => {
        if (v) {
            setRows([v]);
        } else {
            setRows([]);
            getUsers();
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
                        <AddUser closeEvent={handleClose} getUsers={getUsers} />
                    </Box>
                </Modal>
                <Modal
                    open={edit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <EditUser closeEvent={handleEditClose} getUsers={getUsers} editData={editData} />
                    </Box>
                </Modal>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AddUser closeEvent={handleClose} getUsers={getUsers} />
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
                    Users List
                </Typography>
                <Divider />
                <Box height={10} />
                <Stack direction="row" spacing={2} className="my-2 mb-2 mx-4">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={rows}
                        sx={{ width: 300 }}
                        onChange={(e, v) => filterData(v)}
                        getOptionLabel={(rows) => rows.userid || ""}
                        renderInput={(params) => (
                            <TextField {...params} size="small" label="Search UserId" />
                        )}
                    />

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    ></Typography>
                    {
                        localstorage.userType === userType.customer && <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
                            Add
                        </Button>
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
                                    Name
                                </TableCell>
                                <TableCell
                                    align='left'
                                    style={{ minWidth: '100px' }}
                                >
                                    Email Id
                                </TableCell>
                                <TableCell
                                    align='left'
                                    style={{ minWidth: '100px' }}
                                >
                                    UserType
                                </TableCell>
                                <TableCell
                                    align='left'
                                    style={{ minWidth: '100px' }}
                                >
                                    UserStatus
                                </TableCell>
                                <TableCell
                                    align='left'
                                    style={{ minWidth: '100px' }}
                                >
                                    Created At
                                </TableCell>
                                {
                                    localstorage.userType !== userType.customer ?
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
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>

                                            <TableCell align='left'>
                                                {row.userid}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.email}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.usertype}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.userstatus}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.createdat}
                                            </TableCell>
                                            {
                                                localstorage.userType !== userType.customer ?
                                                    <TableCell align="left">
                                                        <Stack spacing={2} direction="row">
                                                            <EditIcon
                                                                style={{
                                                                    fontSize: "20px",
                                                                    color: "blue",
                                                                    cursor: "pointer",
                                                                }}
                                                                className="cursor-pointer"
                                                                onClick={() => editUser(row.id)}
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
                                                    </TableCell> : null
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