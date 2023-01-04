
import { useRouter } from 'next/router';
import styles from './Topbar.module.css';
import Link from 'next/link';

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

    console.log( languages )

    return (
        <div
            className={ styles['topbar-options'] }
        >
            {
                languages!.map( optionLocale => (
                    <div key={ optionLocale.locale } className={ styles['options-language'] }><Link href={ asPath } locale={ optionLocale.locale } legacyBehavior >{ optionLocale.label }</Link></div>        
                ))
            }
        
        </div>
    )
}
