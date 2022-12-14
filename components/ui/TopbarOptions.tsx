
import styles from './Topbar.module.css';

export const TopbarOptions = () => {
    return (
        <div
            className={ styles['topbar-options'] }
        >
            
            <div className={ styles['options-language'] }>ENG</div>
            <div className={ styles['options-language'] }>ESP</div>
            <div className={ styles['options-language'] }>POR</div>
        
        </div>
    )
}
