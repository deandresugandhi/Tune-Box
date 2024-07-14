
import { Document } from 'docxyz';
import cleanChart from './utils/cleanChart.js';
import convertChart from './utils/convertChart.js';
import createNewScale from './utils/createNewScale.js';
import saveResult from './utils/saveResult.js';
import { transposeChord } from './utils/utilityFunction.js';


const document = new Document('./CONVERTED.docx');
const scaleDict = {
    numerical_scale: "1 2b 2 3b 3 4 5b 5 6b 6 7b 7".split(' '),
    numerical_scale_2: "1 1# 2 2# 3 4 4# 5 5# 6 6# 7".split(' '),
    scale: "A Bb B C Db D Eb E F Gb G Ab".split(' '),
    scale_2: "A A# B C C# D D# E F F# G G#".split(' ')
};
let isNumerical = false;
let accidental = "flat"
let assignedKey = "A";

let newScale = createNewScale(accidental, scaleDict, assignedKey) 
let cleanedDocument = cleanChart(document, scaleDict, isNumerical)
let convertedDocument = convertChart(cleanedDocument, scaleDict, newScale, isNumerical)

saveResult(convertedDocument, './CONVERTEDBACK.docx')