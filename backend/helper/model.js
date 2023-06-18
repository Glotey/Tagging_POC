const mongoose = require('mongoose')

const audioSchema = new mongoose.Schema({
    audio_path: {
        type: String,
        required: true,
      },
train_ready:{
type: Boolean,
default: false
}
})

module.exports= mongoose.model("rawCollection" , audioSchema)