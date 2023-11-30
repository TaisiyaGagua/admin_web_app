import { faker } from "@faker-js/faker";

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.ATLAS_URI!;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export async function seedDatabase() {
    try {
        await client.connect();

        const db = client.db("task4DB");

        await db.createCollection("users");

        const usersToInsert = [];
        for (let i = 0; i < 20; i++) {
            const username = faker.internet.userName();
            const email = faker.internet.email();
            const password = faker.internet.password();

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

        await db.collection("users").insertMany(usersToInsert);

        console.log("Success");
    } catch (error) {
        console.error("Error", error);
    }
}


