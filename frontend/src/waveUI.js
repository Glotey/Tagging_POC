import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import './wave.css';

const WaveformPlayer = ({ audioUrl }) => {
  const waveformRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [waveformIsPlaying, setWaveformIsPlaying] = useState(false);
  let wavesurfer;
  console.log(audioUrl,"audioUrl")
  
  useEffect(()=>{
    initializeWaveform();
  return () => {
    if (wavesurfer) {
      wavesurfer.destroy();
    }
  };

  },[audioUrl])
  const initializeWaveform = () => {
    if (waveformRef.current) {
      if(wavesurfer){
        wavesurfer.destroy();
      }
       wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'blue',
        progressColor: 'purple',
        barWidth: 2,
        cursorWidth: 1,
        responsive: true,
      });
      wavesurfer.load(audioUrl);
      return wavesurfer;
    }

    return null;
  };
  const handlePlay = () => {
    if (wavesurfer) {
      wavesurfer.play();
    }
  };

  const handlePause = () => {
    if (wavesurfer) {
      wavesurfer.pause();
    }
  };
  return (
    <>
    <div className="waveform-player">
      <div ref={waveformRef} className="waveform" />
    </div>
    <div className="controls">
     <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
  </div>
  </>
  );
};

export default WaveformPlayer;
