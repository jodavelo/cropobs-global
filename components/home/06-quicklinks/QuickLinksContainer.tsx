
/*
import React, { useEffect } from 'react'
import { QuickLink } from '../../ui'

import styles from './quicklink.module.css';

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
                    <QuickLink href='https://www.google.com' description='Aliquam quis pellentesque ante. Donec suscipit interdum tellus. Sed pellentesque augue nec imperdiet semper. Interdum et malesuada fames ac ante ipsum primis in faucibus.' imgUrl='/home/homeimage1.jpg' title='Lorem ipsum'/>
                    <QuickLink href='https://www.google.com' description='Aliquam quis pellentesque ante. Donec suscipit interdum tellus. Sed pellentesque augue nec imperdiet semper. Interdum et malesuada fames ac ante ipsum primis in faucibus.' imgUrl='/home/homeimage1.jpg' title='Lorem ipsum'/>
                </div>
                <div className={ styles['twitter-container'] }>
                <a className="twitter-timeline" data-theme="light" href="https://twitter.com/BiovIntCIAT_eng?ref_src=twsrc%5Etfw">Tweets by BiovIntCIAT_eng</a>
                </div>
            </div>
        </div>
    )
}
*/



import React, { useEffect } from 'react'
import { QuickLink } from '../../ui'
import {CardComponent} from '../../ui/quick-logo'

import styles from './quicklink.module.css';

const links1 = [
    {
        href: "#",
        imgUrl: "https://commonbeanobservatorytst.ciat.cgiar.org/images/navbar-logo.webp",
        text: "",
        height: "100px",
        width: "320px",
        color: "#a82f31",
    },
    {
        href: "#",
        imgUrl: "https://musaobservatorytst.ciat.cgiar.org/images/navbar-logo.webp",
        text: "",
        height: "100px",
        width: "256px",
        color: "#f5d226",
    },
]

const links2 = [
    {
        href: "#",
        imgUrl: "https://cassavalighthousetest.ciat.cgiar.org/images/navbar-logo.png",
        text: "",
        height: "100px",
        width: "320px",
        color: "#009933",
    },
    {
        href: "#",
        imgUrl: "http://192.168.199.75:3002/images/navbar-logov2.png",
        text: "",
        height: "100px",
        width: "256px",
        color: "#00697a",
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
                    <div className={ styles['quicklink-images-row'] }>
                       {links1.map( (card, idx) => ( <CardComponent key={idx} href = {card.href} imgUrl={card.imgUrl} text={card.text} height={card.height} width={card.width} color={card.color} /> ) )}
                    </div>
                    <div className={ styles['quicklink-images-row'] }>
                       {links2.map( (card, idx) => ( <CardComponent key={idx} href = {card.href} imgUrl={card.imgUrl} text={card.text} height={card.height} width={card.width} color={card.color}  /> ) )}
                    </div>
                    {/* <QuickLink href='https://www.google.com' description='Aliquam quis pellentesque ante. Donec suscipit interdum tellus. Sed pellentesque augue nec imperdiet semper. Interdum et malesuada fames ac ante ipsum primis in faucibus.' imgUrl='/home/homeimage1.jpg' title='Lorem ipsum'/> */}
                </div>
                <div className={ styles['twitter-container'] }>
                <a className="twitter-timeline" data-height="500" data-theme="light" href="https://twitter.com/BiovIntCIAT_eng?ref_src=twsrc%5Etfw">Tweets by BiovIntCIAT_eng</a>
                </div>
            </div>
        </div>
    )
}
