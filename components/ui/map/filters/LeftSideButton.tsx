
import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './filters.module.css';
import { LeftSideMenuContext } from '../../../../context/map/leftsidemenu/LeftSideMenuContext';
import { MapContext } from '../../../../context/map';

interface Props {
    toolTipText: string;
    urlImage: string;
    isActiveButton: boolean;
    buttonId: number;
}

export const LeftSideButton = ({ toolTipText, urlImage, isActiveButton, buttonId }: Props) => {

    const { activeBothButtons, activeGraphsButton, activeMapButton } = useContext( LeftSideMenuContext );
    const { map, setMap } = useContext( MapContext );

    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        setIsActive( isActiveButton );
    }, [isActiveButton])
    

    const onActiveButton = () => {
        switch (buttonId) {
            case 1:
                activeGraphsButton();
                break;
            case 2:
                map?.resize();
                setMap(map!);
                activeBothButtons();
                break;
            case 3:
                
                map?.resize();
                
                activeMapButton();
                console.log('clickckkkk')
            default:
                
                break;
        }
    }

    //
    const tooltip = (
        <Tooltip id="tooltip">
            {/* <strong>Holy guacamole!</strong>  */}
            { toolTipText }
        </Tooltip>
    );
    return (
        <OverlayTrigger placement="right" overlay={tooltip}>
            <div className={ styles['left-side-button'] } onClick={ onActiveButton } style={ isActive ?  { background: '#fff' } : { background: 'rgb(211, 211, 211)' } }>
                <Image width={ 20 } height={ 20 } src={ urlImage } alt='any image'/>
            </div>
        </OverlayTrigger>
    )
}
