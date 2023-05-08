

export const removeCommasFromString = (text: string): string => {
    return text.replaceAll(',', '');
} 


type DecimalAdjustType = 'floor' | 'round' | 'ceil';

export const decimalAdjust = (type: DecimalAdjustType, value: number, exp: number): number => {
    const mathFunc = Math[type];
    if (typeof exp === 'undefined' || +exp === 0) {
        return mathFunc(value);
    }

    value = +value;
    exp = +exp;
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Shift
    let valueArray = value.toString().split('e');
    let newValue = mathFunc(+(valueArray[0] + 'e' + (valueArray[1] ? (+valueArray[1] - exp) : -exp)));
    // Shift back
    let newValueArray = newValue.toString().split('e');
    return +(newValueArray[0] + 'e' + (newValueArray[1] ? (+newValueArray[1] + exp) : exp));
};

export const commarize = (value: number): string | number => {
    // Alter numbers larger than 1k
    if (value >= 1e3) {
        const units = ['k', 'M', 'B', 'T'];

        const order = Math.floor(Math.log(value) / Math.log(1000));

        const unitname = units[order - 1];
        const num = decimalAdjust('round', value / 1000 ** order, -1);

        // output number remainder + unitname
        return num + unitname;
    }
  
    // return formatted original number
    return decimalAdjust('round', value, -2);
};