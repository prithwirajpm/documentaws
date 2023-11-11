import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function stripHTMLTags(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

function ReactQuile() {
  const { id } = useParams();
  const [docBody, setDocBody] = useState('');
  const quillRef = useRef(null);

  // Fetch the document body based on the id
  const fetchDocBody = async () => {
    try {
      const docRef = doc(db, 'edocuments', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { docbody } = docSnap.data();
        setDocBody(docbody);
      } else {
        console.log('Document does not exist!');
      }
    } catch (error) {
      console.error('Error fetching document body:', error);
    }
  };

  // Update the document body in the database when it changes
  const handleDocBodyChange = async (value, delta, source) => {
    try {
      if (source === 'user') {
        const sanitizedValue = stripHTMLTags(value);
        const docRef = doc(db, 'edocuments', id);
        await updateDoc(docRef, {
          docbody: sanitizedValue,
        });
        setDocBody(sanitizedValue);
      }
    } catch (error) {
      console.error('Error updating document body:', error);
    }
  };

  useEffect(() => {
    // Call the function to fetch document body when the component mounts or when the id changes
    fetchDocBody();
  }, [id]);

  useEffect(() => {
    // Focus on the editor when the component mounts
    if (quillRef.current) {
      quillRef.current.focus();
    }
  }, [quillRef]);

  return (
    <div className='vh-100'>
      <Container className='p-5'>
        <ReactQuill className='bg-body-secondary' ref={quillRef} value={docBody} onChange={handleDocBodyChange} />
      </Container>
    </div>
  );
}

export default ReactQuile;
