import { useRef, useCallback, FC } from 'react';
import Button from 'react-bootstrap/Button';
import DownloadIcon from '@mui/icons-material/Download';
import download from 'downloadjs';
import { toPng } from "html-to-image";
import styles from './podium.module.css';
import { DataPodium, PodiumBarContainer } from './';


interface Props {
    data: DataPodium[]
}

export const Podium: FC<Props> = ({ data }) => {

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
