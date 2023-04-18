
import { GliderComponent } from "../../ui/glider"
import { v4 as uuidv4 } from 'uuid';
import { CardNew } from "./";

import styles from './new.module.css';
import axios, { AxiosRequestConfig } from 'axios';
import { convertToObject } from "typescript";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

const config = {
    url : process.env.NEXT_PUBLIC_JSON_URL + 'beans_news',
    headers: {
    "api_key": process.env.NEXT_PUBLIC_JSON_API_KEY
    }
}

const buildNews = (oldNews:any) => {
    return {
        ago_text: oldNews.time,
        title: oldNews.title,
        description: oldNews.description,
        image_url: oldNews.img,
        link: oldNews.url
    }
}

const news_text = {
    title: 'News',
    title_es: 'Noticias',
    title_pt: 'Notícias',
}

export const NewsContainer = () => {
    let [news,setNews] = useState([]);
    useEffect(() => {
        axios(config)
        .then(response => {
            setNews (JSON.parse(response.data.json));
        })
        .catch(error => {
            console.log(error)
        })
      }, [ ]);
    const cardsNews = news.map((n:any, idx:any) => ( <CardNew key={ idx } news={ buildNews(n) } /> ));
    const { locale } = useRouter();
    return (
        <div className={ styles['news-container'] }>
            <h2 className={ styles['news-section-title'] }>{ locale == 'en' ? news_text.title : ( locale == 'es' ? news_text.title_es : news_text.title_pt ) }</h2>
            <GliderComponent key={ uuidv4() } items={ cardsNews } breakpoint={ 800 } slidesToShow={ 2 } />
        </div>
    )
}
