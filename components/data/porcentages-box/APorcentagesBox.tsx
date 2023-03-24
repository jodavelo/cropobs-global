import { FC} from "react"

import styles from './porcentages.module.css';

interface DataPercentage{
    value : number,
    text : string,
}

interface Props {
    data : DataPercentage,
};

export const APorcentagesBox: FC<Props> = ({data}) => {
      return (
        <div className={styles["porcentages-container"]}>
            <div className={styles["porcentage-box"]}>
                <h2 className={styles["porcentage-value"]}>
                    {Math.round(Number(data.value)*10000)/100 + "%"}
                </h2>
                <div className={styles["porcentage-text"]}>
                    {data.text}
                </div>
            </div>
        </div>
        )
}