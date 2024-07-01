const cleanChart = (document, scaleDict) => {
  const zipArraysToObject = (keys, values) => {
    return keys.reduce((acc, key, index) => {
      acc[key] = values[index];
      return acc;
    }, {});
  };
    
  const universalDictionary = zipArraysToObject(
    scaleDict.numerical_scale_2, 
    scaleDict.numerical_scale
  );

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
