import React, { useEffect } from "react";
import NoDataFound from "../noData";
import AudiComp from "./AudioComp";
import WaveformPlayer from "../waveUI";
import './AudioView.css'
const AudioView = ({ref,onSubmit,value,onChange,url , audioFile  }) => {
  return (
    <div className="waveform-container">
      {audioFile ? (
        <>
          <AudiComp
          ref={ref}
          source={url}
          />
          <div id="text-area">
            <textarea
              name="transcript"
              id="transcript"
              cols="30"
              rows="10"
              onChange={onChange}
              value={value}
            />
          </div>
          {/* <WaveformPlayer audioUrl={url}/> */}
          <button onClick={onSubmit}>Submit transcription</button>
        </>
      ) : (
        <>
          <h2>Select an audio from the list</h2>
          <NoDataFound />
        </>
      )}
      </div>
  );
};

export default React.memo(AudioView);
