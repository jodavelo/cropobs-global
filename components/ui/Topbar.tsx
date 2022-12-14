
import styles from './Topbar.module.css';
import { TopbarLogo, TopbarOptions } from './';


export const Topbar = () => {
    return (
        <div
            className={ `${styles.container} ${styles.text}` }
        >
            <TopbarLogo/>
            <TopbarOptions/>
        </div>
    )
}
