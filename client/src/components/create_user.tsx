import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createUserAsync } from "../services/api_client";
import { User } from "../dtos/user";
import { CreateUserDto } from "../dtos/requests/create_user_dto";

export interface RegistrationFormData {
    username: string;
    email: string;
    password: string;
}

function CreateUserComponent() {
    const [form, setForm] = useState<CreateUserDto>({
        username: "",
        email: "",
        lastLogin: new Date(),
        password: "",
        status: "Active",
    });

    const navigate = useNavigate();

    function updateForm(value: Partial<User>) {
        setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newPerson = { ...form, status: "Active" };

        try {
            const response = await createUserAsync(newPerson);

            if (response.data?.insertedId) {
                setForm({
                    username: "",
                    email: "",
                    password: "",
                    lastLogin: new Date(),
                    status: "",
                });

                navigate("/authorised");

                localStorage.setItem("username", `${newPerson.username}`);
                localStorage.setItem("currentUserID", response.data.insertedId);
            } else {
                console.error(
                    "Failed to create user:",
                    response.error || response.data
                );
            }
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    value={form.username}
                    onChange={(e) => updateForm({ username: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={(e) => updateForm({ email: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={form.password}
                    onChange={(e) => updateForm({ password: e.target.value })}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Sign up
            </button>
        </form>
    );
}

export { CreateUserComponent };
