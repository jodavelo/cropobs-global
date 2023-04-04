import { useRef, useCallback, FC, useState } from 'react';
import useSWR from 'swr';
import { dataFetcher } from "../../../helpers/data";
import download from 'downloadjs';
import { toPng } from "html-to-image";
import styles from './podium.module.css';
import { PodiumBarContainer } from './';
import { podiumDataProcess } from '../../../helpers/data/podium/podiumDataProcess';
import { DataButtons } from '../data-buttons';
import { ModalForm } from '../modal-form';
import { v4 as uuidv4 } from 'uuid';


interface Props {
    dataURL: string;
    text1: string;
    text2?: string;
    text3?: string;
    text4?: string;
    description: string
}

export const PodiumWithLink: FC<Props> = ({ dataURL, text1, text2, text3, text4, description='' }) => {

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

    const id = uuidv4();

    return (
        <>
            <div ref={ htmlRef } id={id} className={ styles['podium-container'] }>
                <div className={ styles['podium-description'] }>
                    <span className={ styles['podium-text-description'] }>{ text1 } <span className={ styles['text-bold'] }>{ text2 }</span> { text3 } <span className={ styles['text-bold'] }> { text4 } </span> </span>
                </div>
                <div className={ styles['podium-body'] }>
                    <PodiumBarContainer data={ data } />
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
