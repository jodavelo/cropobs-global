import { useRef, useCallback, FC, useState } from 'react';
import useSWR from 'swr';
import { dataFetcher } from "../../../helpers/data";
import download from 'downloadjs';
import { toPng } from "html-to-image";
import style from './podium.module.css';
import { PodiumBarContainer } from './';
import { getColorByDataProcessed, podiumDataProcess } from '../../../helpers/data/podium/podiumDataProcess';
import { DataButtons } from '../data-buttons';
import { ModalForm } from '../modal-form';
import { v4 as uuidv4 } from 'uuid';
import { RankingData } from '../../../interfaces/data/podium';


interface Props {
    dataURL: string;
    text: string
    description: string
    textFormatter?: Function
}

var styles = style;

export const PodiumWithLinkTranslations: FC<Props> = ({ dataURL, text, description='', textFormatter}) => {

    const htmlRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState(false);

    const podumDownload = useCallback(async() => {
        if( htmlRef.current ){
            download( await toPng( htmlRef.current, { filter: filter } ), "test.png" );
        }
    }, [htmlRef?.current]);
    const filter = (node: HTMLElement) => {
        const exclusionClasses = ['podium-footer'];
        return !exclusionClasses.some((classname) => node.classList?.contains(classname));
    }

    const { data: predata, error, isLoading } = useSWR(dataURL, dataFetcher);

    if (error) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>

    const data = podiumDataProcess(predata);
    const dataProcessed = getColorByDataProcessed( data );
    const id = uuidv4();
    let finalText: string = '';
    
    if (textFormatter) finalText = eval(textFormatter(predata, text));

    return (
        <>
            <div ref={ htmlRef } id={id} className={ styles['podium-container'] }>
                <div className={ styles['podium-description'] } dangerouslySetInnerHTML={{__html: finalText}}/>
                <div className={ styles['podium-body'] }>
                    <PodiumBarContainer data={ dataProcessed } />
                </div>
            </div>
            <DataButtons text={description} elementID={id} setShowModal={setShowModal}/>
            {showModal ? (
                <ModalForm dataJson={[]} setShowModal={setShowModal}/>
            ) : null
            }
        </>


    )
}
