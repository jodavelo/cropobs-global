

import { CardNews } from './Glider';
import styles from './news.module.css';

export const NewsContainer = () => {
    return (
        <div className={ styles['news-container'] }>
            <CardNews/>
        </div>
    )
}
