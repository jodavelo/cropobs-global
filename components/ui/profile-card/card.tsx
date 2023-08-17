import { FC } from 'react';
import LinkIcon from '@mui/icons-material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Image from 'next/image';

import styles from './card.module.css';
import Link from 'next/link';

interface Props {
    imgUrl: string;
    title: string;
    country: string;
    link?: string;
    fb?: string;
    tw?: string;
    ig?: string;
    ln?: string;
}

export const CardComponent : FC<Props> = ({imgUrl, title, country, link, fb, tw, ig, ln }) => {

    const onClickHref = ( url: string ) => {
        console.log(url)
        //location.href=url;
    }

    return(
        <>
            <div className={styles['card-container']}>
                <div className={styles['card-image']}>
                    <Image
                        height={ 190 }
                        width={ 250 }
                        className="d-block w-100"
                        loader={() => imgUrl}
                        src= {imgUrl}
                        alt= {imgUrl}
                        style={{objectFit: "contain"}}/>
                </div>
                <hr/>
                <div className={styles['card-text-container']}>
                    
                    <h4 className={styles['card-title']}>
                        {title}
                    </h4>
                    <div className={styles['card-country']}>
                        {country}
                    </div>
                    <div>
                    <div className={styles['button-container']}>
                        {(link? <Link href={link}><button type="button" className="btn btn-outline-primary" onClick={ () => onClickHref( link ) }><LinkIcon fontSize='small'/></button></Link> : <></>)}
                        {(fb? <Link href={fb}><button type="button" className="btn btn-outline-primary" onClick={ () => onClickHref( fb ) }><FacebookIcon fontSize='small'/></button></Link> : <></>)}
                        {(tw? <Link href={tw}><button type="button" className="btn btn-outline-primary" onClick={ () => onClickHref( tw ) }><TwitterIcon fontSize='small'/></button></Link> : <></>)}
                        {(ig? <Link href={ig}><button type="button" className="btn btn-outline-primary" onClick={ () => onClickHref( ig ) }><InstagramIcon fontSize='small'/></button></Link> : <></>)}
                        {(ln? <Link href={ln}><button type="button" className="btn btn-outline-primary" onClick={ () => onClickHref( ln ) }><LinkedInIcon fontSize='small'/></button></Link> : <></>)}
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardComponent