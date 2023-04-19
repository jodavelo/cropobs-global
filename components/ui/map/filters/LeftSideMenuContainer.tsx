import { useContext, useEffect, useState } from 'react';
import styles from './filters.module.css';
import { LeftSideButton } from './LeftSideButton';
import { LeftSideMenuContext } from '../../../../context/map/leftsidemenu';
import { useRouter } from 'next/router';

const localeDictionary = {
    en: ['Show graphs', 'Show graphs & map', 'Show map'],
    es: ['Desplegar gráficos', 'Desplegar gráficos y mapa', 'Desplegar mapa'],
    pt: ['Mostrar gráficos', 'Mostrar gráficos & mapa', 'Mostrar mapa'],
}

export const LeftSideMenuContainer = () => {
    const { locale } = useRouter();
    const { buttonBoth, buttonGraphs, buttonMap } = useContext(LeftSideMenuContext);
    const [words, setWords] = useState<string[]>(localeDictionary.en);

    useEffect(() => {
        if (locale) setWords(localeDictionary[locale as keyof typeof localeDictionary]);
    }, [locale]);

    return (
        <div className={ styles['left-side-menu-container'] }>
            <LeftSideButton id='graphs-button' buttonId={1} isActiveButton={ buttonGraphs } toolTipText={words[0]} urlImage='https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/iconosmap-10.png'/>
            <LeftSideButton id='graphs-map-button' buttonId={2} isActiveButton={ buttonBoth } toolTipText={words[1]} urlImage='https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/iconosmap-09.png'/>
            <LeftSideButton id='map-button' buttonId={3} isActiveButton={ buttonMap } toolTipText={words[2]} urlImage='https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/iconosmap-08.png'/>
        </div>
    )
}
