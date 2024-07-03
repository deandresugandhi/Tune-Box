import React, { useState, useEffect } from 'react';
import NumberToNotation from './NumberToNotation';
import NotationToNumber from './NotationToNumber';
import NavBar from './NavBar';
import axios from 'axios';
import NavFooter from './NavFooter';

const ChordTranslator = () => {
  // Truthy value of translateMode represents Number-To-Notation mode, falsy represents Notation-To-Number mode 
  const [translateMode, setTranslateMode] = useState(true);
  const [accidental, setAccidental] = useState('');
  const [assignedKey, setAssignedKey] = useState('C');
  const [wordDocument, setWordDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api');
        setFetchedData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
      <section class="hero hero-custom is-fullheight">
        <NavBar/>
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title is-1 is-size-2-mobile has-text-weight-medium">CHORD TRANSLATOR</h1>
            <div className="tabs is-centered is-toggle">
                <ul> 
                    <li className={translateMode ? "is-active":""} onClick={() => setTranslateMode(true)}>
                      <a class="subtitle is-5 is-size-7-mobile">Number<i className="fa-solid fa-caret-right fa-xs mb-1 ml-3 mr-3"/>
                        Notation
                      </a>
                    </li>
                    <li className={!translateMode ? "is-active":""} onClick={() => setTranslateMode(false)}>
                      <a class="subtitle is-5 is-size-7-mobile">
                        Notation<i className="fa-solid fa-caret-right fa-xs mb-1 ml-3 mr-3"/>Number
                      </a>
                    </li>
                </ul>
            </div>
            {loading ? (
              <>
                <img src="src/assets/loading.gif" alt="Loading" />
                <p className="is-size-4 has-text-weight-light mb-6">LOADING</p>
                <p className="is-size-5 has-text-weight-medium mt-6 has-text-centered">Waiting for API to respond, this can take up to 1 minute.</p>
              </>
            ) : (
              <>
                {translateMode ? (
                  <NumberToNotation 
                    wordDocument={wordDocument} 
                    setWordDocument={setWordDocument} 
                    accidental={accidental} 
                    setAccidental={setAccidental} 
                    assignedKey={assignedKey} 
                    setAssignedKey={setAssignedKey}
                  />
                ) : (
                  <NotationToNumber 
                    wordDocument={wordDocument} 
                    setWordDocument={setWordDocument} 
                    accidental={accidental} 
                    setAccidental={setAccidental} 
                    assignedKey={assignedKey} 
                    setAssignedKey={setAssignedKey}
                  />
                )}
              </>
            )}
          </div>
        </div>
        <NavFooter/>
      </section>
  )
};

export default ChordTranslator;