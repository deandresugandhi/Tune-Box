import { isInsideParentheses } from "./utilityFunction.js";

const transposeChart = (inputArray, scaleDict, toScale) => {
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

  const conversion = (array) => {
    return array.map(text => {
      sortedKeys.forEach(key => {
        const value = transposeDictionary[key];
        const regex = createRegex(key);

        text = text.replace(regex, (match, base, suffix, offset) => {
          return isInsideParentheses(text, offset) ? match : value + (suffix || '');
        });
      });

      return text.replace(/,/g, '');
    });
  };

  // Process the input array
  return conversion(inputArray);
};

export default transposeChart;