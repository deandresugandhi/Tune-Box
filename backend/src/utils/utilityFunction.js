export const zipArraysToObject = (keys, values) => {
  return keys.reduce((acc, key, index) => {
    acc[key] = values[index];
    return acc;
  }, {});
}

export const isInsideParentheses = (str, index) => {
  let openParenCount = 0;
  for (let i = 0; i < index; i++) {
      if (str[i] === '(') openParenCount++;
      else if (str[i] === ')') openParenCount--;
  }
  return openParenCount > 0;
}



export const transposeChord = (chord, offset, scale) => {
  const length = scale.length;
  const startIndex = scale.indexOf(chord);
  if (startIndex === -1) {
    throw new Error("Chord not found in scale");
  }

  // Calculate the new index with wrap-around
  const newIndex = (startIndex + offset + length) % length;

  return scale[newIndex];
};
