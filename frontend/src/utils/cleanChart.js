import { zipArraysToObject } from "./utilityFunction.js";

const cleanChart = (inputArray, scaleDict, isNumerical) => {
  // For numerical param, set 'true' for chart containing Nashville number chord.
  // set 'false" for chart containing letter chord notation.
  const universalDictionary = isNumerical === true 
    ? zipArraysToObject(scaleDict.numerical_scale_2, scaleDict.numerical_scale)
    : zipArraysToObject(scaleDict.scale_2, scaleDict.scale)

  const changeAllToFlat = (inputArray) => {
    let newArray = inputArray.map(item => {
      return universalDictionary[item] || item;
    });
    return newArray;
  };

  return changeAllToFlat(inputArray) 
}

export default cleanChart
