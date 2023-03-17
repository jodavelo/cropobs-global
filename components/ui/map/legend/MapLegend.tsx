import { forEachChild } from 'typescript';
import { commarize } from '../../../../helpers/data';
import styles from './mapLegend.module.css';


export const MapLegend = ({ title='aaaa', percentiles=[0.000089,0.002921,0.007886,0.020605,0.064045,0.903101], colorRange=['#E4A0A1','#DB8081','#D26062','#C94042','#A82F31'], unit='%' }) => {
  return (
    <div className={ `${styles['info']} ${styles['legend']}` }>
        <strong>{ title }</strong><br></br>
        {
            percentiles.map( (value, index) => {
                if (index < percentiles.length - 1){
                    let val1, val2;
                    switch (unit) {
                        case '%':
                            val1 = (percentiles[index]*100).toFixed(2);
                            val2 = (percentiles[index+1]*100).toFixed(2);
                            break;
                        case '1000 US$':
                            val1 = commarize(percentiles[index]);
                            val2 = commarize(percentiles[index+1]);
                            break;
                        default:
                            val1 = commarize(percentiles[index]);
                            val2 = commarize(percentiles[index+1]);
                            break;
                    }
                    return <><i key={`${index}_i`} style={{ background: `${colorRange[index]}` }}></i> <span key={`${index}_span`}>{(percentiles[index]*100 < 0.01 ? '>' : '')}{val1}-{(percentiles[index+1]*100 < 0.01 ? '>' : '')}{val2}</span><br key={`${index}_br`}></br></>
                }
            })
        }
    </div>
  )
}