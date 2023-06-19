import React, { useState , useEffect, useRef} from 'react';
import { fetchAudioFiles, handleUploadTranscribe } from '../helpers/request';
import NoDataFound from '../noData';
import Waveform from '../waveUI';
import "./home.css"
const AudioPage = () => {
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);
  const audioRef = useRef(null);
  const [isPlaying,setIsPlaying]=useState(false)
  const [text, setText] = useState("Welcome to transcribe.");
  useEffect(()=>{
    fetchAudios();
  },[])
  const fetchAudios = async() =>{
    try{
        const data = await fetchAudioFiles();
        console.log(data)
        setAudioFiles(data);
    }
    catch(e){
        console.log(e, "error")
    }
  }
  const handleAudioSelection = (audio) => {
    setText(audio?.actual_text || "Welcome to transcribe." )
    setSelectedAudio(audio);
    if(isPlaying) stop();
  };
  const play = () => {
    audioRef.current.play();
    setIsPlaying(true)
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false)
  };
  const stop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false)
  };
const submitTranscript = async() => {
        let data={
            actual_text: text,
            train_ready: true
        }
        await handleUploadTranscribe( selectedAudio?._id, data)
}
const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="audio-page">
      <div className="audio-list">
        <h2>Audio List</h2>
        <ul>
          {audioFiles.map((audio) => (
            <li
              key={audio._id}
              onClick={() => {
                setSelectedAudio(null);
                handleAudioSelection(audio)}}
              className={selectedAudio === audio ? 'selected' : ''}
            >
              {audio.originalName}
            </li>
          ))}
        </ul>
      </div>
      <div className="waveform-container">
        {selectedAudio ? (
            <>
          <audio controls ref={audioRef}>
            <source src={`http://localhost:5002/files/${selectedAudio.originalName}`} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          
          <div id="text-area">
          <textarea name="transcript" id="transcript" cols="30" rows="10" onChange={handleTextChange} value={text}/>
          
        </div>
        <button onClick={submitTranscript}>Submit transcription</button>
        </>
        //   <Waveform audioUrl={selectedAudio.file}/>
        ) : (
            <>
          <h2>Select an audio from the list</h2>
          <NoDataFound/>
          </>
          
        )}
        
      </div>
    </div>
  );
};

export default AudioPage;
