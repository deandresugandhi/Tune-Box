import React, { useState } from 'react';


const KeyInput = ({ accidental, setAccidental, assignedKey, setAssignedKey, newScaleList, setNewScaleList, scaleDict }) => {
    return (
        <div>
            <label>INSERT KEY HERE</label>
            <textarea
                type="text"
                value={assignedKey}
                onInput={e => setAssignedKey(e.target.value)}
            />
            <button onClick={() => setAccidental("flat")}></button>
            <button onClick={() => setAccidental("sharp")}></button>
        </div>
    );
};

  
  export default KeyInput