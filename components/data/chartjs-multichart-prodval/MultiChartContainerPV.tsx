import { FC, useCallback, useRef } from "react";
import { Button } from "react-bootstrap";
import {MultichartPV} from './'
import styles from './multichart.module.css';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import DescriptionIcon from '@mui/icons-material/Description';
import download from 'downloadjs';
import { toPng } from "html-to-image";

interface Props {
    xLabels: number[],
    data1: number[],
    data2: number[],
    data3: number[],
    data4: number[],
    setShowModal: Function,
    setOpen: Function,
    open: boolean,
};

export const MultichartContainerPV: FC<Props> = ({xLabels, data1, data2, data3, data4, setShowModal, setOpen, open}) => {

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
                <MultichartPV xLabels={xLabels} data1={data1} data2={data2} data3={data3} data4={data4}/>
            </div>
            <div className={ styles['multichart-footer'] }>
                <Button className={ styles.button } onClick={ () => setOpen(!open) } ><InfoIcon/></Button>
                <Button className={ styles.button } onClick={ chartDownload } ><DownloadIcon/></Button>
                <Button className={ styles.button } onClick={ () => setShowModal(true) } ><DescriptionIcon/></Button>
            </div>
        </div>
    )
}