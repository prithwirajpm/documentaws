import React, { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, Button, IconButton, TextField } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { Link } from 'react-router-dom';
import { db } from '../config/firebase';
import { getDocs, collection,deleteDoc,doc,updateDoc,getDoc } from 'firebase/firestore';
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

// ... (your imports)

// ... (your imports)

export default function ShowDocs() {
    const [docsList, setdocsList] = useState([]);
    const [editingId, setEditingId] = useState(null);
  
    const CollectionRef = collection(db, "edocuments");
  
    // Get Method
    const getDocslList = async () => {
      const data = await getDocs(CollectionRef);
  
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
  
      setdocsList(filteredData);
    };
  
    // Delete Docs
    const deleteDocument = async (id) => {
      const channelDoc = doc(db, "edocuments", id);
      await deleteDoc(channelDoc)
        .then(() => {
          // Document deleted successfully, now update the channel list
          getDocslList();
        })
        .catch((error) => {
          console.error('Error deleting document: ', error);
        });
      alert("Are you sure delete the file");
    };
  
    // Edit this page
    const updateChannel = async (id, title) => {
      const channelDoc = doc(db, "edocuments", id);
      await updateDoc(channelDoc, {
        title: title,
      });
      getDocslList();
      setEditingId(null); // Exit edit mode
    };
  
    const enterEditMode = (id) => {
      setEditingId(id);
    };
  
    useEffect(() => {
      getDocslList();
    }, []);
  
    return (
      <Row className='w-100'>
        {docsList.map((item) => (
          <Col lg={4} key={item.id}>
            <Card sx={{ minWidth: 300 }} className='m-3'>
              <CardContent>
                <Row>
                  <Col lg={8} md={8} xs={8}>
                    {editingId === item.id ? (
                      <TextField
                        id="filled-search"
                        type="text"
                        variant="filled"
                        fullWidth='100%'
                        value={item.title}
                        InputProps={{
                          style: { backgroundColor: 'white' }
                        }}
                        onChange={(e) => setdocsList((prevDocs) => prevDocs.map(doc => doc.id === item.id ? { ...doc, title: e.target.value } : doc))}
                      />
                    ) : (
                      <TextField
                        id="filled-search"
                        type="text"
                        variant="filled"
                        fullWidth='100%'
                        value={item.title}
                        InputProps={{
                          style: { backgroundColor: 'white' }
                        }}
                        readOnly
                      />
                    )}
                  </Col>
                  <Col lg={2} md={2} xs={2}>
                    <IconButton
                      onClick={() => (editingId === item.id ? updateChannel(item.id, item.title) : enterEditMode(item.id))}
                      aria-label="add"
                      size="large"
                      className='d-flex justify-content-center align-items-center'
                    >
                      {editingId === item.id ? <DoneIcon /> : <EditNoteIcon />}
                    </IconButton>
                  </Col>
                  <Col lg={2} md={2} xs={2}>
                    <IconButton
                      onClick={() => deleteDocument(item.id)}
                      aria-label="delete"
                      size="large"
                      className='d-flex justify-content-center align-items-center'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Col>
                </Row>
                <Link to={`/documents/${item.id}`} className='text-decoration-none text-dark'>
                  <div><p>{item.docbody}.....</p></div>
                </Link>
              </CardContent>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
  