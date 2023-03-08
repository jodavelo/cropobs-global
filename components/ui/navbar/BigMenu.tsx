
import React from 'react'
import styles from './Navbar.module.css';

export const BigMenu = () => {
    return (
        <div className={ styles.dropdown2 }>
            <button className={ styles.dropbtn2 }>
                Data
                <i className="fa fa-caret-down"></i>
            </button>
            <div className={ styles['dropdown2-content'] }>
            {/* <div className={ styles.header }>
                <h2>Mega Menu</h2>
            </div>    */}
            <div className={ styles.row }>
                <div className={ styles.column }>
                <h3>Category 1</h3>
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
                <div className={ styles.column }>
                <h3>Category 2</h3>
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
                <div className={ styles.column }>
                <h3>Category 3</h3>
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
                <div className={ styles.column }>
                <h3>Category 4</h3>
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
            </div>
        </div> 
    )
}
