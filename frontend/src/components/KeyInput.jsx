import React, { useState } from 'react';


const KeyInput = ({ setAccidental, assignedKey, setAssignedKey }) => {
    return (
        <section class="section">
            <div class="field is-grouped">
                <p class="control is-expanded">
                    <textarea
                        class="input is-small is-primary"
                        type="text"
                        value={assignedKey}
                        onInput={e => setAssignedKey(e.target.value)}
                        placeholder="INSERT KEY HERE"
                    />
                </p>
                <p class="control">
                    <button class="button is-white" onClick={() => setAccidental("flat")}>Flat</button>
                    <button class="button is-white"onClick={() => setAccidental("sharp")}>Sharp</button>
                </p>
            </div>
        </section>
    );
};

  
  export default KeyInput