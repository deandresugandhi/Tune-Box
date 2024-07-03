import React, { useState } from 'react';
import KeyInput from './KeyInput';
import Upload from './Upload';
import axios from 'axios';


const NumberToNotation = ({ wordDocument, setWordDocument, accidental, setAccidental, assignedKey, setAssignedKey }) => {

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

    const formData = new FormData();
    formData.append('file', wordDocument);

    try {
        const response = await axios.post(`https://tune-box.onrender.com/api/convert/${accidental}/${assignedKey}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob'
        });
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `${wordDocument.name.replace(/\.[^/.]+$/, '')}-converted-in-${assignedKey}.docx`);
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
                  <KeyInput labelText="Translate to Key:" assignedKey={assignedKey} setAssignedKey={setAssignedKey}/>
                  <label class="control"><p className="is-size-5 is-size-6-mobile">Write accidentals in:</p></label>
                  <div class="field is-grouped is-grouped-centered mb-5">
                      <div class="control">
                          <button type="button" className={`button is-size-4 is-size-5-mobile has-text-weight-bold m-2 ${accidental === "flat" ? "is-dark has-text-black":"is-primary has-text-white"}`} onClick={() => {setAccidental("flat")}}>♭</button>
                          <button type="button" className={`button is-size-4 is-size-5-mobile has-text-weight-bold m-2 ${accidental === "sharp" ? "is-dark has-text-black":"is-primary has-text-white"}`} onClick={() => {setAccidental("sharp")}}>♯</button>
                      </div>
                  </div>
                  <Upload handler={handleFileChange} wordDocument={wordDocument} />
                  <div class ="field">
                      <div class="control">
                          <button class="button is-dark has-text-black is-size-4 has-text-weight-bold m-2" type="submit">Convert & Download</button>
                      </div>
                  </div>
              </form>

    );
};

  
  export default NumberToNotation