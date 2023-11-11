import React, { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, Button, IconButton, TextField } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function ShowDocs() {
    const [docsList, setdocsList] = useState([]);
    const CollectionRef = collection(db, "edocuments")

    // Get Method
    const getDocslList = async () => {

        const data = await getDocs(CollectionRef)

        const filteredData = data.docs.map((doc) => (
            {
                ...doc.data(),

                id: doc.id
            }

        ))
        setdocsList(filteredData);
    }

    useEffect(() => {
        getDocslList()
    }, [])
    return (
        <Row className='w-100'>
            {
                docsList.map((item) => (
                    <Col lg={4}>

                        <Card sx={{ minWidth: 275 }} key={item.id} className='m-3'>
                            <CardContent>
                                <Row>
                                    <Col lg={8}>
                                        <TextField
                                            id="filled-search"
                                            label="AddDocs"
                                            type="text"
                                            variant="filled"
                                            fullWidth='100%'
                                            value={item.title}
                                            InputProps={{
                                                style: { backgroundColor: 'white' } // Set the text color to red
                                            }}
                                        />
                                    </Col>
                                    <Col lg={2}>
                                        <IconButton aria-label="add" size="large" className='d-flex justify-content-center align-items-center'>
                                            <EditNoteIcon />
                                        </IconButton>
                                    </Col>
                                    <Col lg={2}>
                                        <IconButton aria-label="add" size="large" className='d-flex justify-content-center align-items-center'>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Col>
                                </Row>
                                <Link to={'/documents/:id'} className='text-decoration-none text-dark'>
                                    <div><p>{item.docbody}</p></div>
                                </Link>
                            </CardContent>
                        </Card>

                    </Col>

                ))
            }

        </Row>
    );
}