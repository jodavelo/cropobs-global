import { FC, useState } from "react";

import { Button } from "react-bootstrap";
import InfoIcon from '@mui/icons-material/Info';

import styles from './frame.module.css';
import stylesMultiChart from '../chartjs-multichart/multichart.module.css';
import {ToggleDescription} from '../'

interface Props {
    children: React.ReactNode,
    toggleText: string,
}

export const ChartFrame1Btn: FC<Props> = ({ children, toggleText}) => {
    let [openToggle, setOpenToggle] = useState(false);

    return (
        <div className={styles["frame-container"]}>
            <div className={styles["frame-chart"]} >
                {children}
            </div>
            <br></br>
            <div className={stylesMultiChart["multichart-footer"]}>
                <Button className={ stylesMultiChart.button } onClick={ () => setOpenToggle(!openToggle) } ><InfoIcon/></Button>
            </div>
            <ToggleDescription isOpen = {openToggle} text = {toggleText} />
        </div>
    )
}