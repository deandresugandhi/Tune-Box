import React, { useState } from 'react';
import OnScreenPiano from './OnScreenPiano';


const KeyInput = ({ labelText, assignedKey, setAssignedKey, accidental, instant }) => {
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

  let assignedKeyDisplay = generateAssignedKeyDisplay(assignedKey)
  let keyDisplayClass = `subtitle is-1 is-size-2-mobile has-text-weight-bold ${instant === true ? "orange" : "has-text-info"}`

  return (
    <div class ="field">
      <div class="control custom-margin-1">
        <h2 class="subtitle is-5 is-size-6-mobile">{labelText}</h2>
        <h2 class={keyDisplayClass}>{assignedKeyDisplay}</h2>
        <OnScreenPiano setAssignedKey={setAssignedKey} accidental={accidental}/>
      </div>
    </div>
  );
};

  
  export default KeyInput