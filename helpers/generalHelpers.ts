import { RegionMap } from "../interfaces/data";


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

export const getRegionNameByRegionCode = (data: RegionMap, locale: string, regionSelected: string) => {
    if(data){
        const region = data[regionSelected];

        if ( regionSelected === 'WLRD' ){
            switch (locale) {
                case 'es':
                    return 'Mundo';
                case 'pt':
                    return 'Mundo';
                default:
                    return 'World';
            }
        }
        if (!region && region !== 'WLRD') {
            throw new Error(`No region found with code: ${regionSelected}`);
        }

        switch (locale) {
            case 'es':
                return region.region_name_es;
            case 'pt':
                return region.region_name_pt;
            default:
                return region.region_name;
        }
    }
    return '';
}

export const formatTextForPlotly = (width: number, text: string, substring?: number): string => {

    if (text.length > substring! ) {
      return text.slice(0, substring!)+"- " + '<br>' + text.slice(substring!);
    }
    // if (width > 991) {
    //   return text;
    // }
    return text;
  };

// export const formatTextForPlotly = (substringNumber: number, text: string, wordsToFind: string[]): string => {
//     for (let word of wordsToFind) {
//         const index = text.indexOf(word);

//         if (index !== -1 && index < substringNumber) {
//         return text.slice(0, index) + '<br>' + text.slice(index);
//         }
//     }

//     if (text.length > substringNumber) {
//         return text.slice(0, substringNumber) + '<br>' + text.slice(substringNumber);
//     }

//     return text;
// };

export type Country = {
    id: number | string | undefined,
    country: string,
    iso3: string,
    country_es?: string | null | undefined,
    country_pt?: string | null | undefined
};

export const createCountryArrays = (countries: Country[]) => {
    const englishCountries = countries.map(({id, country, iso3}) => ({id, country, iso3}));
    const spanishCountries = countries.map(({id, country_es, iso3}) => ({id, country: country_es, iso3}));
    const portugueseCountries = countries.map(({id, country_pt, iso3}) => ({id, country: country_pt, iso3}));

    return [englishCountries, spanishCountries, portugueseCountries];
}