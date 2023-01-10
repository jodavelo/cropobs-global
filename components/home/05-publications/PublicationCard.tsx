import { FC } from 'react';
import { Publication } from '../../../interfaces/home';

import styles from './publications.module.css';

interface Props {
    publication: Publication
}

export const PublicationCard: FC<Props> = ({ publication }) => {
    const { image_url, link, title } = publication;
    // console.log( publication )
    return (
        <div className={ styles['publication-container'] }>
            <div className={ styles['publication-img-container'] }>
                <img src={ image_url } alt={ title } className={ styles['publication-img'] }/>
            </div>
            <div className={ styles['card-body'] }>
                <h5 className={ styles['title-card'] }>{ title }</h5>
                <a href={ link } target="_blank" className={ styles['view-resource'] }>View resource</a>
            </div>
        </div>
    )
}
