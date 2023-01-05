
export const translation = ( locales: string[] ) => {
    if( locales.length < 1 ) return;
    const languages = locales.map( language => {
        let label = '';
        switch (language) {
            case 'en':
                label = 'ENG'
                break;
            case 'es':
                label = 'ESP'
                break;
            default:
                label = 'POR'
                break;
        }
        return {
            locale: language,
            label
        }
    })
}