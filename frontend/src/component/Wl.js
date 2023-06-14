import React, { useEffect, useState } from "react";
import { Container, Navbar, Col, Row } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './Dashboard/dashboard.css'
import AddPop from "./Dashboard/addpop";
import UpdatePop from "./Dashboard/updatepop";
import DeletePop from "./Dashboard/deletepop";
import ViewPop from "./Dashboard/viewpop";
import Auth from "../auth/auth"
import { getEmployeeByDept, getSingleEmployee } from "../api/Api";
import { useLocation } from "react-router-dom";

export default function Wl() {

    const [data, setData] = useState()
    const [onedata, setOnedata] = useState();
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState()

    async function getallemployee() {
        await getEmployeeByDept({ department: loca, currPage: page }).then(res => {
            console.log(res)
            setTotalPage(res.totalPage)
            setData(res.body)
        })
    }

    useEffect(() => {
        getallemployee()
    }, [page])

    useEffect(() => {
        getallemployee()
    }, [])


    const [addbtn, setaddbtn] = useState(false);
    let addui;
    function add() {
        setOnedata(loca)
        //console.log(onedata)
        addUI()
    }
    function addUI() {
        addbtn ? setaddbtn(false) : setaddbtn(true)
    }
    if (addbtn == true)
        addui = <Auth><AddPop addui={addUI} onedata={onedata} getallemployee={getallemployee} /></Auth>



    const [deletebtn, setdeletebtn] = useState(false)
    let deleteui;
    function deldata(event) {
        setOnedata(data[event.target.value])
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

    const location = useLocation().pathname.split("/")
    const loca = location[location.length-1]
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
                                        <Button variant="secondary" onClick={add}>Add Employee</Button>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>

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
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data.map((v, i) => {
                                            return (
                                                <tr key={i}>
                                                    {/* <td >{i + 1}</td> */}
                                                    <td>{v.department}</td>
                                                    <td>{v.category}</td>
                                                    <td>{v.location}</td>
                                                    <td>{v.salary}</td>
                                                    <td>{v.emplyId}</td>
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
                <Row>
                    <Col className="" style={{textAlign:"end"}}>
                        <Button
                            variant="primary"
                            onClick={() => {
                                if (page > 1) setPage(page - 1)
                            }}
                        >
                            previous page
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            onClick={() => {
                                if (page < totalPage) setPage(page + 1)
                            }}
                        >
                            next page
                        </Button>
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