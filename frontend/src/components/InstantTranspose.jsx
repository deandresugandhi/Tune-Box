import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import NavFooter from './NavFooter';
import KeyInputDualHeader from './KeyInputDualHeader';
import cleanChart from '../utils/cleanChart.js';
import transposeChart from '../utils/transposeChart.js';
import convertChart from '../utils/convertChart.js'
import createNewScale from '../utils/createNewScale.js';


const InstantTranspose = () => {
  const [accidental, setAccidental] = useState('flat');
  const [fromKey, setFromKey] = useState('C');
  const [toKey, setToKey] = useState('C');
  const [toTranslate, setToTranslate] = useState("");
  const [calculatedValue, setCalculatedValue] = useState([]);

  const scaleDict = {
    numerical_scale: "1 2b 2 3b 3 4 5b 5 6b 6 7b 7".split(' '),
    numerical_scale_2: "1 1# 2 2# 3 4 4# 5 5# 6 6# 7".split(' '),
    scale: "A Bb B C Db D Eb E F Gb G Ab".split(' '),
    scale_2: "A A# B C C# D D# E F F# G G#".split(' ')
  };
  
  useEffect(() => {
    let newArray = toTranslate.split(" ");
    let fromScale = createNewScale(accidental, scaleDict, fromKey, false)
    let toScale = createNewScale(accidental, scaleDict, toKey, true)
    let cleanedChart = cleanChart(newArray, scaleDict, false)
    let convertedChart = convertChart(cleanedChart, scaleDict, fromScale, false)
    let transposedChart = transposeChart(convertedChart, scaleDict, toScale)
    
    setCalculatedValue(transposedChart.join(" "))
  }, [toTranslate, fromKey, toKey, accidental]);

  // Handle change event
  const handleChange = (event) => {
    setToTranslate(event.target.value);
  };

  return (
    <section class="hero hero-custom is-fullheight">
      <NavBar/>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1 is-size-2-mobile has-text-weight-medium">INSTANT TRANSPOSE</h1>
          <KeyInputDualHeader labelText="Transpose from:" labelText2="Transpose to:" fromKey={fromKey} setFromKey={setFromKey} toKey={toKey} setToKey={setToKey} accidental={accidental} instant={true}/>
          <label class="control"><p className="is-size-5 is-size-6-mobile">Write accidentals in:</p></label>
          <div class="field is-grouped is-grouped-centered mb-5">
              <div class="control">
                  <button type="button" className={`button is-size-4 is-size-5-mobile has-text-weight-bold m-2 ${accidental === "flat" ? "is-dark blue-background has-text-black":"is-primary dark-blue-background has-text-white"}`} onClick={() => {setAccidental("flat")}}>♭</button>
                  <button type="button" className={`button is-size-4 is-size-5-mobile has-text-weight-bold m-2 ${accidental === "sharp" ? "is-dark blue-background has-text-black":"is-primary dark-blue-background has-text-white"}`} onClick={() => {setAccidental("sharp")}}>♯</button>
              </div>
          </div>
          <div className="field is-flex is-flex-direction-column is-align-items-center">
            <label className="label">Chords to Translate</label>
            <div className="control">
              <textarea 
                className="textarea chord-text" 
                placeholder="Type chords here, separated by whitespace"
                value={toTranslate}
                onChange={handleChange}
              />
            </div>
          </div>
          <i className="fa-solid fa-down-long fa-2xl mt-6"/>
          <div className="field mt-6 is-flex is-flex-direction-column is-align-items-center">
            <label className="label">Translated Chord</label>
            <div className="control">
              <textarea 
                className="textarea chord-text" 
                placeholder="Translated chords will appear here"
                value={calculatedValue}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <NavFooter/>
    </section>
  )
};

export default InstantTranspose;