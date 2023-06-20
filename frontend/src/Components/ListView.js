import React,{useState} from "react";
import "./ListView.css";
import TabComponent from "./TabComponent";

const AudioList = ({handleChange , files , selectedAudio}) => {
    const [activeTab, setActiveTab] = useState(0);
    const pending = files?.filter((file)=>{
      if(file?.train_ready != true) return file;
    })
    const completed = files?.filter((file)=>{
      if(file?.train_ready == true) return file;
    })
    console.log(pending,"pending")
    const tabs = [
      {
        label: 'Pending',
        content: <div><ul>
        {pending.map((audio, index) => (
          <li
            key={audio?._id}
            onClick={()=>handleChange(audio)}
            className={selectedAudio?._id === audio?._id ? "selected" : ""}
          >
            {index+1}. {audio.originalName} 
          </li>
        ))}
      </ul></div>,
      },
      {
        label: 'Completed',
        content: <div><ul>
        {completed.map((audio, index) => (
          <li
            key={audio?._id}
            onClick={()=>handleChange(audio)}
            className={selectedAudio?._id === audio?._id ? "selected" : ""}
          >
            {index+1}. {audio.originalName}
          </li>
        ))}
      </ul></div>,
      },
    ]
  return (
    <div className="audio-list">
      <div className="audioListHead">
      <h2>Audio List</h2>
      <p>Total : {activeTab == 0 ? pending?.length : completed?.length} </p>
      </div>
      <TabComponent
      tabs={tabs}
      setTab={setActiveTab}
      active={activeTab}
      />
    </div>
  );
};

export default React.memo(AudioList);
