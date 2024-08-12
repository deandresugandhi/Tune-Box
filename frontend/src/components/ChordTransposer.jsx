import React, { useState, useEffect } from 'react';
import NumberToNotation from './NumberToNotation';
import NotationToNumber from './NotationToNumber';
import NavBar from './NavBar';
import axios from 'axios';
import NavFooter from './NavFooter';
import loadingURL from '../assets/loading-pink.gif';
import KeyInputDualHeader from './KeyInputDualHeader';
import Upload from './Upload';

const ChordTransposer = () => {
  // Truthy value of translateMode represents Number-To-Notation mode, falsy represents Notation-To-Number mode 
  const [translateMode, setTranslateMode] = useState(true);
  const [accidental, setAccidental] = useState('flat');
  const [fromKey, setFromKey] = useState('C');
  const [toKey, setToKey] = useState('C');
  const [wordDocument, setWordDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState(null);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [firstDownload, setFirstDownload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://tune-box.onrender.com/api');
        setFetchedData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Retry logic
        setTimeout(() => {
          console.log('Retrying...');
          fetchData(); // Retry fetching data
        }, 10000); // Retry after 10 seconds (10000 milliseconds)
      }
    };
    fetchData();
  }, []);

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
      const response = await axios.post(`https://tune-box.onrender.com/api/chord-transposer/convert/${accidental}/${fromKey}/${toKey}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob'
      });
      setDownloadLoading(false);
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `${wordDocument.name.replace(/\.[^/.]+$/, '')}-converted-to-${toKey}.docx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
      <section class="hero hero-custom is-fullheight">
        <NavBar/>
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title is-1 is-size-2-mobile has-text-weight-medium">CHORD TRANSPOSER</h1>
            {loading ? (
              <>
                <img src={loadingURL} alt="Loading" />
                <p className="is-size-4 has-text-weight-light mb-6">LOADING</p>
                <p className="is-size-5 has-text-weight-medium mt-6 has-text-centered">Waiting for API to respond, this can take up to 1 minute.</p>
              </>
            ) : (
              <>
                <form onSubmit={handleSubmit}>
                    <KeyInputDualHeader labelText="Transpose from:" labelText2="Transpose to:" fromKey={fromKey} setFromKey={setFromKey} toKey={toKey} setToKey={setToKey} accidental={accidental}/>
                    <label class="control"><p className="is-size-5 is-size-6-mobile">Write accidentals in:</p></label>
                    <div class="field is-grouped is-grouped-centered mb-5">
                        <div class="control">
                            <button type="button" className={`button is-size-4 is-size-5-mobile has-text-weight-bold m-2 ${accidental === "flat" ? "is-dark pink-background has-text-black":"is-primary dark-pink-background has-text-white"}`} onClick={() => {setAccidental("flat")}}>♭</button>
                            <button type="button" className={`button is-size-4 is-size-5-mobile has-text-weight-bold m-2 ${accidental === "sharp" ? "is-dark pink-background has-text-black":"is-primary dark-pink-background has-text-white"}`} onClick={() => {setAccidental("sharp")}}>♯</button>
                        </div>
                    </div>
                    <Upload handler={handleFileChange} wordDocument={wordDocument} />
                    <div class ="field">
                        <div class="control">
                            <button class={`button pink-background is-dark has-text-black is-size-4 has-text-weight-bold m-2 ${downloadLoading ? "is-loading custom-loading":""}`} type="submit">Convert & Download</button>
                            {firstDownload ? (
                              <p className={`${downloadLoading ? "has-text-warning":"has-text-success"}`}>{`${downloadLoading ? "Please wait for file to download...":"Download Success!"}`}</p>
                            ) : (
                              <></>
                            )}
                        </div>
                    </div>
                </form>
              </>
            )}
          </div>
        </div>
        <NavFooter/>
      </section>
  )
};

export default ChordTransposer;