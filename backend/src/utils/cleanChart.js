const cleanChart = async (document, scaleDict) => {
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

  const replaceParagraph = (paragraph) => {
    paragraph.children.forEach(run => {
      // Escape special characters for accurate matching
      const escapedText = run.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(Object.keys(universalDictionary).join('|'), 'g');
      run.text = run.text.replace(regex, match => universalDictionary[match]);
    });
  };

  document.body.forEachChild(replaceParagraph);

  return document
}

export default cleanChart
