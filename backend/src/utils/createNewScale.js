import { zipArraysToObject, transposeChord } from "./utilityFunction.js";

const createNewScale = (accidental, scaleDict, assignedKey, isNumerical) => {
    
    
    const conversionDictionary = zipArraysToObject(scaleDict.scale, scaleDict.scale_2)
    
    const chosenScaleNumerical = accidental === 'flat' 
        ? scaleDict.scale : scaleDict.scale_2;
    const chosenScaleNotation = accidental === 'flat' 
        ? scaleDict.numerical_scale : scaleDict.numerical_scale_2;
    
    const assignedKeyConverted = accidental === 'flat' 
        ? assignedKey
        : conversionDictionary[assignedKey]

    
    if (isNumerical === true) {
        const posScale = chosenScaleNumerical.indexOf(assignedKeyConverted);
        const newScale = [];

        for (let i = 0; i < 12; i++) {
            newScale.push(chosenScaleNumerical[(posScale + i) % 12]);
        }

        return newScale;
    } else {
        const posScale = scaleDict.scale.indexOf(assignedKey)
        const newScale = [];

        for (let i = 0; i < 12; i++) {
            const newKey = transposeChord(chosenScaleNotation[i], -posScale, chosenScaleNotation)
            newScale.push(newKey);
        }

        return newScale;
    }
}

export default createNewScale