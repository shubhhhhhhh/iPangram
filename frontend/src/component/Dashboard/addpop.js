import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addEmployee, getUnassignEmployee } from '../../api/Api';


export default function AddPop(props) {
    const [show, setShow] = useState(true);
    const handleClose = () => handleCancel();
    const [form, setForm] = useState();     //  state for data to send for updation
    const [data, setData] = useState();     // state for unassigned employees 
    const [oneData,setOneData] = useState(props.onedata)    //state for setting department from parent component eg.facebook

    useEffect(() => {
        getUnassignEmployee().then(res => {
            // console.log(res.body)
            setData([...res.body])
        })
    }, [])

    // useEffect(()=>{
    //     console.log(oneData)
    // },[oneData])

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    // useEffect(()=>{
    //     console.log(form)
    // },[form])

    const addemployee = async () => {
        try {
                var a = form
                form.department = oneData
                await addEmployee(form)
                .then(res => {
                    alert(res.message);
                    console.log(res.message)
                })
        }
        catch (error) {
            alert("error hua bhai")
        }
    }

    async function handleSubmit() {
        await addemployee()
        await props.getallemployee()
        handleClose()
    }

    function handleCancel() {
        props.addui()
    }
    let addEmp;
    if(data && data.length == 0 )addEmp=<option >add more employees by sign up</option>

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>add employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Select
                                aria-label="Default select example"
                                onChange={handleChange}
                                name="emplyId"
                            >
                                <option>select any employee</option>
                                {
                                    data && data.map((ele, ind) => {
                                        return (
                                            <option value={ele.empId}>{ele.empId}</option>
                                        )
                                    })
                                }
                                {addEmp}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Select
                                aria-label="Default select example"
                                onChange={handleChange}
                                name="category"
                            >
                                <option>select any category</option>
                                <option value={"it"}>IT</option>
                                <option value={"hr"}>HR</option>
                                <option value={"sales"}>sales</option>
                                <option value={"products"}>products</option>
                                <option value={"marketing"}>marketing</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Select
                                aria-label="Default select example"
                                onChange={handleChange}
                                name="location"
                            >
                                <option>select any location</option>
                                <option value={"amreli"}>amreli</option>
                                <option value={"anand"}>anand</option>
                                <option value={"surat"}>surat</option>
                                <option value={"vadodra"}>vadodra</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="text" onChange={handleChange} name="salary" placeholder="enter salary" />
                        </Form.Group>

                        <Button variant="primary" onClick={handleSubmit} className="add" style={{ width: '8rem' }} >
                            add
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
