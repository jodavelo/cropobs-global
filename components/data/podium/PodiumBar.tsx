
import Image from 'next/image';
import { FC, useState, useEffect } from 'react';
import styles from './podium.module.css';
import { getLengthOfText, getLongestString } from '../../../helpers/data/podium/podiumHelpers';

export interface DataPodium {
    rank: number;
    cropName: string;
    urlIcon: string;
    heightBar: string;
    heightTransparentBar: string;
    color?: string;
}

interface Props {
    data: DataPodium[]
}

export const PodiumBar: FC<Props> = ({ data }) => {
    const [isLongText, setIsLongText] = useState(false);
    const [cropNameContainer, setCropNameContainer] = useState('');
    const [cropImageContainer, setCropImageContainer] = useState('');
    let longestText = getLongestString([
        data[0]?.cropName ?? '',
        data[1]?.cropName ?? '',
        data[2]?.cropName ?? '',
        data[3]?.cropName ?? ''
    ]);
    useEffect(() => {
        let textLength = getLengthOfText( longestText );
        if( textLength < 12 )  setCropNameContainer( '35%' );
        else setCropNameContainer( '50%' );
    }, [ data ])
    
    return (
        <>
            {
                data.map(o => (
                    <div className={ styles['podium-bar-container'] } key={ o.rank }>
                        <div className={ styles.bar }>
                            <div style={{ maxWidth: '90px', width: '90%', height:  o.heightTransparentBar }}></div>
                            <div style={{ maxWidth: '90px', width: '90%', height:  o.heightBar, backgroundColor: o.color}} className={ styles['rank-podium-number'] }>
                                { o.rank }
                            </div>
                        </div>
                        <div className={ styles['bar-description'] }>
                            <div style={{ height: cropNameContainer, width: '100%', maxWidth: '90px'  }} className={ styles['bar-description-content'] }>
                                <span className={ `${ styles.tooltip } ${ styles['wrap-text'] }` }>
                                    {o.cropName}
                                    {/* <span className={ styles.tooltiptext }>{ o.cropName }</span> */}
                                </span>
                            </div>
                            <div style={{ height: cropImageContainer, width: '100%', maxWidth: '90px' }} className={ styles['bar-description-content'] }>
                                <Image src={ o.urlIcon } key={ o.urlIcon } width={ 30 } height={ 30 } alt={ `Icon ${ o.cropName }` }></Image>
                            </div>
                        </div>
                    </div>
                ))
            }
            {/* <div className={ styles['podium-bar-container'] }>
                <div className={ styles.bar }>
                    <div style={{ width: '90%', height:  '35%'}}></div>
                    <div style={{ width: '90%', height:  '65%', backgroundColor: 'blue'}}></div>
                </div>
                <div className={ styles['bar-description'] }></div>
            </div>
            <div className={ styles['podium-bar-container'] }>
                <div className={ styles.bar }>
                    <div style={{ width: '90%', height:  '0%'}}></div>
                    <div style={{ width: '90%', height:  '100%', backgroundColor: 'red'}}></div>
                </div>
                <div className={ styles['bar-description'] }></div>
            </div>
            <div className={ styles['podium-bar-container'] }>
                <div className={ styles.bar }>
                    <div style={{ width: '90%', height:  '20%'}}></div>
                    <div style={{ width: '90%', height:  '80%', backgroundColor: 'green'}}></div>
                </div>
                <div className={ styles['bar-description'] }></div>
            </div>
            <div className={ styles['podium-bar-container'] }>
                <div className={ styles.bar }>
                    <div style={{ width: '90%', height:  '70%'}}></div>
                    <div style={{ width: '90%', height:  '30%', backgroundColor: 'yellow'}}></div>
                </div>
                <div className={ styles['bar-description'] }></div>
            </div> */}
        </>
    )
}
