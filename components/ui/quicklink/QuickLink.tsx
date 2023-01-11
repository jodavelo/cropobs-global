

import { FC } from 'react';
import styles from './quicklink.module.css';


interface Props {
    href: string;
    imgUrl: string;
    title: string;
    description: string;
}

export const QuickLink: FC<Props> = ({ href, imgUrl, title, description }) => {

    const onClickHref = ( href: string ) => {
        location.href='https://www.google.com';
    }

    return (
        <div className={ styles['quick-link-container'] } onClick={ () => onClickHref( href ) }>
            <img src={ imgUrl } alt="quick link image" className={ styles['quick-link-image'] }/>
            <div className={ styles['quick-link-text-container'] }>
                <span className={ styles['quick-link-title'] }>{ title }</span>
                <span className={ styles['quick-link-description'] }>{ description }</span>
            </div>
        </div>
    )
}
