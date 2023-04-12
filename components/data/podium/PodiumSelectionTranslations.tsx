import { FC, useState } from 'react';
import { PodiumWithLinkTranslations } from './PodiumWithLinkTranslations';


interface Props {
    podiumsList: PodiumInfo[],
    showSelect?: boolean;
}

interface PodiumInfo {
    url: string
    text: string
    name: string
    description: string
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
            <PodiumWithLinkTranslations dataURL={podiumsList[Number(selected)].url} text={podiumsList[Number(selected)].text} description={podiumsList[Number(selected)].description}/>
        </>
    )
}
