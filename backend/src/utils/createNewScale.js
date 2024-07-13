import { zipArraysToObject } from "./utilityFunction.js";

const createNewScale = (accidental, scaleDict, assignedKey) => {
      
    const conversionDictionary = zipArraysToObject(scaleDict.scale, scaleDict.scale_2)
    
    const chosenScale = accidental === 'flat' ? scaleDict.scale : scaleDict.scale_2;
    const assignedKeyConverted = accidental === 'flat' 
        ? assignedKey
        : conversionDictionary[assignedKey]

    
    const posScale = chosenScale.indexOf(assignedKeyConverted);
    const newScale = [];

    for (let i = 0; i < 12; i++) {
        newScale.push(chosenScale[(posScale + i) % 12]);
    }

    return newScale;
}

export default createNewScale