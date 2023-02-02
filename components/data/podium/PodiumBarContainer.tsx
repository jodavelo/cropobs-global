import { FC } from 'react';
import styles from './podium.module.css';
import { PodiumBar, DataPodium } from './';

interface Props {
    data: DataPodium[]
}

export const PodiumBarContainer: FC<Props> = ({ data }) => {
    return (
        <div className={ styles['podium-body-container'] }>
            <PodiumBar data={ data }/>
        </div>
    )
}
