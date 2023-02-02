import { useRef, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import DownloadIcon from '@mui/icons-material/Download';
import download from 'downloadjs';
import { toPng } from "html-to-image";
import styles from './podium.module.css';
import { DataPodium, PodiumBarContainer } from './';

const data: DataPodium[] = [
    {
        rank: 3,
        cropName: 'Crop 3', 
        urlIcon: 'https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-4.png',
        heightBar: '65%',
        heightTransparentBar: '35%',
        color:  'rgb(181, 181, 181)',
    },
    {
        rank: 1,
        cropName: 'Crop 1', 
        urlIcon: 'https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-4.png',
        heightBar: '100%',
        heightTransparentBar: '0%',
        color:  'rgb(181, 181, 181)',
    },
    
    {
        rank: 2,
        cropName: 'Crop 2', 
        urlIcon: 'https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-4.png',
        heightBar: '80%',
        heightTransparentBar: '20%',
        color:  'rgb(181, 181, 181)',
    }, 
    {
        rank: 4,
        cropName: 'Crop 4', 
        urlIcon: 'https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-4.png',
        heightBar: '40%',
        heightTransparentBar: '60%',
        color:  'rgb(181, 181, 181)',
    }
]

export const Podium = () => {

    const htmlRef = useRef<HTMLDivElement>(null);

    const podumDownload = useCallback(async() => {
        if( htmlRef.current ){
            download( await toPng( htmlRef.current, { filter: filter } ), "test.png" );
        }
    }, [htmlRef?.current]);

    const filter = (node: HTMLElement) => {
        const exclusionClasses = ['podium_podium-footer__a0i9H'];
        return !exclusionClasses.some((classname) => node.classList?.contains(classname));
    }

    return (
        <div ref={ htmlRef } className={ styles['podium-container'] }>
            <div className={ styles['podium-description'] }>
                <span className={ styles['podium-text-description'] }>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam labore ipsa placeat quia ratione quidem recusandae sint harum enim </span>
            </div>
            <div className={ styles['podium-body'] }>
                <PodiumBarContainer data={ data } />
            </div>
            <div className={ styles['podium-footer'] }>
                <Button className={ styles.button } onClick={ podumDownload }><DownloadIcon/></Button>
            </div>
        </div>
    )
}
