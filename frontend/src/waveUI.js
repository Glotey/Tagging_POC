import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import './wave.css';

const WaveformPlayer = ({ audioUrl }) => {
  const waveformRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [waveformIsPlaying, setWaveformIsPlaying] = useState(false);

  useEffect(() => {
    const waveform = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'violet',
      progressColor: 'purple',
      url: audioUrl
    });

    waveform.load(audioUrl);

    waveform.on('play', () => {
      waveform.play()
    });

    waveform.on('pause', () => {
      setWaveformIsPlaying(false);
    });

    if (isLooping) {
      waveform.on('finish', () => {
        waveform.play();
      });
    } else {
      waveform.on('finish', () => {
        setIsPlaying(false);
      });
    }

    return () => waveform.destroy();
  }, [audioUrl, isLooping]);

  const togglePlay = () => {
    const waveform = waveformRef.current;
    console.log(waveform,"wave")
    if (waveformIsPlaying) {
      waveform.pause();
    } else {
      waveform.play();
    }
    setIsPlaying(!waveformIsPlaying);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  return (
    <div className="waveform-player">
      <div ref={waveformRef} className="waveform" />
      <div className="controls">
        <button className={`play-button ${waveformIsPlaying ? 'pause' : 'play'}`} onClick={togglePlay} />
        <button className={`loop-button ${isLooping ? 'active' : ''}`} onClick={toggleLoop}>
          Loop
        </button>
      </div>
    </div>
  );
};

export default WaveformPlayer;
