import { FC, useState } from 'react';
import { PodiumWithLink } from './PodiumWithLink';


interface Props {
    podiumsList: PodiumInfo[],
    showSelect?: boolean;
}

interface PodiumInfo {
    url: string,
    text: string,
    name: string
}

export const PodiumSelection: FC<Props> = ({ podiumsList, showSelect = true }) => {

    const [selected, setSelected] = useState('0');

    return (
        <>
            {
                showSelect ? (
                    <select
                        value={selected}
                        onChange={(e) => {
                            setSelected(e.target.value);
                        }}
                    >
                        { podiumsList.map( (podiumInfo, index) => <option key={index} value={index}>{podiumInfo.name}</option>)}
                    </select>
                ) : ''
            }
            <PodiumWithLink dataURL={podiumsList[Number(selected)].url} text={podiumsList[Number(selected)].text}/>
        </>
    )
}
