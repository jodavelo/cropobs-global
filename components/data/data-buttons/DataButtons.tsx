import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import DescriptionIcon from '@mui/icons-material/Description';
import styles from '../chartjs-multichart/multichart.module.css';
import { Button, Collapse } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { FC, useState } from 'react';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import html2canvas from 'html2canvas';

interface Props {
    text: string
    elementID: string
    setShowModal: Function
}

const saveCanvas = (elementId: string) => {
    const element = document.getElementById(elementId) as HTMLElement;
    
    html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');  
        let blobData;
        
        // Convertimos los datos de la imagen a blob
        fetch(imgData)
        .then(res => res.blob())
        .then(blob => {
            blobData = blob;
            saveAs(blobData, `${elementId}.png`);
        })
    });
}

export const DataButtons: FC<Props> = ({ text, elementID, setShowModal }) => {
    const [isOpen, setIsOpen] = useState(false);
    let finalText: string='';
    if(text.includes('`')) {
        finalText = eval(text)   
    }
    else{
        finalText = text
    }
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
                <InsertPhotoIcon/>
            </Button>
            <Button
                className={ styles.button }
                onClick={ () => setShowModal(true) }
            >
                <DownloadIcon/>
            </Button>
        </div>
        <Collapse in={ isOpen }>
            <div style={{textAlign: 'justify', textJustify: 'inter-word', margin: '10px'}} id={ uuidv4() } key={ uuidv4() } dangerouslySetInnerHTML={{__html: finalText}}/>
        </Collapse>
    </>
    );
}
