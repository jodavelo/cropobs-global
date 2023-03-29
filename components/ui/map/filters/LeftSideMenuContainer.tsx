

import { useContext } from 'react';
import styles from './filters.module.css';
import { LeftSideButton } from './LeftSideButton';
import { LeftSideMenuContext } from '../../../../context/map/leftsidemenu';


export const LeftSideMenuContainer = () => {

    const { buttonBoth, buttonGraphs, buttonMap } = useContext(LeftSideMenuContext);

    return (
        <div className={ styles['left-side-menu-container'] }>
            <LeftSideButton id='graphs-button' buttonId={1} isActiveButton={ buttonGraphs } toolTipText='Something' urlImage='https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/iconosmap-10.png'/>
            <LeftSideButton id='graphs-map-button' buttonId={2} isActiveButton={ buttonBoth } toolTipText='Something' urlImage='https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/iconosmap-09.png'/>
            <LeftSideButton id='map-button' buttonId={3} isActiveButton={ buttonMap } toolTipText='Something' urlImage='https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/iconosmap-08.png'/>
        </div>
    )
}
