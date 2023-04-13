import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../navbar/Nav.css";

const Nav = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/upload");
    };
    const homeClick = () => {
        navigate("/");
    }
    return (
        <nav className="nav-container">
            <h3 onClick={homeClick} style={{cursor: "pointer", color:"green"}}>🏠 Home </h3>
            <h1 style={{color:"blue", fontSize:"1.5rem"}}>QULEEP ASSIGNMENT</h1>
            <button onClick={handleClick}>Click Here To Upload Products</button>
        </nav>
    );
};

export default Nav;
