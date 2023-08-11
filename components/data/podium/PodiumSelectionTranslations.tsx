import { FC, useState } from 'react';
import { PodiumWithLinkTranslations } from './PodiumWithLinkTranslations';
import { PodiumConfig } from '../../../interfaces/data/section-states';
import { PodiumWithLinkCon } from './PodiumWithLinkCon';
import { PodiumWithLinkConProdu } from './PodiumWithLinkConProdu';


interface Props {
    podiumsList: PodiumConfig[],
    showSelect?: boolean;
}

export const PodiumSelectionTranslations: FC<Props> = ({ podiumsList, showSelect = true }) => {

    const [selected, setSelected] = useState('0');

    return (
        <>
            <select
                value={selected}
                onChange={(e) => {
                    setSelected(e.target.value);
                }}
            >
                { podiumsList.map( (podiumInfo, index) => <option key={index} value={index}>{podiumInfo.name}</option>)}
            </select>
            <PodiumWithLinkConProdu dataURL={podiumsList[Number(selected)].url} text={podiumsList[Number(selected)].text} description={podiumsList[Number(selected)].description} />
        </>
    )
}
