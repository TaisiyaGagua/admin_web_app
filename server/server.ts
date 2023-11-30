import express from "express";
import { User } from "./models/user";
import { connectToServer, getDbObject } from "./db/conn";
import { Filter, ObjectId } from "mongodb";
import { faker } from "@faker-js/faker";

const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./.env" });

const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());

app.listen(port, async () => {
    await connectToServer();
    console.log(`Server is running on port: ${port}`);
});

app.post("/record/add", async (req, res) => {
    let db_connect = await getDbObject();
    let myobj = {
        username: req.body.username,
        email: req.body.email,
        lastLogin: req.body.lastLogin,
        status: req.body.status,
        password: req.body.password,
    };
    let insertResult = await db_connect.collection("users").insertOne(myobj);
    res.send(insertResult);
});

app.post("/record/check", async (req, res) => {
    let db_connect = await getDbObject();
    let { email, password } = req.body;

    let found = await db_connect.collection("users").findOne({ email });
    if (!found) {
        res.json({ success: false, message: "User not found" });
    } else {
        if (found.password === password) {
            if (found.status == "Active") {
                res.json({
                    success: true,
                    message: "Login successful",
                    username: found.username,
                    id: found._id,
                });
            } else {
                res.json({
                    success: false,
                    message:
                        "Your account is blocked.If you think this happened by mistake, please contact administrator: gagya@mail.ru",
                });
            }
        } else {
            res.json({ success: false, message: "Incorrect password" });
        }
    }
});

app.get("/record/userslist", async (_, res) => {
    try {
        let db_connect = await getDbObject();
        const users = await db_connect
            .collection<User>("users")
            .find({})
            .toArray();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при получении данных" });
    }
});

app.delete("/:id", async (req, response) => {
    let db_connect = await getDbObject();
    let id = new ObjectId(req.params.id);
    const result = await db_connect.collection("users").deleteOne({ _id: id });
    response.json(result);
});

app.patch("/users/:id", async (req, res) => {
    try {
        let db_connect = await getDbObject();

        let id = new ObjectId(req.params.id);
        let updatedStatus = req.body.status;
        let updatedLastLogin = req.body.lastLogin;

        if (updatedStatus) {
            const updateResult = await db_connect
                .collection("users")
                .findOneAndUpdate(
                    { _id: id },
                    { $set: { status: updatedStatus } }
                );

            if (updateResult) {
                res.status(200).json({
                    message: "User status successesfully updated",
                });
            }
        } else if (updatedLastLogin) {
            const updateResult = await db_connect
                .collection("users")
                .findOneAndUpdate(
                    { _id: id },
                    { $set: { lastLogin: updatedLastLogin } }
                );
            if (updateResult) {
                res.status(200).json({
                    message: "User status successesfully updated",
                });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при получении данных" });
    }
});
