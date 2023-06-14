import React from "react";
import "./css/login.css";
import 'react-toastify/dist/ReactToastify.css';
import { Container, Navbar, Button, Form, Card, } from "react-bootstrap";
import { login } from "../api/Api";
import { ToastContainer, toast } from 'react-toastify';
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "../component/Dashboard/Dashboard";
import SetToken from "../constant/Constant";
import { MainContext } from "../context/Context";

export default function Login() {
    const [form, setForm] = useState();
    const navigate = useNavigate();

    const { setid } = useContext(MainContext)

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(form)
        const response = await login(form)
        console.log(response)
        if (response.status == "success") {
            toast("login done");
            SetToken(response)
            sessionStorage.setItem("idinfo", JSON.stringify(response.body.id))
            setid(JSON.parse(sessionStorage.getItem("idinfo")))
            if (response.body.id.startsWith("M"))
                setTimeout(() => {
                    navigate("admin/dashboard")
                }, 1000)
            else if (response.body.id.startsWith("E"))
                setTimeout(() => {
                    navigate("emp/dashboard")
                }, 1000)
        }
        else {
            toast.error(response.message)
        }

        return response.data;
    }

    return (
        <>
            <Container className="px-2 ">
                <Card border="secondary" style={{ width: '25rem' }} className="card mt-5">
                    <Card.Body>

                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" name="email" onChange={handleChange} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" name="password" onChange={handleChange} placeholder="Password" />
                            </Form.Group>

                            <Button variant="primary" onClick={handleSubmit} className="login" style={{ width: '23rem' }}>
                                Login
                            </Button>

                            <div style={{ width: "23rem" }} className="br"></div>

                            <Link to={"signup"} ><Button variant="secondary" className="signup">signup</Button></Link>

                        </Form>

                    </Card.Body>
                </Card>
            </Container>

            <ToastContainer />
        </>
    )
}