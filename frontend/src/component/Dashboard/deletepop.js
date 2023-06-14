import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { deleteEmployee } from '../../api/Api';

export default function DeletePop(props) {
    const [form, setForm] = useState({...props.onedata});

    const [show, setShow] = useState(true); 
    const handleClose = () => handleCancel();  

    function handleCancel() {
        props.deleteui()
    }

    async function handleDelete(){
      console.log(form)
         await deleteEmployee(form.emplyId)
         await props.getallemployee()
         handleClose()
    }
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>delete employee's details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Label>are you sure to delete this employee's details?</Form.Label>
                        
                        <Button variant="primary" onClick={handleDelete} className="add" style={{ width: '8rem' }} >
                          delete
                        </Button>

                        <Button variant="primary" onClick={handleCancel} className="cancel" style={{ width: '8rem' }} >
                            cancel
                        </Button>

                    </Form>
          </Modal.Body>
        </Modal>
      </>
    );
}
