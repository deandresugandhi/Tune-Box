import { isInsideParentheses } from "./utilityFunction";

const convertChart = (document, scaleDict, newScale, isNumerical) => {
  // For numerical param, set 'true' for chart containing Nashville number chord.
  // set 'false" for chart containing letter chord notation.
  const transposeDictionary = scaleDict.numerical_scale.reduce((acc, key, idx) => {
    acc[key] = newScale[idx];
    return acc;
  }, {});

  const conversion = (document) => {
    document.paragraphs.forEach(paragraph => {
      paragraph.runs.forEach(run => {
        if (run.bold == null) {
          for (const[key, value] of Object.entries(transposeDictionary)) {
            const { replacedValue, replacementValue } = {
              replacedValue: isNumerical === true
                ? new RegExp(key, 'g')
                : new RegExp(value, 'g'),
              replacementValue: isNumerical === true
                ? value
                : key
            }
            run.text = run.text.replace(replacedValue, (match, offset) => {
              return isInsideParentheses(run.text, offset) ? match : replacementValue;
            }); 
            run.text = run.text.replace(/,/g, '');
          };
        };
      });
    });
  };


  conversion(document)

  return document
};

export default convertChart