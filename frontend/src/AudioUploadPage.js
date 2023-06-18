import React, { useState, useEffect } from 'react';
import './Audio.css'
const AudioUploadPage = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Fetch audio files from API and update the state
    fetchAudioFiles();
  }, []);

  const fetchAudioFiles = async () => {
    try {
      const response = await fetch('API_ENDPOINT_URL');
      const data = await response.json();
      setAudioFiles(data);
    } catch (error) {
      console.error('Error fetching audio files:', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    // Perform upload logic here, e.g., using FormData and API call
    // After successful upload, update the audio file listing
    // Refresh the audio file listing
    fetchAudioFiles();
  };

  return (
    <div className="container">
      <div className="upload-container">
        <h2>Upload Audio</h2>
        <form className="upload-form">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="upload-input"
          />
          <button type="button" onClick={handleUpload}>
            Upload
          </button>
        </form>
      </div>
      <div className="listing-container">
        <h2>Audio Listing</h2>
        <ul className="audio-list">
          {audioFiles.map((audio) => (
            <li key={audio.id} className="audio-item">
              {audio.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AudioUploadPage;
