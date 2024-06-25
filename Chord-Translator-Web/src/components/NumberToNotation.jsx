import React, { useState } from 'react';

// App configuration functions
const NumberToNotation = () => {
  const [accidental, setAccidental] = useState('');
  const [assignedKey, setAssignedKey] = useState('');
  const [filename, setFilename] = useState('');
  const [ogFilename, setOgFilename] = useState('');
  const [document, setDocument] = useState(null);
  const scaleDict = {
    numerical_scale: "1 2b 2 3b 3 4 5b 5 6b 6 7b 7".split(' '),
    numerical_scale_2: "1 1# 2 2# 3 4 4# 5 5# 6 6# 7".split(' '),
    scale: "A Bb B C Db D Eb E F Gb G Ab".split(' '),
    scale_2: "A A# B C C# D D# E F F# G G#".split(' ')
  };

  

  const cleanChart = () => {
    const universalDictionary = scaleDict.numerical_scale_2.reduce((acc, key, idx) => {
      acc[key] = scaleDict.numerical_scale[idx];
      return acc;
    }, {});

    if (document) {
      document.paragraphs.forEach(p => {
        Object.keys(universalDictionary).forEach(key => {
          if (p.text.includes(key)) {
            p.text = p.text.replace(new RegExp(key, 'g'), universalDictionary[key]);
          }
        });
      });
    }
  };

  const convertChart = (newScaleList) => {
    const transposeDictionary = scaleDict.numerical_scale.reduce((acc, key, idx) => {
      acc[key] = newScaleList[idx];
      return acc;
    }, {});

    if (document) {
      document.paragraphs.forEach(p => {
        Object.keys(transposeDictionary).forEach(key => {
          if (p.text.includes(key)) {
            p.text = p.text.replace(new RegExp(key, 'g'), transposeDictionary[key]);
          }
        });
      });
    }
  };

  const saveResult = () => {
    if (document) {
      document.save(filename);
    }
  };

  return {
    accidental, setAccidental,
    assignedKey, setAssignedKey,
    filename, setFilename,
    ogFilename, setOgFilename,
    document, setDocument,
    scaleDict,
    createNewScale,
    cleanChart,
    convertChart,
    saveResult
  };
};

// Example React Component using the configuration
const App = () => {
  const {
    accidental, setAccidental,
    assignedKey, setAssignedKey,
    filename, setFilename,
    ogFilename, setOgFilename,
    document, setDocument,
    createNewScale,
    cleanChart,
    convertChart,
    saveResult
  } = useAppConfig();

  // ... (rest of your component logic and JSX here)
};

export default App;