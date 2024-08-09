import React from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano'
import 'react-piano/dist/styles.css';


const OnScreenPiano = ({ setAssignedKey, setFromKey, setToKey, selectedHeader, accidental }) => {
    const firstNote = MidiNumbers.fromNote('c3');
    const lastNote = MidiNumbers.fromNote('b3');
    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: firstNote,
        lastNote: lastNote,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });
    const keyDictionary = {
        48: "C",
        49: "Db",
        50: "D",
        51: "Eb",
        52: "E",
        53: "F",
        54: "Gb",
        55: "G",
        56: "Ab",
        57: "A",
        58: "Bb",
        59: "B"
    }

    return (
        <div class="piano-container custom-margin-1 mb-5">
            <Piano
                noteRange={{ first: firstNote, last: lastNote }}
                playNote={(midiNumber) => {
                    if (setFromKey && setToKey) {
                        if (selectedHeader === 1) {
                            setFromKey(keyDictionary[midiNumber])
                        } else if (selectedHeader === 2) {
                            setToKey(keyDictionary[midiNumber])
                        }
                    } else if (setAssignedKey) (
                        setAssignedKey(keyDictionary[midiNumber])
                    )
                }}
                stopNote={(midiNumber) => {
                    // Stop playing a given note - see notes below
                }}
                width={500}
                keyboardShortcuts={keyboardShortcuts}
            />
        </div>
    );
};

  
  export default OnScreenPiano