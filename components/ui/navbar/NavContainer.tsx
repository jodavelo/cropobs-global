import { FC, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Nav } from 'react-bootstrap';
import { v4 as uuidv4  } from 'uuid';
import styles from './Navbar.module.css';


import { menuItems, NavLink } from './';

interface Props {
    expand: string
}


export const NavContainer: FC<Props> = ({ expand }) => {

    const { locale } = useRouter();

    const [surfaceContextText, setSurfaceContextText] = useState('');
    const [productionText, setProductionText] = useState('');
    const [productionValueText, setProductionValueText] = useState('');
    const [consumptionText, setConsumptionText] = useState('');
    const [pricesText, setPricesText] = useState('');
    const [domesticPricesText, setDomesticPricesText] = useState('');
    const [internationalPricesText, setInternationalPricesText] = useState('');
    const [pestAndDiseasesSectionText, setPestAndDiseasesSectionText] = useState('')
    const [pestSectionText, setPestSectionText] = useState('')
    const [diseaseSectionTexts, setDiseaseSectionText] = useState('')
    useLayoutEffect(() => {
        switch ( locale ) {
            case 'en':
                setSurfaceContextText('Surface Context');
                setProductionText('Production');
                setProductionValueText('Production Value');
                setConsumptionText('Consumption');
                setPricesText('Prices');
                setDomesticPricesText('Domestic Prices');
                setInternationalPricesText('International Benchmark Prices');
                setPestAndDiseasesSectionText('Pests & Diseases');
                setPestSectionText('Pests');
                setDiseaseSectionText('Diseases');
                break;
            case 'es':
                setSurfaceContextText('Contexto de la superficie');
                setProductionText('Producción');
                setProductionValueText('Valor de la producción');
                setConsumptionText('Consumo');
                setPricesText('Precios');
                setDomesticPricesText('Precios Nacionales');
                setInternationalPricesText('Precios Internacionales de referencia');
                setPestAndDiseasesSectionText('Plagas & Enfermedades');
                setPestSectionText('Plagas');
                setDiseaseSectionText('Enfermedades');
                break;
            default:
                setSurfaceContextText('Contexto da área');
                setProductionText('Produção');
                setProductionValueText('Valor da produção');
                setConsumptionText('Consumo');
                setPricesText('Preços');
                setDomesticPricesText('Preços domésticos');
                setInternationalPricesText('Preços internacionais de referência');
                setPestAndDiseasesSectionText('Pragas & Doenças');
                setPestSectionText('Pragas');
                setDiseaseSectionText('Doenças');
                break;
        }
    }, )
    const items: menuItems[] = [
        {
            titleCategory: productionText,
            menuOptions: [
                {
                    menuLabel: surfaceContextText,
                    href: '/data/surface-context'
                },
                {
                    menuLabel: productionText,
                    href: '/data/production'
                },
                {
                    menuLabel: productionValueText,
                    href: '/data/production-value'
                },
            ]
        },
        {
            titleCategory: consumptionText,
            menuOptions: [
                {
                    menuLabel: consumptionText,
                    href: '/data/consumption'
                },
                
            ]
        },
        {
            titleCategory: pricesText,
            menuOptions: [
                {
                    menuLabel: domesticPricesText,
                    href: '/data/prices'
                },
                {
                    menuLabel: internationalPricesText,
                    href: '/data/prices-international'
                },
            ]
        },
        {
            titleCategory: 'Trade',
            menuOptions: [
                {
                    menuLabel: 'Imports/Exports',
                    href: '/data/trade'
                },
                // {
                //     menuLabel: 'Any',
                //     href: '/data/prices-international'
                // },
            ]
        },
        {
            titleCategory: pestAndDiseasesSectionText,
            menuOptions: [
                {
                    menuLabel: pestSectionText,
                    href: '/data/prices'
                },
                {
                    menuLabel: diseaseSectionTexts,
                    href: '/data/diseases'
                },
            ]
        },
        
    ]

    const menuItems = [
        {
            text: 'Home',
            text_es: 'Inicio',
            text_pt: 'Início',
            href: '/',
            hasMoreOptions: false,
            bigMenu: {
                isHugeMenu: false
            }
        },
        {
            text: 'Data',
            href: '/data',
            text_es: 'Datos',
            text_pt: 'Dados',
            hasMoreOptions: false,
            bigMenu: {
                isHugeMenu: true,
                items: items
            }
        },
        {
            text: 'About - Observatory',
            text_es: 'Acerca del observatorio',
            text_pt: 'Sobre nós',
            href: '/about',
            hasMoreOptions: true,
            bigMenu: {
                isHugeMenu: false
            }
        },  
    ];

    return (
        <Nav className={ styles['navbar-body'] }>
        {/* <Nav className="justify-content-center flex-grow-1"> */}
            {
                menuItems.map(({ text, href, hasMoreOptions, text_es, text_pt, bigMenu }) => (
                    <NavLink key={ `${ uuidv4() }` } expand={ expand } href={ href } text={ locale == 'en' ? text : ( locale == 'es' ? text_es : text_pt ) } hasMoreOptions={ hasMoreOptions } bigMenu={ bigMenu } />
                ))
            }
        </Nav>
    )
}
