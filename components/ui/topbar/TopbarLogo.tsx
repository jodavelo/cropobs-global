
import styles from './Topbar.module.css';

export const TopbarLogo = () => {
    return (
        <div
            className={ `${ styles['topbar-logo'] }` }
        >
            <img src="/logo.png" className={ styles['img-logo-topbar'] } alt="Logo" />
            <img src="/Login_test.png" className={styles['banner']} alt="Banner" />
        </div>
    )
}
