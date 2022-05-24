import { React, useState, useEffect } from 'react';
import { Table, TableContainer, TableBody, TableHead, TableRow, TableCell, Paper, Box, Container, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';

import axios from 'axios';

const Clients = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [data, setData] = useState();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        const data = axios.get('https://localhost:44359/Clients').then((response) => {
            setData(response.data);
        })
    }, [showCreateForm, data, showEditForm]);

    const deleteClienthandler = (clientId) => {
        const response = axios.delete(`https://localhost:44359/Clients/${clientId}`).then(() => {
        });
    }

    const createFormHandler = () => {
        setShowCreateForm(!showCreateForm);
        setValue("name", "");
        setValue("surname", "");
        setValue("passport", "");
    }

    const editFormHandler = (client) => {
        setShowEditForm(client.id);
        setValue("id", client.id);
        setValue("name", client.name);
        setValue("surname", client.surname);
        setValue("passport", client.passport);
    }

    const createClient = (data) => {
        console.log(data);
        axios.post('https://localhost:44359/Clients', data).then(() => {
            setShowCreateForm(!showCreateForm);
        })
    }

    const updateClient = (data) => {
        console.log(data);
        axios.put(`https://localhost:44359/Clients/`, data).then(() => {
            setShowEditForm(false);
        })
    }

    return (
        <Box sx={{ padding: '70px 10px' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: "center", marginBottom: '20px' }}>
                    <button className='create-btn' onClick={createFormHandler}>
                        <AddIcon />
                    </button>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Surname</TableCell>
                                <TableCell align="center">Passport</TableCell>
                                <TableCell align="center">Edit</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        {showCreateForm ? (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left"></TableCell>
                                <TableCell align="center"><TextField id="standard-basic" variant="standard" defaultValue="" {...register("name")} /></TableCell>
                                <TableCell align="center"> <TextField id="standard-basic" variant="standard" defaultValue="" {...register("surname")} /></TableCell>
                                <TableCell align="center"> <TextField id="standard-basic" variant="standard" defaultValue="" {...register("passport")} /></TableCell>
                                <TableCell align="center"><button onClick={handleSubmit(createClient)}><CheckIcon /></button></TableCell>
                                <TableCell align="center"><button onClick={createFormHandler}><CloseIcon /></button></TableCell>
                            </TableRow>
                        ) : (<div></div>)}
                        <TableBody>
                            {data?.map((client => (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">
                                        {client.id == showEditForm ?
                                            (<TextField id="standard-basic" variant="standard" defaultValue={client.id} {...register("id")} />) :
                                            (client.id)
                                        }
                                    </TableCell>
                                    <TableCell align="center">
                                        {client.id == showEditForm ?
                                            (<TextField id="standard-basic" variant="standard" defaultValue={client.name} {...register("name")} />) :
                                            (client.name)
                                        }
                                    </TableCell>
                                    <TableCell align="center">
                                        {client.id == showEditForm ?
                                            (<TextField id="standard-basic" variant="standard" defaultValue={client.surname} {...register("surname")} />) :
                                            (client.surname)
                                        }
                                    </TableCell>
                                    <TableCell align="center">
                                        {client.id == showEditForm ?
                                            (<TextField id="standard-basic" variant="standard" defaultValue={client.passport} {...register("passport")} />) :
                                            (client.passport)
                                        }
                                    </TableCell>
                                    <TableCell align="center">
                                        {client.id == showEditForm ?
                                            (<button onClick={handleSubmit(updateClient)}><CheckIcon /></button>) :
                                            (<button onClick={() => (editFormHandler(client))}><EditIcon /></button>)
                                        }
                                    </TableCell>
                                    <TableCell align="center">
                                        {client.id == showEditForm ?
                                            (<button onClick={() => (setShowEditForm(false))}><CloseIcon /></button>) :
                                            (<button onClick={() => deleteClienthandler(client.id)}><DeleteIcon /></button>)
                                        }
                                    </TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    )
}

export default Clients;