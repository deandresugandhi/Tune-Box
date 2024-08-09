import { isInsideParentheses } from "./utilityFunction.js";

const transposeChart = (document, scaleDict, toScale) => {
  // For numerical param, set 'true' for chart containing Nashville number chord.
  // set 'false' for chart containing letter chord notation.

  const chosenScale = scaleDict.numerical_scale

  const transposeDictionary = chosenScale.reduce((acc, key, idx) => {
    acc[key] = toScale[idx];
    return acc;
  }, {});

  const sortedKeys = Object.keys(transposeDictionary).sort((a, b) => b.length - a.length);
  const suffixes = ['m', 'M', 'maj', 'min', 'dim', 'aug', 'sus', '7', '9', '11', '13'];

  const createRegex = (base) => {
    const suffixPattern = suffixes.map(suffix => `(?:${suffix})`).join('|');
    return new RegExp(`\\b(${base})(${suffixPattern})?\\b`, 'g');
  };

  const conversion = (document) => {
    document.paragraphs.forEach(paragraph => {
      paragraph.runs.forEach(run => {
        if (run.bold == null) {
          sortedKeys.forEach(key => {
            const value = transposeDictionary[key];
            const replacedValue = createRegex(key)
            const replacementValue = value
            run.text = run.text.replace(replacedValue, (match, base, suffix, offset) => {
              return isInsideParentheses(run.text, offset) ? match : replacementValue + (suffix || '');
            });
          });
          run.text = run.text.replace(/,/g, '');
        }
      });
    });
  };

  conversion(document);

  return document;
};

export default transposeChart;