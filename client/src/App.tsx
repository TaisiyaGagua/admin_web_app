import React, { useState } from "react";
import "./custom.css";
import Auth from "./components/authentication";
import UserActions from "./components/action_toolbar";
import { CreateUserComponent } from "./components/create_user";
import { ShowUsersTable } from "./components/users_table";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";

const App: React.FC = () => {
    localStorage.setItem("isAuthenticated", "false");

    const [isRegistrationPage, setIsRegistrationPage] = useState(true);

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                {isRegistrationPage ? (
                                    <div className="registration_container">
                                        <h1>User registration</h1>
                                        <CreateUserComponent />

                                        <div className="checking_container">
                                            <h6>Already have an account?</h6>
                                            <button
                                                className="btn btn-info"
                                                onClick={() =>
                                                    setIsRegistrationPage(false)
                                                }
                                            >
                                                Log in
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="autentification_container">
                                        <Auth />
                                        <div className="checking_container">
                                            <h6>Don't have an account?</h6>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    setIsRegistrationPage(true)
                                                }
                                            >
                                                Sign up
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        }
                    />
                    <Route
                        path="/authorised"
                        element={
                            <div>
                                {" "}
                                <div className="header_custom">
                                    <Header></Header>
                                </div>
                                <UserActions /> 
                                <ShowUsersTable />
                            </div>
                        }
                    ></Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
