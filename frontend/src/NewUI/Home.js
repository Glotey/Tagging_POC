import React, { useState, useEffect, useRef } from "react";
import AudioView from "../Components/AudioView";
import ListView from "../Components/ListView";
import { fetchAudioFiles, handleUploadTranscribe } from "../helpers/request";
import NoDataFound from "../noData";
import Waveform from "../waveUI";
import "./home.css";
const AudioPage = () => {
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState("Welcome to transcribe.");
  const url = `http://localhost:5002/files/${selectedAudio?.originalName}`
  
  useEffect(() => {
    fetchAudios();
  }, []);
  const fetchAudios = async () => {
    try {
      setSelectedAudio(null);
      const data = await fetchAudioFiles();
      console.log(data);
      setAudioFiles(data);
    } catch (e) {
      console.log(e, "error");
    }
  };
  const handleAudioSelection = (audio) => {
    setText(audio?.actual_text || "Welcome to transcribe.");
    setSelectedAudio(audio)
    if (isPlaying) stop();
  };
  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };
  const stop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };
  const submitTranscript = async () => {
    let data = {
      actual_text: text,
      train_ready: true,
    };
    await handleUploadTranscribe(selectedAudio?._id, data);
    await fetchAudios();
  };
  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  
  return (
    <div className="audio-page">
      <ListView
        handleChange={handleAudioSelection}
        files={audioFiles}
        selectedAudio={selectedAudio}
      />
      <AudioView
        ref={audioRef}
        onSubmit={submitTranscript}
        onChange={handleTextChange}
        value={text}
        url={url}
        audioFile={selectedAudio}
      />
    </div>
  );
};

export default React.memo(AudioPage);
