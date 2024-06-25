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

const document = null;

Object.keys(universalDictionary).forEach(k => {
    const v = universalDictionary[k];
    document.paragraphs.forEach(p => {
        if (p.text.includes(k)) {
            p.text = p.text.replace(new RegExp(k, 'g'), v);
        }
    });
});