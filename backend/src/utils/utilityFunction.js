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