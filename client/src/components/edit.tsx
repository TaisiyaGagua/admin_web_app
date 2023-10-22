import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

interface Form {
    username: string;
    email: string;
    lastlogin: string;
    status: string;
}

export default function Edit() {
    const [form, setForm] = useState<Form>({
        username: "",
        email: "",
        lastlogin: "",
        status: "",
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            if (params && params.id) {
                const id = params.id.toString();
                const response = await fetch(
                    `http://localhost:5001/record/${params.id.toString()}`
                );
                if (!response.ok) {
                    const message = `An error has occurred: ${response.statusText}`;
                    window.alert(message);
                    return;
                }

                const record = await response.json();
                if (!record) {
                    window.alert(`Record with id ${id} not found`);
                    navigate("/");
                    return;
                }

                setForm(record);
            }
        }

        fetchData();
    }, [params, navigate]);

    // These methods will update the state properties.
    function updateForm(value: Partial<Form>) {
        setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const editedPerson = {
            username: form.username,
            email: form.email,
            lastlogin: form.lastlogin,
            status: form.status,
        };

        if (params && params.id) {
            // This will send a post request to update the data in the database.
            await fetch(`http://localhost:5000/update/${params.id}`, {
                method: "POST",
                body: JSON.stringify(editedPerson),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            navigate("/");
        }
    }

    // This following section will display the form that takes input from the user to update the data.
}
