

import React from 'react'
import { QuickLink } from '../../ui'

import styles from './quicklink.module.css';

export const QuickLinksContainer = () => {
    return (
        <div className={ styles['quicklink-container'] }>
            <h2>QuickLinks</h2>
            <div className={ styles['quicklink-content'] }>
                <div className={ styles['quicklink-images'] }>
                    <QuickLink href='https://www.google.com' description='Aliquam quis pellentesque ante. Donec suscipit interdum tellus. Sed pellentesque augue nec imperdiet semper. Interdum et malesuada fames ac ante ipsum primis in faucibus.' imgUrl='/home/homeimage1.jpg' title='Lorem ipsum'/>
                    <QuickLink href='https://www.google.com' description='Aliquam quis pellentesque ante. Donec suscipit interdum tellus. Sed pellentesque augue nec imperdiet semper. Interdum et malesuada fames ac ante ipsum primis in faucibus.' imgUrl='/home/homeimage1.jpg' title='Lorem ipsum'/>
                </div>
                <div className={ styles['twitter-container'] }>
                    Twitter container
                </div>
            </div>
        </div>
    )
}
