import { useContext, useEffect } from "react";
import { Button, Container, Navbar, Nav } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { MainContext } from "../context/Context";
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Header.css"

export default function Header() {

    const { id,setid} = useContext(MainContext)
    const navigate = useNavigate();

    function logout() {
        import ("./Constant").then(ff=>{ff.clearToken()})
        navigate('/')
        setid()
    }

    useEffect( ()=>{
        if(sessionStorage.getItem("idinfo"))
            setid(JSON.parse(sessionStorage.getItem("idinfo")))
    },[])

    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand >Employee Corner</Navbar.Brand>
                    <Navbar.Toggle />
                   { sessionStorage.getItem("idinfo") && id && <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end px-5">
                        <NavDropdown title={id.name} id="basic-nav-dropdown">
                            <NavDropdown.Item className="logoutbtn" >
                                <Button variant="secondary" style={{width:"100%",margin:"auto"}} onClick={logout}>logout</Button>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>}

                </Container>
            </Navbar>
        </>
    )
}