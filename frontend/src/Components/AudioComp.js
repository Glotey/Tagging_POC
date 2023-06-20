import React from "react";
import "./AudioComp.css"
const AudiComp = ({ref, source}) =>{
    return(
      <div className="audio-player">
        <audio key={source} controls ref={ref}>
            <source
              src={source}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
          </div>
    )
}

export default AudiComp;