

import { useContext } from 'react';
import styles from './filters.module.css';
import { LeftSideButton } from './LeftSideButton';
import { LeftSideMenuContext } from '../../../../context/map/leftsidemenu';


export const LeftSideMenuContainer = () => {

    const { buttonBoth, buttonGraphs, buttonMap } = useContext(LeftSideMenuContext);

    return (
        <div className={ styles['left-side-menu-container'] }>
            <LeftSideButton buttonId={1} isActiveButton={ buttonGraphs } toolTipText='Something' urlImage='https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/iconosmap-10.png'/>
            <LeftSideButton buttonId={2} isActiveButton={ buttonBoth } toolTipText='Something' urlImage='https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/iconosmap-10.png'/>
            <LeftSideButton buttonId={3} isActiveButton={ buttonMap } toolTipText='Something' urlImage='https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/iconosmap-10.png'/>
        </div>
    )
}
