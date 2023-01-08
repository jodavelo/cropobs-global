

import { CardNews } from './CardNews';
import styles from './news.module.css';

export const NewsContainer = () => {
    return (
        <div className={ styles['news-container'] }>
            <CardNews/>
        </div>
    )
}
