import { Form, InputGroup, Navbar, Table, Nav, Button, Row, Col, Container } from "react-bootstrap";
import React, { Component, useEffect, useState } from "react";
import './Dashboard/dashboard.css'
import { getAllEmployee, getEmployeeByCatgry ,getSingleEmployee} from "../api/Api";
import { getToken } from "../constant/Constant";
import AddPop from "./Dashboard/addpop";
import UpdatePop from "./Dashboard/updatepop";
import DeletePop from "./Dashboard/deletepop";
import ViewPop from "./Dashboard/viewpop";
import Auth from "../auth/auth"

export default function AdminDashboard() {
    const [form, setForm] = useState();
    const [data, setData] = useState();
    const [onedata, setOnedata] = useState({});

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(form)
        const response = await getEmployeeByCatgry(form)
        // const body = response.body.sort((a,b)=>{

        // })
        const body = response.body
        if (response.status == "success")
            setData(body)
        console.log(response)
    }

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const [viewbtn, setviewbtn] = useState(false);
    let viewui;
    async function view(event) {
        const newData = await getSingleEmployee(data[event.target.value].emplyId)
        console.log(newData.body)
        setOnedata({ ...newData.body[0] })
        viewUI()
    }
    function viewUI() {
        viewbtn ? setviewbtn(false) : setviewbtn(true)
    }
    if (viewbtn == true) {
        viewui = <Auth><ViewPop onedata={onedata} viewui={viewUI} /></Auth>
        console.log(onedata)
    }


    return (
        <>
            <Container>
                <Row>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={handleChange}
                                    name="category"
                                >
                                    <option>select category</option>
                                    <option value={"it"}>IT</option>
                                    <option value={"hr"}>HR</option>
                                    <option value={"sales"}>sales</option>
                                    <option value={"products"}>products</option>
                                    <option value={"marketing"}>marketing</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Control placeholder="type location" name="location" onChange={handleChange} />
                            </Col>
                        </Row>
                        <Row className="justify-content-center mt-2">
                            <Button
                                variant="primary"
                                onClick={handleSubmit}
                                className="login"
                                style={{ width: '23rem' }}
                            >
                                search
                            </Button>
                        </Row>
                    </Form>
                </Row>
                {data &&
                    <Row className="justify-content-center">
                        <Col xs={12} md={8} className="justify-content-center">
                            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                <Container>
                                    <Navbar.Brand href="#home">Employee Dashboard</Navbar.Brand>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                </Container>
                            </Navbar>

                            <Navbar>
                                <Container>
                                    <Table striped="columns">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>DEPARTMENT</th>
                                                <th>CATEGORY</th>
                                                <th>LOCATION</th>
                                                <th>SALARY</th>
                                                <th>EMPLOYEE ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((v, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td >{i + 1}</td>
                                                        <td>{v.department}</td>
                                                        <td>{v.category}</td>
                                                        <td>{v.location}</td>
                                                        <td>{v.salary}</td>
                                                        <td>{v.emplyId}</td>
                                                        <td><button value={i} onClick={view}>@</button></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </Container>
                            </Navbar>
                        </Col>
                    </Row>}
            </Container>
            {viewui}
        </>
    )
}