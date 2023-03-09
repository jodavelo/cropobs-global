import { FC} from "react"

import styles from './porcentages.module.css';

interface Props {
    data_1 : any,
    data_2 : any
};

export const PorcentagesBox: FC<Props> = ({data_1, data_2}) => {
      return (
        <div className={styles["porcentages-container"]}>
            <div className={styles["porcentage-box"]}>
                <h2 className={styles["porcentage-value"]}>
                    {Number(data_1.value)*100 + "%"}
                </h2>
                <div className={styles["porcentage-text"]}>
                    {data_1.text}
                </div>
            </div>
            <div className={styles["porcentage-box"]} >
                <h2 className={styles["porcentage-value"]}>
                    {Number(data_2.value)*100 + "%"}
                </h2>
                <div className={styles["porcentage-text"]}>
                    {data_2.text}
                </div>
            </div>
        </div>
        )
}