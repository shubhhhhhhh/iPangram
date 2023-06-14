import { useEffect, useReducer, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import "./SideNav.css";
import { useContext } from "react";
import { MainContext } from "../../context/Context";
import { getToken } from "../../constant/Constant";


export default function SideNav({ children }) {
    //context state
    const { id } = useContext(MainContext)

    //checking token of user
    const navigate = useNavigate()
    useEffect(() => {
        if (!getToken()) {
            navigate("/")
        }
    }, [])

    //sidenav functions for small devices
    function openNav() {
        var sidenav = document.getElementsByClassName("sidenav")[0];
        // console.log(sidenav)
        sidenav.classList.add("showbar")
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }
    function closeNav() {
        var sidenav = document.getElementsByClassName("sidenav")[0];
        // console.log(sidenav)
        sidenav.classList.remove("showbar")
        document.body.style.removeProperty("background-color");
    }

    //sidenav tabs 
    const [menu, setMenu] = useState()       //state for sidenav

    //active tabs
    const [tab, setTab] = useState(0)
    const locations = useLocation().pathname;   //for getting current page's url 

    useEffect(() => {
        if (id && !menu) {
            if (id.name.toLowerCase().startsWith("m"))
                setMenu([
                    { title: "dashboard", path: '/admin/dashboard' },
                    { title: "facebook", path: '/admin/facebook' },
                    { title: "google", path: '/admin/google' },
                    { title: "wipro", path: '/admin/wipro' },
                    { title: "walmart", path: '/admin/walmart' },
                ])
            else if (id.name.toLowerCase().startsWith("e"))
                setMenu([
                    { title: "Dashboard", path: '/emp/dashboard' }
                ])
        }
        if (menu) {                        //for setting tab active in sidenav after page's reload
            menu.forEach((e, i) => {
                if (e.path.toLowerCase() == locations) {
                    setTab(i)
                }
            })
        }
    }, [id, menu])

    return (
        <>
            <Button variant="primary" className="mbtn" onClick={openNav}>
                &#9776;
            </Button>

            <div id="mySidenav" className="sidenav" style={{ textAlign: "start" }}>
                <a className="closebtn" onClick={closeNav}>&times;</a>
                <ul style={{ listStyle: "none", padding: "0" }}>
                    {
                        menu && menu.map((ele, index) =>
                            <li key={index}>
                                <Link
                                    to={`${ele.path}`}
                                    onClick={() => setTab(index)}
                                    className={`${index == tab ? 'active' : ''}`}
                                    style={{ marginLeft: "0" }}
                                >
                                    <div style={{ display: "inline-block", width: "70%", textAlign: "start" }} >
                                        {ele.title}
                                    </div>
                                </Link>
                            </li>)
                    }
                </ul>
            </div>
            <Container id="main" >
                {children}
            </Container>
        </>
    )
}