const convertChart = async (document, fileName, newScaleList, scaleDict, newScale) => {
  const transposeDictionary = scaleDict.numerical_scale.reduce((acc, key, idx) => {
    acc[key] = newScale[idx];
    return acc;
  }, {});

  const replaceParagraph = (paragraph) => {
    paragraph.children.forEach(run => {
      // Escape special characters for accurate matching
      const escapedText = run.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(Object.keys(transposeDictionary).join('|'), 'g');
      run.text = run.text.replace(regex, match => transposeDictionary[match]);
    });
  };

  document.eachParagraph(replaceParagraph);

  return document
};