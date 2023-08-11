
import styles from './SubmainHome.module.css';

export const SubmainContentHome = () => {
    return (
        <div className={ styles['submain-subcontainer'] }>
            <div className={ styles['img-container'] }>
                <img className={ styles['plate-img'] } src="/home/plate.png" alt="Plate image" />
            </div>
            <div className={ styles['description-container'] }>
                <span>
                    <span className={ styles['custom-color'] }>&apos;Orci varius </span>
                    natoque penatibus et magnis dis parturient montes, nascetur
                    <span className={ styles['custom-color'] }> ridiculus mus&apos;</span>
                </span>
            </div>
        </div>
    )
}
