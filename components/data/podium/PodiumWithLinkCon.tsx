import { useRef, useCallback, FC, useState, useEffect } from 'react';
import useSWR from 'swr';
import { dataFetcher } from "../../../helpers/data";
import download from 'downloadjs';
import { toPng } from "html-to-image";
import style from './podium.module.css';
import { PodiumBarContainer } from './';
import { getColorByDataProcessed, podiumDataProcessTrans } from '../../../helpers/data/podium/podiumDataProcess';
import { DataButtons } from '../data-buttons';
import { ModalForm } from '../modal-form';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import DOMPurify from 'isomorphic-dompurify';
import { GenerateDataJsonGeneric } from "../../../helpers/data";


interface Props {
    dataURL: string
    text: string
    description: string
}

var styles = style;

export const PodiumWithLinkCon: FC<Props> = ({ dataURL, text, description='' }) => {
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
    console.log(dataURL);
    const { data: predata, error, isLoading } = useSWR(dataURL, dataFetcher);

    if (error) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>

    const data = podiumDataProcessTrans(predata,locale as string);
    const dataProcessed = getColorByDataProcessed( data );
    console.log(data);
    
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
        posAux.push(data[3].rank)
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

    const getCropRank= (data: any[], cropNames : string[]): number => {
        for (const elem of data){
            for(const name of cropNames){
                if(elem.keyName==name) return elem.rank as number
            }
        }
        return -1
    }

    const id = uuidv4();
    console.log(text);

    return (
        <>
            <div ref={ htmlRef } id={id} className={ styles['podium-container'] }>
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(eval((text.replace('#{1}', getCropRank(data,["Beans, dry", "Beans"]).toString()))))}} className={ styles['podium-description'] }>
                </div>
                <div className={ styles['podium-body'] }>
                    <PodiumBarContainer data={ dataProcessed } />
                </div>
            </div>
            <DataButtons text={description} elementID={id} setShowModal={setShowModal}/>
            {showModal ? (
                <ModalForm dataJson={GenerateDataJsonGeneric(dataJson)} setShowModal={setShowModal}/>
            ) : null
            }
        </>


    )
}
