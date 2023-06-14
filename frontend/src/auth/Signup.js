import { signup } from "../api/Api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card, } from "react-bootstrap";
import "./css/signup.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
    const [form, setForm] = useState();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        // console.log(form)
        const response = await signup(form)
        console.log(response)
        if (response.status == "success") {
            toast("signup succssfully");
            setTimeout(() => {
                navigate("/")
            }, 2000)
        }
        else {
            toast.error(response.message.message)
        }
    }
    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    return (
        <>
            <ToastContainer />
            <Card border="secondary" style={{ width: '25rem' }} className="card">
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="text" onChange={handleChange} name="firstName" placeholder=" enter first name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="text" onChange={handleChange} name="lastName" placeholder=" enter last name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Select
                                aria-label="Default select example"
                                onChange={handleChange}
                                name="gender"
                            >
                                <option>select gender</option>
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="other">other</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="text" onChange={handleChange} name="hobbies" placeholder=" enter any hobbies" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" onChange={handleChange} name="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Select
                                aria-label="Default select example"
                                onChange={handleChange}
                                name="role"
                            >
                                <option>select role</option>
                                <option value="employee">employee</option>
                                <option value="manager">manager</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" onChange={handleChange} name="password" placeholder=" enterPassword" />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSubmit} className="login" style={{ width: '23rem' }} >
                            create account
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}