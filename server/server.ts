import express from "express";
import { User } from "./models/user";
import { connectToServer, getDbObject } from "./db/conn";
import { Filter, ObjectId } from "mongodb";
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });

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
    let insertResult = await db_connect.collection("Users").insertOne(myobj);
    res.send(insertResult);
});

app.post("/record/check", async (req, res) => {
    let db_connect = await getDbObject();
    let { email, password } = req.body;

    let found = await db_connect.collection("Users").findOne({ email });
    if (!found) {
        res.json({ success: false, message: "User not found" });
    } else {
        if (found.password === password) {
            res.json({
                success: true,
                message: "Login successful",
                username: found.username,
            });
        } else {
            res.json({ success: false, message: "Incorrect password" });
        }
    }
});

app.get("/record/userslist", async (_, res) => {
    try {
        let db_connect = await getDbObject();
        const users = await db_connect
            .collection<User>("Users")
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
    let id = req.params.id;
    let myquery = { id: id };
    const result = await db_connect.collection("Users").deleteOne(myquery);
    response.json(result);
});

app.patch("/users/:id", async (req, res) => {
    try {
        let db_connect = await getDbObject();

        let id = req.params.id;
        let payload = req.body as User;

        const filter = { _id: new ObjectId(id) };
        const updateDocument = payload;

        const updateResult = await db_connect
            .collection("Users")
            .updateOne(filter, updateDocument);

        res.json(updateResult);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при получении данных" });
    }
});
