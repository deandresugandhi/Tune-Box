import React, { useState } from 'react';


const CreateNewScale = ({ accidental, setAccidental, assignedKey, setAssignedKey }) => {
    const [newScaleList, setNewScaleList] = useState([]);
    const chosenScale = accidental === 'Flat' ? scaleDict.scale : scaleDict.scale_2;
    const posScale = chosenScale.indexOf(assignedKey);

    for (let i = 0; i < 12; i++) {
      newScaleList.push(chosenScale[(posScale + i) % 12]);
    }

    return (
        <div>
            <label>INSERT KEY HERE</label>
            <textarea
                type="text"
                value={assignedKey}
                onInput={e => setAssignedKey(e.target.value)}
            />
            <button onClick={() => setAccidental("Flat")}></button>
            <button onClick={() => setAccidental("Flat")}></button>
        </div>
    );
};

  
  export default CreateNewScale