import React, { useState } from 'react';
import OnScreenPiano from './OnScreenPiano';


const KeyInput = ({ setAccidental, assignedKey, setAssignedKey }) => {
    return (
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title is-1 has-text-weight-medium">CHORD TRANSLATOR</h1>
                <h2 class="subtitle is-4 has-text-dark">Number to Notation</h2>
                <div class ="field mt-6">
                    <div class="control">
                        <h2 class="subtitle is-5">Translate to Key:</h2>
                        <h2 class="subtitle is-1 has-text-info has-text-weight-bold">{assignedKey}</h2>
                        <OnScreenPiano setAssignedKey={setAssignedKey}/>
                    </div>
                </div>
                <label class="control">Write accidentals in:</label>
                <div class="field is-grouped is-grouped-centered mb-5">
                    <div class="control">
                        <button class="button is-primary has-text-white is-size-4 has-text-weight-bold m-2" onClick={() => setAccidental("flat")}>♭</button>
                        <button class="button is-primary has-text-white is-size-4 has-text-weight-bold m-2"onClick={() => setAccidental("sharp")}>♯</button>
                    </div>
                </div>
                <div class ="field">
                    <div class="control">
                        <button class="button is-primary has-text-white is-size-6 has-text-weight-normal m-2"onClick={() => setAccidental("sharp")}>Upload DOCX file</button>
                    </div>
                </div>
                <div class ="field">
                    <div class="control">
                        <button class="button is-dark has-text-black is-size-4 has-text-weight-bold m-2"onClick={() => setAccidental("sharp")}>Convert</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

  
  export default KeyInput