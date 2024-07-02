import React, { useState } from 'react';
import KeyInput from './KeyInput';
import NavBar from './NavBar';
import NavFooter from './NavFooter';

const NumberToNotation = () => {
  const [accidental, setAccidental] = useState('');
  const [assignedKey, setAssignedKey] = useState('C');
  const [filename, setFilename] = useState('');
  const [ogFilename, setOgFilename] = useState('');
  const [document, setDocument] = useState(null);

  return (
    <>
    <section class="hero hero-custom is-fullheight">
      <NavBar/>
      <KeyInput setAccidental={setAccidental} assignedKey={assignedKey} setAssignedKey={setAssignedKey}/>
      <NavFooter/>
    </section>
    </>
  )
};

export default NumberToNotation;