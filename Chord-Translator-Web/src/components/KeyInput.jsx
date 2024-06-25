import React, { useState } from 'react';


const KeyInput = ({ accidental, setAccidental, assignedKey, setAssignedKey, newScaleList, setNewScaleList, scaleDict }) => {
    
    // const chosenScale = accidental === 'flat' ? scaleDict.scale : scaleDict.scale_2;
    // const posScale = chosenScale.indexOf(assignedKey);
    // const modifiedScale = [];

    // for (let i = 0; i < 12; i++) {
    //   modifiedScale.push(chosenScale[(posScale + i) % 12]);
    // }

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