import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Container, Navbar } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
 
export default function ViewPop(props) {

    const [show, setShow] = useState(true); 
    const handleClose = () => handleCancel();  
    const [form, setForm] = useState([props.onedata]);
    console.log(form)
    function handleCancel() {
        props.viewui()
    }
  
    return (
      <>
        <Modal  size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>view employee detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Navbar>
                <Container className="sTable" style={{ width: "100%", marginBottom: "0.5rem", overflowY: "scroll", overflowX: "scroll", }}>
                    <Table striped bordered variant="dark" hover responsive="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>DEPARTMENT</th>
                                <th>CATEGORY</th>
                                <th>LOCATION</th>
                                <th>SALARY</th>
                                <th>EMPLOYEE ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ROLE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {form.map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{v.department}</td>
                                        <td>{v.category}</td>
                                        <td>{v.location}</td>
                                        <td>{v.salary}</td>
                                        <td>{v.emplyId}</td>
                                        <td>{v.personalData.firstName+v.personalData.lastName}</td>
                                        <td>{v.personalData.email}</td>
                                        <td>{v.personalData.role}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Container>
            </Navbar>
          </Modal.Body>
        </Modal>
      </>
    );
}