import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { TextField, IconButton } from '@mui/material';
import AddDoc from './AddDoc';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ShowDocs from './ShowDocs';
import '../Component/Docs.css';

function Docs() {
    const [showButton, setShowButton] = useState(true);
    const [bgColor, setBgColor] = useState('white');


    return (
        <div className={`vh-100 ${bgColor}`}>
            <Container className='p-5'>
                <Row>
                    <Col lg={10} md={10} xs={8}>
                        <TextField
                            id="filled-search"
                            label="Search Docs"
                            type="search"
                            variant="filled"
                            fullWidth='100%'
                            InputProps={{
                                style: { backgroundColor: 'white' } // Set the text color to red
                            }}
                        />
                    </Col>
                    <Col lg={1} md={1} xs={2} className='d-flex justify-content-center align-items-center'>
                        <AddDoc showButton={showButton} />
                    </Col>
                    <Col lg={1} md={1} xs={2} className='d-flex justify-content-center align-items-center'>
                        {
                            showButton ? <IconButton  onClick={() => {setShowButton();setBgColor('bgdark');}} aria-label="add" size="large" className='d-flex justify-content-center align-items-center'>
                                <DarkModeIcon style={{ fontSize: '30px'}} />
                            </IconButton> : <IconButton onClick={() => { setShowButton(true); setBgColor('white'); }} aria-label="add" size="large" className='d-flex justify-content-center align-items-center'>
                                <LightModeIcon className='text-white' style={{ fontSize: '30px' }} />
                            </IconButton>
                        }

                    </Col>
                </Row>
                <Row className='pt-5 w-100'>
                    <ShowDocs />
                </Row>
            </Container>
        </div>
    );
}

export default Docs;
