import { FC, useCallback, useRef, useState } from "react";

import { Button } from "react-bootstrap";
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import ImageIcon from '@mui/icons-material/Image';

import download from 'downloadjs';
import { toPng } from "html-to-image";

import styles from './frame.module.css';
import stylesMultiChart from '../chartjs-multichart/multichart.module.css';
import {ModalForm, ToggleDescription} from '../'
import { GenerateDataJsonGeneric } from "../../../helpers/data";

interface DataDocument {
    label : string,
    values: number[]
}

interface Props {
    children: React.ReactNode,
    data: DataDocument[],
    toggleText: string,
    excludedClasses: string[],
}

export const ChartFrame2Btn: FC<Props> = ({ children, data , toggleText, excludedClasses}) => {
    let [openToggle, setOpenToggle] = useState(false);
    let [openModal, setOpenModal] = useState(false);

    const htmlRef = useRef<HTMLDivElement>(null);
    const chartDownload = useCallback(async() => {    
        if( htmlRef.current ){
            download( await toPng( htmlRef.current, { filter: filter } ), "multichart.png" );
        }
    }, [htmlRef?.current]);
    const filter = (node: HTMLElement) => {
        const exclusionClasses = excludedClasses;
        return !exclusionClasses.some((classname) => node.classList?.contains(classname));
    }

    return (
        <div className={styles["frame-container"]}>
            <div ref={ htmlRef } className={styles["frame-chart"]} >
                {children}
            </div>
            <br></br>
            <div className={stylesMultiChart["multichart-footer"]}>
                <Button className={ stylesMultiChart.button } onClick={ () => setOpenToggle(!openToggle) } ><InfoIcon/></Button>
                <Button className={ stylesMultiChart.button } onClick={ chartDownload } ><ImageIcon/></Button>
            </div>
            <ToggleDescription isOpen = {openToggle} text = {toggleText} />
        </div>
    )
}