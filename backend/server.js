const express = require("express");
const app = express();
const cors = require('cors')
const FetchAudio = require("./helper/model")
const mongoose = require("mongoose");
const corsOptions = { exposedHeaders: "Authorization" };


const MONGO_URL = "mongodb://localhost:27017/SCI_DB"
const PORT = 5000

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"),
    res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Testing done !");
});

app.get("/audio",(req,res)=>{
    const getAllAudio = async () => {
        //GET All audio from database
        return await FetchAudio.find();
      };
    const list = getAllAudio()
    console.log("LIST =",list)
    if (list.length) res.send(list)
});



async function connectDb() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(MONGO_URL);
  } catch (e) {
    console.log(e, "error");
  }
}

connectDb().then(() => {
  console.log("DB Connected");
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});