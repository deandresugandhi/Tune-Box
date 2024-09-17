import React, { useState } from 'react';
import OnScreenPiano from './OnScreenPiano';


const KeyInputDualHeader = ({ labelText, labelText2, fromKey, setFromKey, toKey, setToKey, accidental, instant=false }) => {
  const [selectedHeader, setSelectedHeader] = useState(1)
  
  const generateAssignedKeyDisplay = (keyRef) => {
    const scaleDictionary = {
      scale: "A Bb B C Db D Eb E F Gb G Ab".split(' '),
      scale_2: "A A# B C C# D D# E F F# G G#".split(' ')
    };
  
    const conversionDictionary = scaleDictionary.scale.reduce((acc, key, index) => {
        acc[key] = scaleDictionary.scale_2[index];
        return acc;
    }, {});

    const majorKey = accidental === "flat" 
      ? keyRef 
      : conversionDictionary[keyRef] || keyRef

    const scaleToUse = accidental === "flat" 
      ? scaleDictionary.scale 
      : scaleDictionary.scale_2;

    const minorKeyIndex = (scaleToUse.indexOf(majorKey) - 3 + 12) % 12;
    const parallelMinorKey = scaleToUse[minorKeyIndex] + "m"
    return `${majorKey} / ${parallelMinorKey}`
  }

  let fromKeyDisplay = generateAssignedKeyDisplay(fromKey)
  let toKeyDisplay = generateAssignedKeyDisplay(toKey)

  return (
    <div class ="field">
      <div class="control custom-margin-1">
        <div className={`tabs ${instant == true ? "blue-tab" : "pink-tab"} is-centered is-toggle`}>
          <ul> 
            <li className={selectedHeader === 1 ? "is-active":""} onClick={() => setSelectedHeader(1)}>
              <a className="is-flex is-flex-direction-column">
                <h2 class="subtitle is-5 is-size-6-mobile">{labelText}</h2>
                <h2 class={`subtitle is-2 is-size-4-mobile ${instant == true ? "blue-text" : "pink-text"} has-text-weight-bold key-display-margin`}>{fromKeyDisplay}</h2>
              </a>
            </li>
            <li>
              <i className="fa-solid fa-right-long fa-xl chord-arrow"/>
            </li>
            <li className={selectedHeader === 2 ? "is-active":""} onClick={() => setSelectedHeader(2)}>
              <a className="is-flex is-flex-direction-column">
                <h2 class="subtitle is-5 is-size-6-mobile">{labelText2}</h2>
                <h2 class={`subtitle is-2 is-size-4-mobile ${instant == true ? "blue-text" : "pink-text"} has-text-weight-bold key-display-margin`}>{toKeyDisplay}</h2>
              </a>
            </li>
          </ul>
        </div>
        <OnScreenPiano setFromKey={setFromKey} setToKey={setToKey} accidental={accidental} selectedHeader={selectedHeader}/>
      </div>
    </div>
  );
};

  
  export default KeyInputDualHeader