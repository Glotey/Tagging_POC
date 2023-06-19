const Audio = require('./model')

const retrieveAudios = async (req,res)=>{
    try {
      const files = await Audio.find();
      res.status(200).json(files);
    } catch (error) {
      console.error('Error fetching audio files:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
const uploadAudio = async (req, res) => {
    try {
      const { originalname, filename } = req.file;
      const filePath = req.file.path;
      const audio = new Audio({
        originalName: originalname,
        filename: filename,
        filePath: filePath
      });
      await audio.save();
      res.status(201).json({ message: 'Audio file uploaded successfully' });
    } catch (error) {
      console.error('Error uploading audio file:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
const updateAudioStatus =  async (req, res) => {
    const { id } = req.params;
    try {
      const audio = await Audio.findById(id);  
      if (!audio) {
        return res.status(404).json({ error: 'Audio file not found' });
      }
      audio.train_ready = true;
        await audio.save();
      res.status(200).json({ message: 'Audio file train_ready status updated' });
    } catch (error) {
      console.error('Error updating train_ready status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  module.exports = {
    retrieveAudios,
    uploadAudio,
    updateAudioStatus
  }