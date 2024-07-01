const convertChart = (document, scaleDict, newScale) => {
  const transposeDictionary = scaleDict.numerical_scale.reduce((acc, key, idx) => {
    acc[key] = newScale[idx];
    return acc;
  }, {});

  const numberToChord = (document) => {
    document.paragraphs.forEach(paragraph => {
      paragraph.runs.forEach(run => {
        for (const[key, value] of Object.entries(transposeDictionary)) {
          if (run.bold == null) {
            run.text = run.text.replace(key, value);
            run.text = run.text.replace(/,/g, '');
          };
        };
      });
    });
  };

  numberToChord(document)

  return document
};

export default convertChart