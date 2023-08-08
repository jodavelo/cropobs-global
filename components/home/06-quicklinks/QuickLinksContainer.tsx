

import React, { useEffect } from 'react'
import { QuickLink } from '../../ui'
import {CardComponent} from '../../tools/card'

import styles from './quicklink.module.css';

const cards = [
    {
        href: "https://www.google.com",
        imgUrl: "/home/homeimage1.jpg",
        text: "Lorem ipsum",
        height: "150px",
        width: "300px",
    },
]

export const QuickLinksContainer = () => {

    useEffect(() => {
        const s = document.createElement("script");
        s.setAttribute("src", "https://platform.twitter.com/widgets.js");
        s.setAttribute("async", "true");
        document.head.appendChild(s);
    }, []);

    return (
        <div className={ styles['quicklink-container'] }>
            <h2>QuickLinks</h2>
            <div className={ styles['quicklink-content'] }>
                <div className={ styles['quicklink-images'] }>
                {cards.map( (card, idx) => ( <CardComponent key={idx} href = {card.href} imgUrl={card.imgUrl} text={card.text} height={card.height} width={card.width}  /> ) )}
                    {/* <QuickLink href='https://www.google.com' description='Aliquam quis pellentesque ante. Donec suscipit interdum tellus. Sed pellentesque augue nec imperdiet semper. Interdum et malesuada fames ac ante ipsum primis in faucibus.' imgUrl='/home/homeimage1.jpg' title='Lorem ipsum'/> */}
                </div>
                <div className={ styles['twitter-container'] }>
                <a className="twitter-timeline" data-theme="light" href="https://twitter.com/BiovIntCIAT_eng?ref_src=twsrc%5Etfw">Tweets by BiovIntCIAT_eng</a>
                </div>
            </div>
        </div>
    )
}
