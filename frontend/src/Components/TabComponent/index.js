import React, { useState } from 'react';
import "./tabs.css"
const TabComponent = ({tabs, active , setTab}) => {
  const handleTabClick = (index) => {
    setTab(index);
  };

  return (
    <div>
      <div className="tabs" 
      style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc' }}>
        {tabs?.map((tab, index) => (
          <div
            key={index}
            className={`tab ${index === active ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab?.label}
          </div>
        ))}
      </div>
      <div className="tab-content">
        {tabs?.[active]?.content}
      </div>
    </div>
  );
}

export default TabComponent;
