import { FC, useCallback, useRef } from "react";
import { Button } from "react-bootstrap";
import {Multichart} from './'
import styles from './multichart.module.css';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import download from 'downloadjs';
import { toPng } from "html-to-image";

interface Props {
    xLabels: number[],
    dataProd: number[],
    dataYield: number[],
    dataHarv: number[],
    setShowModal: Function,
    setOpen: Function,
    open: boolean,
};

export const MultichartContainer: FC<Props> = ({xLabels, dataProd, dataHarv, dataYield, setShowModal, setOpen, open}) => {

    const htmlRef = useRef<HTMLDivElement>(null);
    const chartDownload = useCallback(async() => {
        if( htmlRef.current ){
            download( await toPng( htmlRef.current, { filter: filter } ), "multichart.png" );
        }
    }, [htmlRef?.current]);
    const filter = (node: HTMLElement) => {
        const exclusionClasses = ['multichart_multichart-footer__iXAXn'];
        return !exclusionClasses.some((classname) => node.classList?.contains(classname));
    }

    return (
        <div ref={ htmlRef } className={ styles['multichart-container'] }>
            <div className={ styles['multichart-title'] }>
                <span>Title</span>
            </div>
            <div className={ styles['multichart-body'] }>
                <Multichart xLabels={xLabels} dataProd={dataProd} dataHarv={dataHarv} dataYield={dataYield}/>
            </div>
            <div className={ styles['multichart-footer'] }>
                <Button className={ styles.button } onClick={ () => setOpen(!open) } ><InfoIcon/></Button>
                <Button className={ styles.button } onClick={ chartDownload } ><DownloadIcon/></Button>
                <Button className={ styles.button } onClick={ () => setShowModal(true) } ><i className='fa fa-file-image-o' aria-hidden="true"></i></Button>
            </div>
        </div>
    )
}