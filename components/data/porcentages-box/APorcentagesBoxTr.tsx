import { FC} from "react"

import styles from './porcentages.module.css';

interface DataPercentage{
    value : number,
    text : string,
}

interface Props {
    data : DataPercentage,
};

export const APorcentagesBoxTr: FC<Props> = ({data}) => {
      return (
        <div className={styles["porcentages-container"]}>
            <div className={styles["porcentage-box"]}>
                <h2 className={styles["porcentage-value"]}>
                    {data.value < 0.01 ? "> 0.01%" : data.value+"%"}
                </h2>
                <div className={styles["porcentage-text"]}>
                    {data.text}
                </div>
            </div>
        </div>
        )
}