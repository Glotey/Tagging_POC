import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import './wave.css';

const WaveformPlayer = ({ audioUrl }) => {
  const waveformRef = useRef(null);
  const playbackSpeed = useRef(1);
  let wavesurfer;
  useEffect(()=>{
  initializeWaveform();
  return () => {
    if (wavesurfer) {
      wavesurfer.destroy();
    }
  };
  },[audioUrl])

  useEffect(()=>{
    wavesurfer.setPlaybackRate(playbackSpeed.current)
  },playbackSpeed)
  const initializeWaveform = () => {
    if (waveformRef.current) {
      if(wavesurfer){
        wavesurfer.destroy();
      }
       wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#4e9dca",
        progressColor: '#f2f2f2',
        barWidth: 3,
        cursorWidth: 2,
        barGap: 2,
        responsive: true,
        plugins: [
          RegionsPlugin.create(),
        ],
      });

      wavesurfer.load(audioUrl);

      let region = null;

      wavesurfer.on('ready', () => {
        wavesurfer.enableDragSelection({
          loop: true,
          drag: true,
          waveColor: 'blue',
          dragCallback: () => {
            // Destroy the previous region if exists
            if (region) {
              region.setLoop(false);
              region = null
            }
          }
        });
      });

        wavesurfer.on('region-created', (newRegion) => {
          console.log(newRegion.element.style,"newRegion")
          if (region && region !== newRegion) {
            region.setLoop(false);
            region.remove();
          }
          region = newRegion;
          region.on('out', () => {
            region.play();
          });
          region.on('update-end', () => {
            wavesurfer.backend.setPeaks(newRegion.peaks);
            wavesurfer.backend.loop = newRegion.loop;
          });
          
        });

        wavesurfer.on('region-updated', (newRegion) => {
        if (region) {
          wavesurfer.backend.setPeaks(region.peaks);
          wavesurfer.backend.loop = region.loop;
          region.element.style.backgroundColor = 'rgba(78, 157, 202, 0.53)'
        }
      });
      wavesurfer.on('region-click', (clickedRegion) => {
        // If a looped region exists and it's not the clicked region, disable the loop
        if (region && region !== clickedRegion) {
          region.setLoop(false);
            region.remove();
        }
      });
      return wavesurfer;
    }
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

  const removeLoopedRegion = () => {
    if (wavesurfer) {
      const regions = wavesurfer.regions.list;
      console.log(regions,"regions")
      const loopedRegion = Object.values(regions).find((region) => region.loop);
      if (loopedRegion) {
        loopedRegion.setLoop(false);
        loopedRegion.remove();
      }
    }
  };

  const handlePlaybackSpeedChange = (event) => {
    const speed = parseFloat(event.target.value );
    playbackSpeed.current = speed
    if(wavesurfer) {
      wavesurfer.setPlaybackRate(parseFloat(speed))
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
      <button onClick={removeLoopedRegion}>Remove Loop</button>
      <div className="playback-speed-bar">
        <label htmlFor="playback-speed">Playback Speed:</label>
        <input
          type="range"
          id="playback-speed"
          min="0.5"
          max="2"
          step="0.1"
          value={playbackSpeed?.current}
          onChange={handlePlaybackSpeedChange}
        />
        <span>{playbackSpeed.current?.toFixed(1)}</span>
      </div>
  </div>
  </>
  );
};

export default WaveformPlayer;
