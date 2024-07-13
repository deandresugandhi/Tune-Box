import { zipArraysToObject } from "./utilityFunction.js";

const cleanChart = (document, scaleDict, isNumerical) => {
  // For numerical param, set 'true' for chart containing Nashville number chord.
  // set 'false" for chart containing letter chord notation.
  const universalDictionary = isNumerical === true 
    ? zipArraysToObject(scaleDict.numerical_scale_2, scaleDict.numerical_scale)
    : zipArraysToObject(scaleDict.scale_2, scaleDict.scale)

  const changeAllToFlat = (document) => {
    document.paragraphs.forEach(paragraph => {
      paragraph.runs.forEach(run => {
        for (const[key, value] of Object.entries(universalDictionary)) {
          if (run.bold == null) {
            run.text = run.text.replace(key, value);
            run.text = run.text.replace(/,/g, '');
          };
        };
      });
    });
  };

  changeAllToFlat(document)

  return document
}

export default cleanChart
