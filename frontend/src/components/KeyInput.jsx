import React, { useState } from 'react';
import OnScreenPiano from './OnScreenPiano';


const KeyInput = ({ labelText, assignedKey, setAssignedKey }) => {
  return (
    <div class ="field">
      <div class="control custom-margin-1">
          <h2 class="subtitle is-5 is-size-6-mobile">{labelText}</h2>
          <h2 class="subtitle is-1 is-size-2-mobile has-text-info has-text-weight-bold">{assignedKey}</h2>
          <OnScreenPiano setAssignedKey={setAssignedKey}/>
      </div>
    </div>
  );
};

  
  export default KeyInput