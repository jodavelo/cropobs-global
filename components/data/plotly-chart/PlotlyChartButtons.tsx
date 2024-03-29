
import { FC, useCallback, useRef, useState } from "react";
import { Button } from "react-bootstrap";
// import { Multichart } from './'
import styles from './plotlychart.module.css';
import DownloadIcon from '@mui/icons-material/Download';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import InfoIcon from '@mui/icons-material/Info';
import DescriptionIcon from '@mui/icons-material/Description';
import download from 'downloadjs';
import { toPng } from "html-to-image";
import { ToggleDescription } from '../toggle-description/ToggleDescription';
import { ModalForm } from "../modal-form";

interface Props {
    divID: string;
    moreInfoText: string;
    moreInfoText2?: string;
    traces?: any[];
    setShowModal?: Function;
    plotlyDataJson?: Object[];
};
// 
export const PlotlyChartButtons = ( { divID, moreInfoText, traces, setShowModal, moreInfoText2, plotlyDataJson }: Props ) => {
    const [isOpen, setIsOpen] = useState(false);
    const htmlRef = useRef<HTMLDivElement>(null);
    const [showModalPlotlyCharts, setShowModalPlotlyCharts] = useState(false);
    const chartDownload = useCallback(async() => {
        let ele = document.getElementById( divID )!.getElementsByClassName('modebar');
        for (var i = 0; i < ele.length; i++) {
            let element: HTMLElement = ele[i].getElementsByClassName('modebar-btn')[0] as HTMLElement;
            element.click();
        }
    }, []);
    const filter = (node: HTMLElement) => {
        const exclusionClasses = ['multichart_multichart-footer__iXAXn'];
        return !exclusionClasses.some((classname) => node.classList?.contains(classname));
    }

    return (
        <>
            <div ref={ htmlRef } className={ styles['multichart-container'] }>
                <div className={ styles['multichart-footer'] }>
                    <Button className={ styles.button } onClick={ () => setIsOpen(!isOpen) } ><InfoIcon/></Button>
                    <Button className={ styles.button } onClick={ chartDownload } ><InsertPhotoIcon/></Button>
                    <Button className={ styles.button } onClick={ () => setShowModalPlotlyCharts( !showModalPlotlyCharts ) } ><DownloadIcon/></Button>
                </div>
            </div>
            <ToggleDescription text={ moreInfoText } text2={ moreInfoText2 } isOpen={ isOpen }/>
            
            {
                showModalPlotlyCharts ? <ModalForm dataJson={ plotlyDataJson! } setShowModal={ setShowModalPlotlyCharts! } />
                : undefined
            }
        </>
        
    )
}
