
import Image from 'next/image';
import { FC, useState, useEffect } from 'react';
import styles from './podium.module.css';

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
    
    return (
        <>
            {
                data.map(o => (
                    <div className={ styles['podium-bar-container'] } key={ o.rank }>
                        <div className={ styles.bar }>
                            <div style={{ width: '90%', height:  o.heightTransparentBar }}></div>
                            <div style={{ width: '90%', height:  o.heightBar, backgroundColor: o.color}} className={ styles['rank-podium-number'] }>
                                { o.rank }
                            </div>
                        </div>
                        <div className={ styles['bar-description'] }>
                            <div style={{ height: '50%', width: '100%' }} className={ styles['bar-description-content'] }>
                                <span>{ o.cropName }</span>
                            </div>
                            <div style={{ height: '50%', width: '100%' }} className={ styles['bar-description-content'] }>
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
