import React from 'react'
import { Container } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function ReactQuile() {
  return (
    <div className='vh-100'>
        <Container className='p-5'>
            <ReactQuill  />
        </Container>
    </div>
  )
}

export default ReactQuile