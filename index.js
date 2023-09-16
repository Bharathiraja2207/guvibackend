import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv'
import signinRouter from './router/signin.js';
dotenv.config()
const app = express();
// const mongo_url = 'mongodb://127.0.0.1';
const mongo_url =(process.env.mongo_url)
export const client = new MongoClient(mongo_url);
await client.connect();

  console.log('mongo is connected!!');

  app.use(express.json())
  app.use(bodyParser.json())
  app.use(cors())

const PORT = (process.env.PORT)
// const PORT = 4000;

app.get("/guvi", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.get("/",async function (request, response) {
    const movie= await client
    .db("guvi")
    .collection("guvi")
    .find({})
    .toArray();
        response.send(movie);
      });

      app.post("",async function (request, response) {
        const data=request.body;
        console.log(data);
    // db.moviesid.insertmany(data)
         const result= await client
            .db("guvi")
           .collection("guvi")
            .insertOne(data)
        response.send(result);
      });

app.use("/users",signinRouter);
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

