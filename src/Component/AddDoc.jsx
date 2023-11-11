import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IconButton, TextField } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {addDoc,collection} from 'firebase/firestore';
import { db } from '../config/firebase';

function AddDoc({showButton}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [doctitile, setdoctitile] = useState('');
    const CollectionRef = collection(db, "edocuments")
    // POST METHOD
    const postDocData = async () => {
        await addDoc(CollectionRef, {
            title: doctitile
        })
        handleClose()
        window.location.reload();
    };

    return (
        <>
            <IconButton onClick={handleShow} aria-label="add" size="large">
               {showButton?<PostAddIcon style={{ fontSize: '40px' }} /> : <PostAddIcon className='text-white' style={{ fontSize: '40px' }} />} 
            </IconButton>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Docs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TextField
                        id="filled-search"
                        label="AddDocs"
                        type="text"
                        variant="filled"
                        fullWidth='100%'
                        onChange={(e)=>setdoctitile(e.target.value)}
                        InputProps={{
                            style: { backgroundColor: 'white' } // Set the text color to red
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={()=>postDocData()}>Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddDoc;