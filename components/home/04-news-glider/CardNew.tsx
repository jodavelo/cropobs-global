import { FC } from 'react';
import { useWindowSize } from '../../../hooks';
import { News } from '../../../interfaces/home';
import styles from './new.module.css';

interface Props {
    news: News
}

export const CardNew: FC<Props> = ({ news }) => {

    const { width } = useWindowSize();

    // console.log({ width })

    return (
        <a
            className={ styles.card }
            href={ news.link }
            target="_blank"
            rel="noreferrer"
        >
            <div className={styles['text-container']}>
                <div className={ styles['news-date-text'] }>{ news.ago_text }</div>
                <div className={ styles['news-title-text'] }>{ news.title }</div>
                <div className={ styles['news-description-text'] }>{ news.description }</div>
            </div>
            <div className={ styles['img-container'] }>
                <img src={ news.image_url } alt={ news.title } key={ news.title } className={ styles['news-img'] } />
            </div>
        </a>
    )
}
