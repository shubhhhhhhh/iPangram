import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { updateEmployee } from '../../api/Api';

export default function UpdatePop(props) {

    const [show, setShow] = useState(true);
    const handleClose = () => handleCancel();
    const [form, setForm] = useState({ ...props.onedata });

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    // useEffect(()=>{
    //     console.log(form)
    // },[form])
    function handleCancel() {
        props.updateui()
    }

    async function handleUpdate() {
        await updateEmployee(form).then(res => console.log(res))
        await props.getallemployee()
        handleClose()

    }

    return (
        <>
            <Modal dialogClassName="modal-90w" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>update employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Select
                                aria-label="Default select example"
                                onChange={handleChange}
                                name="department"
                            >
                                <option>select department</option>
                                <option value="facebook">facebook</option>
                                <option value="google">google</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Select
                                aria-label="Default select example"
                                onChange={handleChange}
                                name="category"
                            >
                                <option>select category</option>
                                <option value="it">IT</option>
                                <option value="hr">HR</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Select
                                    aria-label="Default select example"
                                    onChange={handleChange}
                                    name="location"
                                >
                                    <option>select location</option>
                                    <option value="anand">anand</option>
                                    <option value="amreti">amreti</option>
                                    <option value="surat">surat</option>
                                    <option value="vadodra">vadodra</option>
                                </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="text" onChange={handleChange} name="salary" placeholder=" enter salary" value={form.salary} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="text" readOnly={true}  name="emplyId"  value={form.emplyId} />
                        </Form.Group>

                        <Button variant="primary" onClick={handleUpdate} className="add" style={{ width: '8rem' }} >
                            update
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
