import React, { useEffect, useState } from 'react';
import KeyInput from './KeyInput';
import Upload from './Upload';
import cleanChart from '../utils/cleanChart.js';
import convertChart from '../utils/convertChart.js';
import createNewScale from '../utils/createNewScale.js';
import axios from 'axios';


const NotationToNumber = ({ wordDocument, setWordDocument, accidental, setAccidental, assignedKey, setAssignedKey, instant=false }) => {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [firstDownload, setFirstDownload] = useState(false);
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
    let cleanedChart = cleanChart(newArray, scaleDict, false)
    let newScale = createNewScale(accidental, scaleDict, assignedKey, false)
    let convertedChart = convertChart(cleanedChart, scaleDict, newScale, false)
    
    setCalculatedValue(convertedChart.join(" "))
  }, [toTranslate, assignedKey, accidental]);

  // Handle change event
  const handleChange = (event) => {
    setToTranslate(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      setWordDocument(file);
    } else {
      alert('Please select a valid .docx file!');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!wordDocument) {
        alert('Please select a file to convert.');
        return;
    } else if (!accidental) {
        alert('Please select preferred accidental.')  
    }

    setFirstDownload(true);
    const formData = new FormData();
    formData.append('file', wordDocument);

    try {
        setDownloadLoading(true);
        const response = await axios.post(`https://tune-box.onrender.com/api/chord-translator/convert/notation/${accidental}/${assignedKey}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob'
        });
        setDownloadLoading(false);
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `${wordDocument.name.replace(/\.[^/.]+$/, '')}-converted-in-${assignedKey}-to-number.docx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        console.log('File uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
          <KeyInput labelText="Translate from Key:" assignedKey={assignedKey} setAssignedKey={setAssignedKey} accidental={accidental} instant={instant}/>
          <label class="control"><p className="is-size-5 is-size-6-mobile">Write accidentals in:</p></label>
          <div class="field is-grouped is-grouped-centered mb-5">
              <div class="control">
                <button type="button" className={`button is-size-4 is-size-5-mobile has-text-weight-bold m-2 ${accidental === "flat" ? `${instant == true ? "is-dark orange-background" : "is-dark"} has-text-black`:`${instant == true ? "is-primary dark-orange-background" : "is-primary"} has-text-white`}`} onClick={() => {setAccidental("flat")}}>♭</button>
                <button type="button" className={`button is-size-4 is-size-5-mobile has-text-weight-bold m-2 ${accidental === "sharp" ? `${instant == true ? "is-dark orange-background" : "is-dark"} has-text-black`:`${instant == true ? "is-primary dark-orange-background" : "is-primary"} has-text-white`}`} onClick={() => {setAccidental("sharp")}}>♯</button>
              </div>
          </div>
          {!instant ? (
            <>
              <Upload handler={handleFileChange} wordDocument={wordDocument} />
              <div class ="field">
                  <div class="control">
                      <button class={`button is-dark has-text-black is-size-4 has-text-weight-bold m-2 ${downloadLoading ? "is-loading custom-loading":""}`} type="submit">Convert & Download</button>
                      {firstDownload ? (
                        <p className={`${downloadLoading ? "has-text-warning":"has-text-success"}`}>{`${downloadLoading ? "Please wait for file to download...":"Download Success!"}`}</p>
                      ) : (
                        <></>
                      )}
                  </div>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
      </form>
    );
};

  
export default NotationToNumber