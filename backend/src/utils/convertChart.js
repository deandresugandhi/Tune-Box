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
        for (const[key, value] of Object.entries(transposeDictionary)) {
          if (run.bold == null) {
            run.text = isNumerical === true 
              ? run.text.replace(key, value) 
              : run.text.replace(value, key)
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