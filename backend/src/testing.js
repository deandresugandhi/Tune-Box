
import { Document } from 'docxyz';
// import cleanChart from './utils/cleanChart.js';
// import convertChart from './utils/convertChart.js';
// import createNewScale from './utils/createNewScale.js';
// import saveResult from './utils/saveResult.js';

// const scaleDict = {
//     numerical_scale: "1 2b 2 3b 3 4 5b 5 6b 6 7b 7".split(' '),
//     numerical_scale_2: "1 1# 2 2# 3 4 4# 5 5# 6 6# 7".split(' '),
//     scale: "A Bb B C Db D Eb E F Gb G Ab".split(' '),
//     scale_2: "A A# B C C# D D# E F F# G G#".split(' ')
// };

// const test = createNewScale('flat', scaleDict, "Bb")

// console.log(test)

// const conversion = (document) => {
//     document.paragraphs.forEach(paragraph => {
//         paragraph.runs.forEach(run => {
//             const condition = run.text.match(/(?<!\()\b7\b(?!\))/g)
//             if (condition) {
//                 console.log(run.text)
//                 console.log('break')
//             }
//         })
//     })   
// };

const isInsideParentheses = (str, index) => {
    let openParenCount = 0;
    for (let i = 0; i < index; i++) {
        if (str[i] === '(') openParenCount++;
        else if (str[i] === ')') openParenCount--;
    }
    return openParenCount > 0;
}

const conversionTwo = (document) => {
    document.paragraphs.forEach(paragraph => {
        paragraph.runs.forEach(run => {
            run.text = run.text.replace(/7/g, (match, offset) => {
                return isInsideParentheses(run.text, offset) ? match : 'replaced';
            }); 
            console.log(run.text)
        })
    })   
};

let testDocument = new Document('./PA Gabungan.docx')

// conversionTwo(testDocument)

const input = "This A is a test A(string (A) inside) and also (testingAbcAbc)";

const result = input.replace(/A/g, (match, offset) => {
    return isInsideParentheses(input, offset) ? match : 'replaced';
});

conversionTwo(testDocument)

// console.log(result);