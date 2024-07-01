import React, { useState } from 'react';
import KeyInput from './KeyInput';

const NumberToNotation = () => {
  const [accidental, setAccidental] = useState('');
  const [assignedKey, setAssignedKey] = useState('');
  const [filename, setFilename] = useState('');
  const [ogFilename, setOgFilename] = useState('');
  const [document, setDocument] = useState(null);

  return (
    <>
      <KeyInput setAccidental={setAccidental} assignedKey={assignedKey} setAssignedKey={setAssignedKey}/>
    </>
  )
};

export default NumberToNotation;