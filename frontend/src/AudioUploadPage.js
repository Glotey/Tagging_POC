import React, { useState, useEffect , useRef} from 'react';
import './Audio.css'
import NoDataFound from './noData';
import Waveform from './waveUI';
const AudioUploadPage = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const audioPlayerRef = useRef(null);
  useEffect(() => {
    // Fetch audio files from API and update the state
    fetchAudioFiles();
  }, []);

  const fetchAudioFiles = async () => {
    try {
      setSelectedFile(null)
      const response = await fetch("http://localhost:5002/audio");
      const data = await response.json();
      setAudioFiles(data);
    } catch (error) {
      console.error('Error fetching audio files:', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  async function handleUpload() {
  try{
    const formData = new FormData();
    formData.append('audio', selectedFile);
  
    const resp = await fetch('http://localhost:5002/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await resp.json()
    console.log('Audio file uploaded successfully:', data);
    if(data.message){
      alert("Audio file uploaded successfully !")
      setSelectedFile("")
      fetchAudioFiles();
    }
    else{
      alert(data.error);
    }
  }
  catch(error){
    console.error('Error uploading audio file:', error);
    alert(error.message)
    };
  }


  const handleToggle = async(audioId) => {
    console.log(audioId,"audioId")
    const response = await fetch(`http://localhost:5002/audio/${audioId}`,{
      method: 'PATCH',
      body: {train_ready: true},
    });
      const data = await response.json();
      console.log(data, "data")
      if(data){
        alert("Done !")
        fetchAudioFiles();
      }
      // setAudioFiles(data);
  };
  console.log(audioFiles)
  return (
    <div className="container">
      {/* <div className="upload-container">
        <h2>Upload Audio</h2>
        <form className="upload-form">
          <label htmlFor="upload-input" className="upload-label">
            Choose an audio file:
          </label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            id="upload-input"
            className="upload-input"
          />
          <button type="button" onClick={handleUpload} className="upload-button">
            Upload
          </button>
        </form>
      </div> */}
      <div className="item-container">
        <div className='listing-container'>
        <h2>Audio Listing</h2>
          { (audioFiles.length > 0) ? 
          audioFiles.map((audio) => (
            <div key={audio._id} className="audio-item">
            <div className="audio-info">
              <div className="audio-name">{audio.originalName}</div>
              <button className={`toggle-button ${audio.train_ready ? 'ready' : 'not-ready'}`} 
              onClick={() => handleToggle(audio._id)}
              disabled={audio.train_ready}>
                {audio.train_ready ? 'Updated !' : 'Not Updated !'}
              </button>
            </div>
            <div className="audio-controls">
              <audio controls ref={audioPlayerRef} >
              <source src={`http://localhost:5002/files/${audio.originalName}`} type="audio/mpeg"/>
                </audio>
            </div>
            <input 
            style={{padding: "20px"}}
            placeholder="Enter Transcribed Text"
            value=""
            />

          </div>
            )) 
          :
            <NoDataFound/>
          }
      </div>
      </div>
      <div className='upload-container'>
      {audioFiles.length && <Waveform audioUrl={`http://localhost:5002/files/${audioFiles?.[2].filePath}`}/>}
      </div>
    </div>
  );
};

export default AudioUploadPage;
