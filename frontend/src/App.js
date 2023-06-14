import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Dashboard from "./component/Dashboard/Dashboard";
import Header from "./constant/Header";
import GlobalContext from "./context/ContextGlobal";
import SideNav from './component/sidenav/SideNav';
import AdminDashboard from './component/AdminDashboard';
import EmpDashboard from './component/EmpDashboard';
import Fb from './component/Fb';
import Go from './component/Go';
import Wp from './component/Wp';
import Wl from './component/Wl';

export default function App() {
    return (
        <>
            <GlobalContext>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="admin/dashboard" element={<SideNav><AdminDashboard /></SideNav>} />
                        <Route path="admin/facebook" element={<SideNav><Fb/></SideNav>} />
                        <Route path="admin/google" element={<SideNav><Go/></SideNav>} />
                        <Route path="admin/wipro" element={<SideNav><Wp/></SideNav>} />
                        <Route path="admin/walmart" element={<SideNav><Wl/></SideNav>} />
                        <Route path="emp/Dashboard" element={<SideNav><EmpDashboard/></SideNav>} />
                    </Routes>
                </Router>
            </GlobalContext>
        </>
    )
}

