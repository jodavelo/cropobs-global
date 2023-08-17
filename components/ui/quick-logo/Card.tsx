import { FC } from 'react';
import LinkIcon from '@mui/icons-material/Link';
import { useState } from "react";
import styles from './card.module.css';

interface Props {
    href: string;
    imgUrl: string;
    text: string;
    height: string;
    width: string;
    color: string;
}

export const CardComponent : FC<Props> = ({ href, imgUrl, text, height, width, color }) => {
    const [isHovered,setIsHovered] = useState(false)
    const styleButton = {
        background: isHovered? color: "#ffffffcc",
        borderColor: "transparent",
        color: isHovered? "white": "gray"
    }
    

    const onClickHref = ( href: string ) => {
        location.href=href;
    }

    return(
        <div className={styles['card-container']}>
            <div className={styles['card-body']} onClick={ () => onClickHref( href ) } style={{height: height, width: width}}>
                <img src={ imgUrl } alt="quick link image" className={ styles['card-image'] }/>
                <div className={styles['button-container']}>
                    <button type="button" className="btn btn-outline-primary" style={styleButton} onMouseEnter={()=> setIsHovered(true)} onMouseLeave={()=> setIsHovered(false)}><LinkIcon/></button>
                </div>
            </div>
            <a className={styles['card-footer']} href={href}>{text}</a>
        </div>
    )
}

export default CardComponent