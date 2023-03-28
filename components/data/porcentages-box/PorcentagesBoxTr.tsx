import { FC} from "react"

import styles from './porcentages.module.css';

interface DataPercentage{
    value : number,
    text : string,
}

interface Props {
    data_1 : DataPercentage,
    data_2 : DataPercentage,
};

export const PorcentagesBoxTr: FC<Props> = ({data_1, data_2}) => {
      return (
        <div className={styles["porcentages-container"]}>
            <div className={styles["porcentage-box"]}>
                <h2 className={styles["porcentage-value"]}>
                    {data_1.value < 0.01 ? "> 0.01%" : data_1.value+"%"}
                </h2>
                <div className={styles["porcentage-text"]}>
                    {data_1.text}
                </div>
            </div>
            <div className={styles["porcentage-box"]} >
                <h2 className={styles["porcentage-value"]}>
                {data_2.value < 0.01 ? "> 0.01%" : data_2.value+"%"}
                </h2>
                <div className={styles["porcentage-text"]}>
                    {data_2.text}
                </div>
            </div>
        </div>
        )
}