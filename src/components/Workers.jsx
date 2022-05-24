import { React, useState, useEffect } from 'react';
import { Table, TableContainer, TableBody, TableHead, TableRow, TableCell, Paper, Box, Container, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';

import axios from 'axios';

const Workers = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [data, setData] = useState();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        const data = axios.get('https://localhost:44359/Workers').then((response) => {
            setData(response.data);
        })
    }, [showEditForm, data]);

    const deleteWorkerHandler = (workerId) => {
        const response = axios.delete(`https://localhost:44359/Workers/${workerId}`).then(() => {
        });
    }

    const createFormHandler = () => {
        setShowCreateForm(!showCreateForm);
        setValue("name", "");
        setValue("surname", "");
        setValue("position", "");
    }

    const editFormHandler = (worker) => {
        setShowEditForm(worker.id);
        setValue("id", worker.id);
        setValue("name", worker.name);
        setValue("surname", worker.surname);
        setValue("position", worker.position);
    }

    const createWorker = (data) => {
        console.log(data);
        axios.post('https://localhost:44359/Workers', data).then(() => {
            setShowCreateForm(!showCreateForm);
        })
    }

    const updateWorker = (data) => {
        console.log(data);
        axios.put(`https://localhost:44359/Workers/`, data).then(() => {
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
                                <TableCell align="center">Position</TableCell>
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
                                <TableCell align="center"> <TextField id="standard-basic" variant="standard" defaultValue="" {...register("position")} /></TableCell>
                                <TableCell align="center"><button onClick={handleSubmit(createWorker)}><CheckIcon /></button></TableCell>
                                <TableCell align="center"><button onClick={createFormHandler}><CloseIcon /></button></TableCell>
                            </TableRow>
                        ) : (<div></div>)}
                        <TableBody>
                            {data?.map((worker => (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{worker.id === showEditForm ? (<TextField disabled id="standard-basic" variant="standard" defaultValue={worker.id} {...register("id")} />) : (worker.id)}</TableCell>
                                    <TableCell align="center">{worker.id === showEditForm ? (<TextField id="standard-basic" variant="standard" defaultValue={worker.name} {...register("name")} />) : (worker.name)}</TableCell>
                                    <TableCell align="center">{worker.id === showEditForm ? (<TextField id="standard-basic" variant="standard" defaultValue={worker.surname} {...register("surname")} />) : (worker.surname)}</TableCell>
                                    <TableCell align="center">{worker.id === showEditForm ? (<TextField id="standard-basic" variant="standard" defaultValue={worker.position} {...register("position")} />) : (worker.position)}</TableCell>
                                    <TableCell align="center">{worker.id === showEditForm ? (<button onClick={handleSubmit(updateWorker)}><CheckIcon /></button>) : (<button onClick={() => (editFormHandler(worker))}><EditIcon /></button>)}</TableCell>
                                    <TableCell align="center">{worker.id === showEditForm ? (<button onClick={() => (setShowEditForm(false))}><CloseIcon /></button>) : (<button onClick={() => deleteWorkerHandler(worker.id)}><DeleteIcon /></button>)}</TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    )
}

export default Workers;