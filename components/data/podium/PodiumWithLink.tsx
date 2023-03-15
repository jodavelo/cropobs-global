import { useRef, useCallback, FC } from 'react';
import Button from 'react-bootstrap/Button';
import DownloadIcon from '@mui/icons-material/Download';
import useSWR from 'swr';
import { dataFetcher } from "../../../helpers/data";
import download from 'downloadjs';
import { toPng } from "html-to-image";
import styles from './podium.module.css';
import { DataPodium, PodiumBarContainer } from './';
import { podiumDataProcess } from '../../../helpers/data/podium/podiumDataProcess';


interface Props {
    dataURL: string,
    text: string
    textAlignCenter?: boolean;
}

export const PodiumWithLink: FC<Props> = ({ dataURL, text, textAlignCenter }) => {

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

    const { data: predata, error, isLoading } = useSWR(dataURL, dataFetcher);

    if (error) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>

    const data = podiumDataProcess(predata);

    return (
        <div ref={ htmlRef } className={ styles['podium-container'] }>
            <div className={ [styles['podium-description'],  textAlignCenter ? styles['text-align-center'] : ''].join(' ') }>
                <span className={ styles['podium-text-description'] }>{ text }</span>
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
