import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import DescriptionIcon from '@mui/icons-material/Description';
import styles from '../chartjs-multichart/multichart.module.css';
import { Button, Collapse } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { FC, useState } from 'react';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
import { Blob } from 'buffer';

interface Props {
    text: string
    elementID: string
    setShowModal: Function
}

const saveCanvas = (elementId: string) => {
    domtoimage.toBlob( document.getElementById(elementId))
        .then( (blob: Blob) => saveAs(blob, `${elementId}.png`) );
}

export const DataButtons: FC<Props> = ({ text, elementID, setShowModal }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
    <>
        <div className={ styles['multichart-footer'] }>
            <Button
                className={ styles.button }
                onClick={ () => setIsOpen(!isOpen) }
            >
                <InfoIcon/>
            </Button>
            <Button
                className={ styles.button }
                onClick={() => saveCanvas(elementID)}
            >
                <DownloadIcon/>
            </Button>
            <Button
                className={ styles.button }
                onClick={ () => setShowModal(true) }
            >
                <DescriptionIcon/>
            </Button>
        </div>
        <Collapse in={ isOpen }>
            <div id={ uuidv4() } key={ uuidv4() }>
                { text }
            </div>
        </Collapse>
    </>
    );
}
