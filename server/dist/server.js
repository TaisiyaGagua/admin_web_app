"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conn_1 = require("./db/conn");
const mongodb_1 = require("mongodb");
const app = (0, express_1.default)();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express_1.default.json());
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, conn_1.connectToServer)();
    console.log(`Server is running on port: ${port}`);
}));
app.post("/record/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let db_connect = yield (0, conn_1.getDbObject)();
    let myobj = {
        username: req.body.username,
        email: req.body.email,
        lastLogin: req.body.lastLogin,
        status: req.body.status,
        password: req.body.password,
    };
    let insertResult = yield db_connect.collection("Users").insertOne(myobj);
    res.send(insertResult);
}));
app.post("/record/check", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let db_connect = yield (0, conn_1.getDbObject)();
    let { email, password } = req.body;
    let found = yield db_connect.collection("Users").findOne({ email });
    if (!found) {
        res.json({ success: false, message: "User not found" });
    }
    else {
        if (found.password === password) {
            res.json({
                success: true,
                message: "Login successful",
                username: found.username,
            });
        }
        else {
            res.json({ success: false, message: "Incorrect password" });
        }
    }
}));
app.get("/record/userslist", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db_connect = yield (0, conn_1.getDbObject)();
        const users = yield db_connect
            .collection("Users")
            .find({})
            .toArray();
        res.json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при получении данных" });
    }
}));
app.delete("/:username", (req, response) => __awaiter(void 0, void 0, void 0, function* () {
    let db_connect = yield (0, conn_1.getDbObject)();
    let username = req.params.username;
    let myquery = { username: username };
    const result = yield db_connect.collection("Users").deleteOne(myquery);
    response.json(result);
}));
app.patch("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db_connect = yield (0, conn_1.getDbObject)();
        let id = req.params.id;
        let payload = req.body;
        const filter = { _id: new mongodb_1.ObjectId(id) };
        const updateDocument = payload;
        const updateResult = yield db_connect
            .collection("Users")
            .updateOne(filter, updateDocument);
        res.json(updateResult);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при получении данных" });
    }
}));
//# sourceMappingURL=server.js.map