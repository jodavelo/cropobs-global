import { useRouter } from 'next/router';
import { Indicator } from './';
import styles from './indicators.module.css';

const items = [
    {
        imgUrl: '/home/home-indicator1.png',
        indicator: 120,
        label: 'lorem ipsum',
        text:{
            en: "eng",
            es: "esp",
            pt: "por",
        },
        prefix: '',
        sufix: '',
        decimals: 0,
    },
    {
        imgUrl: '/home/home-indicator3.png',
        indicator: 120,
        label: 'lorem ipsum',
        prefix: '',
        sufix: '',
        decimals: 0,
    },
    {
        imgUrl: '/home/home-indicator5.png',
        indicator: 120,
        label: 'lorem ipsum',
        prefix: '',
        sufix: '',
        decimals: 0,
    },
    {
        imgUrl: '/home/home-indicator2.png',
        indicator: 120,
        label: 'lorem ipsum',
        prefix: '',
        sufix: '',
        decimals: 0,
    },
    {
        imgUrl: '/home/home-indicator4.webp',
        indicator: 120,
        label: 'lorem ipsum',
        prefix: '',
        sufix: '',
        decimals: 0,
    },
    
]

export const Indicators = () => {

    const { locale } = useRouter();

    return (
        <div className={ styles['indicators-container'] }>
            {
                items.map((item, idx) => (
                    <Indicator key={ idx } imgUrl={ item.imgUrl } indicator={ item.indicator } label={ item.text? item.text[locale as keyof typeof item.text] : item.label } prefix={item.prefix} sufix={item.sufix}  decimals={item.decimals}/>
                ))
            }
        </div>
    )
}
