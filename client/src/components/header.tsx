import React from "react";
import lizard from "../images/icon_lizard.png";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <header>
            <img src={lizard} alt="lizard_icon" className="lizard" />
            <div className="breadcrumb_custom">
                <p className="breadcrumb_hello">
                    Hello,
                    {localStorage.getItem("username")}!
                </p>
                <button className="btn btn-info" onClick={handleLogout}>
                    Log out
                </button>
            </div>
        </header>
    );
};

export default Header;
