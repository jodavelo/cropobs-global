
import { useRouter } from 'next/router';
import styles from './Topbar.module.css';
import Link from 'next/link';
import { CSSProperties } from 'react';

const styleSelected: CSSProperties = {
    color: '#4e4e4e'
}

const style: CSSProperties = {
}

export const TopbarOptions = () => {

    const { locale, locales, defaultLocale, asPath } = useRouter();
    const languages = locales?.map( language => {
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
            "locale": language,
            label
        }
    })

    //console.log( languages )

    return (
        <div
            className={ styles['topbar-options'] }
        >
            {
                languages!.map( optionLocale => (
                    <div key={ optionLocale.locale } className={ styles['options-language'] }><Link href={ asPath } locale={ optionLocale.locale } legacyBehavior ><a className={styles['link-options']} style ={ locale == optionLocale.locale ? styleSelected : style }>{ optionLocale.label }</a></Link></div>        
                ))
            }
        
        </div>
    )
}
