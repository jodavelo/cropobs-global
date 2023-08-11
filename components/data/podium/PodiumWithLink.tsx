import { useRef, useEffect, useCallback, FC, useState } from 'react';
import useSWR from 'swr';
import { GenerateDataJsonGeneric, dataFetcher } from "../../../helpers/data";
import download from 'downloadjs';
import { toPng } from "html-to-image";
import styles from './podium.module.css';
import { PodiumBarContainer } from './';
import { getColorByDataProcessed, podiumDataProcess, podiumDataProcessDownload, podiumDataProcessTrans } from '../../../helpers/data/podium/podiumDataProcess';
import { DataButtons } from '../data-buttons';
import { ModalForm } from '../modal-form';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';


interface Props {
    dataURL: string;
    text1: string;
    text2?: string;
    text3?: string;
    text4?: string;
    description: string;
    currentYearSelected?: number;
    errorSetter?: Function;
}

export const PodiumWithLink: FC<Props> = ({ dataURL, text1, text2, text3, text4, description='', currentYearSelected = 0, errorSetter=(error:boolean)=>{}}) => {

    const { locale } = useRouter();
    const htmlRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState(false);
    const [ labelName, setLabelName] = useState('');
    const [ positionName, setPositionName] = useState('');

    useEffect(() => {
        if(locale == 'en'){
            setPositionName('Position')
            setLabelName('Crop-Name')
        }
        else if(locale == 'es'){
            setPositionName('Posicion')
            setLabelName('Nombre del cultivo')
        }
        else{
            setPositionName('Posição')
            setLabelName('Nome da colheida')
        }
    }, [locale])
    
    const podumDownload = useCallback(async() => {
        if( htmlRef.current ){
            download( await toPng( htmlRef.current, { filter: filter } ), "test.png" );
        }
    }, [htmlRef?.current]);
    const filter = (node: HTMLElement) => {
        const exclusionClasses = ['podium-footer'];
        return !exclusionClasses.some((classname) => node.classList?.contains(classname));
    }

    const { data: predata, error, isLoading } = useSWR(dataURL, dataFetcher,{errorRetryCount:2,revalidateOnFocus:false});
    errorSetter(error)
    if (error) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>

    const data = podiumDataProcessTrans(predata, locale ?? 'en');
    const dataProcessed = getColorByDataProcessed( data );
    // const dataToDownload = podiumDataProcessDownload( predata, currentYearSelected );

    const posAux = Array(0)
    const nameAux = Array(0)
    if(data.length > 3){
        posAux.push(data[1].rank)
        posAux.push(data[0].rank)
        posAux.push(data[2].rank)
        posAux.push(data[3].rank)
        nameAux.push(data[1].cropName)
        nameAux.push(data[0].cropName)
        nameAux.push(data[2].cropName)
        nameAux.push(data[3].cropName)
    }
    else{
        posAux.push(data[1].rank)
        posAux.push(data[0].rank)
        posAux.push(data[2].rank)
        nameAux.push(data[1].cropName)
        nameAux.push(data[0].cropName)
        nameAux.push(data[2].cropName)
    }
    const dataJson= [
        {
            label: positionName,
            values: posAux ?? [],
        },
        {
            label: labelName,
            values: nameAux ?? [],
        },
    ]
    
    const id = uuidv4();
    // data.map(e => {
    //     console.log(e)
    // })
    return (
        <>
            <div ref={ htmlRef } id={id} className={ styles['podium-container'] }>
                <div className={ styles['podium-description'] }>
                    <span className={ styles['podium-text-description'] }>{ text1 } <span className={ styles['text-bold'] }>{ text2 }</span> { text3 } <span className={ styles['text-bold'] }> { text4 } </span> </span>
                </div>
                <div className={ styles['podium-body'] }>
                    <PodiumBarContainer data={ dataProcessed } />
                </div>
            </div>
            <DataButtons text={description} elementID={id} setShowModal={setShowModal}/>
            {showModal ? (
                <ModalForm dataJson={GenerateDataJsonGeneric(dataJson) } setShowModal={setShowModal}/>
            ) : null
            }
        </>


    )
}
