import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";

function Routerss() {
    return (
        <BrowserRouter>
            <Layout />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter >
    )
}

export default Routerss;