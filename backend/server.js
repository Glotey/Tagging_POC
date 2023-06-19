const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require('cors');
const { retrieveAudios, uploadAudio, updateAudioStatus } = require("./helper/request");
const corsOptions = { exposedHeaders: "Authorization" };
const storage = multer.diskStorage({
  destination:(req, file , cb)=>{
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("./uploads");
    }
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("./uploads");
    }
    cb(null, "./uploads/");
  } ,
  
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    cb(null, originalName);
  },
});

// Create the multer upload middleware
const upload = multer({ storage: storage });

const MONGO_URL = "mongodb://localhost:27017/SCI_DB"
const PORT = 5002
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
app.use('/files',express.static(path.join(__dirname, "/uploads")));
//Get all audio Listing 
app.get("/audio", retrieveAudios);
// Uplaod Audios file
app.post('/upload', upload.single('audio'), uploadAudio);
//update audio file status
app.patch('/audio/:id', updateAudioStatus);


async function connectDb() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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