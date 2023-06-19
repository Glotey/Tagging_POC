const mongoose = require('mongoose')

const audioSchema = new mongoose.Schema({
  originalName: String,
  filename: String,
  filePath: String,
  train_ready: {
    type: Boolean,
    default: false,
  },
  actual_text: String,
});

module.exports= mongoose.model("Audio" , audioSchema)