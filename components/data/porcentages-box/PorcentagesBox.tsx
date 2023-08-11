import { FC} from "react"

import style from './porcentages.module.css';
import DOMPurify from "isomorphic-dompurify";

interface Props {
    data_1 : any
    data_2 : any
    evaluate?: boolean
};

var styles = style;

export const PorcentagesBox: FC<Props> = ({data_1, data_2, evaluate=false}) => {
      return (
        <div className={styles["porcentages-container"]}>
            <div className={styles["porcentage-box"]}>
                <h2 className={styles["porcentage-value"]}>
                    <span className={styles["percent-data"]}>
                        {Math.round(Number(data_1.value)*10000)/100 + "%"}
                    </span>
                </h2>
                <div className={styles["porcentage-text"]} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(evaluate ? eval(data_1.text) : data_1.text)}} />
            </div>
            <div className={styles["porcentage-box"]} >
                <h2 className={styles["porcentage-value"]}>
                    <span className={styles["percent-data"]}>
                        {Math.round(Number(data_2.value)*10000)/100 + "%"}
                    </span>
                </h2>
                <div className={styles["porcentage-text"]} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(evaluate ? eval(data_2.text) : data_2.text)}} />
            </div>
        </div>
        )
}