import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserAsync } from "../services/api_client";
import { CheckUserDto } from "../dtos/requests/check_user_dto";
import { useDispatch } from "react-redux";
import { updateLastLoginUserRequest } from "../state/users_state";

const Auth: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (email: string, password: string) => {
        try {
            const payload: CheckUserDto = { email, password };
            const response = await checkUserAsync(payload);

            if (response.error || response.data?.success === false) {
                window.alert(response.data?.message);
            }

            if (response.data?.success) {
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("username", `${response.data.username}`);
                if (response.data.id) {
                    localStorage.setItem("currentUserID", response.data.id);
                }
                navigate("/authorised");
                dispatch(updateLastLoginUserRequest(response.data.id));
            }
        } catch (error) {
            window.alert(error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button
                className="btn btn-info"
                onClick={() => handleLogin(email, password)}
            >
                Log in
            </button>
        </div>
    );
};

export default Auth;
