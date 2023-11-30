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
require("dotenv").config({ path: "./.env" });
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
    let insertResult = yield db_connect.collection("users").insertOne(myobj);
    res.send(insertResult);
}));
app.post("/record/check", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let db_connect = yield (0, conn_1.getDbObject)();
    let { email, password } = req.body;
    let found = yield db_connect.collection("users").findOne({ email });
    if (!found) {
        res.json({ success: false, message: "User not found" });
    }
    else {
        if (found.password === password) {
            if (found.status == "Active") {
                res.json({
                    success: true,
                    message: "Login successful",
                    username: found.username,
                    id: found._id,
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Your account is blocked.If you think this happened by mistake, please contact administrator: gagya@mail.ru",
                });
            }
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
            .collection("users")
            .find({})
            .toArray();
        res.json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при получении данных" });
    }
}));
app.delete("/:id", (req, response) => __awaiter(void 0, void 0, void 0, function* () {
    let db_connect = yield (0, conn_1.getDbObject)();
    let id = new mongodb_1.ObjectId(req.params.id);
    const result = yield db_connect.collection("users").deleteOne({ _id: id });
    response.json(result);
}));
app.patch("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db_connect = yield (0, conn_1.getDbObject)();
        let id = new mongodb_1.ObjectId(req.params.id);
        let updatedStatus = req.body.status;
        let updatedLastLogin = req.body.lastLogin;
        if (updatedStatus) {
            const updateResult = yield db_connect
                .collection("users")
                .findOneAndUpdate({ _id: id }, { $set: { status: updatedStatus } });
            if (updateResult) {
                res.status(200).json({
                    message: "User status successesfully updated",
                });
            }
        }
        else if (updatedLastLogin) {
            const updateResult = yield db_connect
                .collection("users")
                .findOneAndUpdate({ _id: id }, { $set: { lastLogin: updatedLastLogin } });
            if (updateResult) {
                res.status(200).json({
                    message: "User status successesfully updated",
                });
            }
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при получении данных" });
    }
}));
//# sourceMappingURL=server.js.map