import React, { Component, useEffect, useState } from "react";
import { Container, Navbar, Col, Row } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './dashboard.css'
import { getAllEmployee } from "../../api/Api";
import { getToken } from "../../constant/Constant";
import AddPop from "./addpop";
import UpdatePop from "./updatepop";
import DeletePop from "./deletepop";
import ViewPop from "./viewpop";
import Auth from "../../auth/auth"

export default function Dashboard(props) {

    const [data, setData] = useState([{ name: 'a', phone: 1 }, { name: 'r', phone: 3 }, { name: 'w', phone: 2 }])
    const [onedata, setOnedata] = useState({});

    async function getallemployee() {
        await getAllEmployee(getToken()).then(res => setData([...res.body]))
    }

    // useEffect(() => {
    //     getallemployee()
    // }, [])


    const [addbtn, setaddbtn] = useState(false);
    let addui;
    function addUI() {
        addbtn ? setaddbtn(false) : setaddbtn(true)
    }
    if (addbtn == true)
        addui = <Auth><AddPop addui={addUI} getallemployee={getallemployee} /></Auth>



    const [deletebtn, setdeletebtn] = useState(false)
    let deleteui;
    function deldata(event) {
        setOnedata(data[event.target.value])
        //console.log(onedata)
        deleteUI()
    }
    function deleteUI() {
        deletebtn ? setdeletebtn(false) : setdeletebtn(true)
    }
    if (deletebtn) {
        deleteui = <Auth><DeletePop onedata={onedata} deleteui={deleteUI} getallemployee={getallemployee} /></Auth>
    }


    const [updatebtn, setupdatebtn] = useState(false);
    let updateui;
    function update(event) {
        setOnedata(data[event.target.value])
        //console.log(onedata)
        updateUI()
    }
    function updateUI() {
        updatebtn ? setupdatebtn(false) : setupdatebtn(true)
    }
    if (updatebtn == true)
        updateui = <Auth><UpdatePop onedata={onedata} updateui={updateUI} getallemployee={getallemployee} /></Auth>



    const [viewbtn, setviewbtn] = useState(false);
    let viewui;
     function view(event) {
         data[event.target.value].serial = event.target.value
        //console.log(data[event.target.value])
        setOnedata({...data[event.target.value]})
        viewUI()
    }
    function viewUI() {
        viewbtn ? setviewbtn(false) : setviewbtn(true)
    }
    if (viewbtn == true){
        viewui = <Auth><ViewPop onedata={onedata}  viewui={viewUI} /></Auth>
        console.log(onedata)
    }
        


    return (
        <>

            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={8} className="justify-content-center">
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Container>
                                <Navbar.Brand href="#home">Employee Dashboard</Navbar.Brand>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="addbtn">
                                        <Button variant="secondary" onClick={addUI}>Add Employee</Button>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>

                        <Navbar>
                            <Container>
                                <Table striped="columns">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>email</th>
                                            <th>phone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((v, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td >{i + 1}</td>
                                                    <td>{v.name}</td>
                                                    <td>{v.email}</td>
                                                    <td>{v.phone_no}</td>
                                                    <td><button value={i} onClick={update}>+</button></td>
                                                    <td><button value={i} onClick={deldata}>-</button></td>
                                                    <td><button value={i} onClick={view}>@</button></td>
                                                </tr>
                                            )
                                        })}
                                        {/* {[<tr><td>hello</td></tr>]}   array get processed itself within fragmentation and runs */}
                                    </tbody>
                                </Table>
                            </Container>
                        </Navbar>
                    </Col>
                </Row>
            </Container>


            {addui}
            {updateui}
            {deleteui}
            {viewui}
        </>
    )
}

