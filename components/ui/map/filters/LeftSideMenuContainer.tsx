

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './filters.module.css';
import { LeftSideButton } from './LeftSideButton';
import { LeftSideMenuContext } from '../../../../context/map/leftsidemenu';


export const LeftSideMenuContainer = () => {

    const { buttonBoth, buttonGraphs, buttonMap } = useContext(LeftSideMenuContext);
    const { locale } = useRouter();
    const [buttonGraphsText, setButtonGraphsText] = useState('');
    const [buttonMapText, setButtonMapText] = useState('');
    const [buttonShowBoth, setButtonShowBoth] = useState('')

    useEffect(() => {
        switch (locale) {
            case 'en':
                setButtonGraphsText('By selecting this option you will be able to hide the map to display only graphics');
                setButtonMapText('By selecting this option you will be able to view only the map');
                setButtonShowBoth('By selecting this option you will be able to keep the current map and chart view');
                break;
            case 'es':
                setButtonGraphsText('Al seleccionar esta opción podrás ocultar el mapa para visualizar solo los gráficos');
                setButtonMapText('Al seleccionar esta opción podrás visualizar solo el mapa');
                setButtonShowBoth('Al seleccionar esta opción podrás mantener la vista actual de mapa y gráfico');
                break;
            default:
                setButtonGraphsText('A selecção desta opção permite-lhe esconder o mapa para exibir apenas os gráficos');
                setButtonMapText('Seleccionando esta opção, pode visualizar apenas o mapa');
                setButtonShowBoth('A selecção desta opção permite-lhe manter o mapa e a vista gráfica actuais.');
                break;
        }
        
    })
    

    return (
        <div className={ styles['left-side-menu-container'] }>
            <LeftSideButton id='graphs-button' buttonId={1} isActiveButton={ buttonGraphs } toolTipText={ buttonGraphsText } urlImage='https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/iconosmap-10.png'/>
            <LeftSideButton id='graphs-map-button' buttonId={2} isActiveButton={ buttonBoth } toolTipText={ buttonShowBoth } urlImage='https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/iconosmap-09.png'/>
            <LeftSideButton id='map-button' buttonId={3} isActiveButton={ buttonMap } toolTipText={ buttonMapText } urlImage='https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/iconosmap-08.png'/>
        </div>
    )
}
