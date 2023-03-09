import { FC} from "react"

import styles from './porcentages.module.css';

interface Props {
    data_1 : any,
    data_2 : any
};

export const PorcentagesBox: FC<Props> = ({data_1, data_2}) => {
      return (
        <div className={styles["porcentages-container"]}>
            <div className={styles["porcentage-box"]} key="0">
                <h2 className={styles["porcentage-value"]} key="0">
                    {Number(data_1.value)*100 + "%"}
                </h2>
                <div className={styles["porcentage-text"]} key="0">
                    {data_1.text}
                </div>
            </div>
            <div className={styles["porcentage-box"]} key="1">
                <h2 className={styles["porcentage-value"]} key="1">
                    {Number(data_2.value)*100 + "%"}
                </h2>
                <div className={styles["porcentage-text"]} key="1">
                    {data_2.text}
                </div>
            </div>
        </div>
        )
}