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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const faker_1 = require("@faker-js/faker");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const db = client.db("task4DB");
            yield db.createCollection("users");
            const usersToInsert = [];
            for (let i = 0; i < 20; i++) {
                const username = faker_1.faker.internet.userName();
                const email = faker_1.faker.internet.email();
                const password = faker_1.faker.internet.password();
                const status = "Active";
                const lastLogin = "2023-11-29T15:08:43.432Z";
                usersToInsert.push({
                    username,
                    email,
                    password,
                    status,
                    lastLogin,
                });
            }
            yield db.collection("users").insertMany(usersToInsert);
            console.log("Success");
        }
        catch (error) {
            console.error("Error", error);
        }
    });
}
exports.seedDatabase = seedDatabase;
//# sourceMappingURL=seeder.js.map