
import { v4 as uuidv4 } from 'uuid';

import { GliderComponent } from '../../ui/glider';
import { PublicationCard } from './';
import styles from './publications.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const publ_text = {
    title: 'Lastest Publications',
    title_es: 'Publicaciones más recientes',
    title_pt: 'Publicações mais recentes',
}
/*
const config = {
    url : process.env.NEXT_PUBLIC_JSON_URL + 'beans_publ',
    headers: {
    "api_key": process.env.NEXT_PUBLIC_JSON_API_KEY
    }
}
*/
const config = {
    url : process.env.NEXT_PUBLIC_BASE_URL + '/api/v2/publications/all/crops',
}

const buildPubl = (rawPubl:any) => {
    return {
        title: rawPubl.title,
        link: rawPubl.url,
        image_url: rawPubl.thumbnail
    }
}

export const PublicationsContainer = () => {
    let [publ,setPubl] = useState([]);
    useEffect(() => {
        axios(config)
        .then(response => {
            setPubl(JSON.parse(response.data as string));
        })
        .catch(error => {
            console.log(error)
        })
      }, [ ]);
    const publicationsCards = publ.map((publication, idx) => ( <PublicationCard key={ idx } publication={ buildPubl(publication) }  /> ));
    const { locale } = useRouter();
    return (
        <div className={styles['publications-container']}>
            <h2 className={ styles['publications-section-title'] }>{ locale == 'en' ? publ_text.title : ( locale == 'es' ? publ_text.title_es : publ_text.title_pt ) }</h2>
            <GliderComponent key={ uuidv4() }  breakpoint={ 1000 } items={ publicationsCards } slidesToShow={ 4 } />
        </div>
    )
}
