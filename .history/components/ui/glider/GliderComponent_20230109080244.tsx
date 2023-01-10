


import { FC, useCallback, useEffect, useRef } from 'react';
import Glider from 'react-glider';
import GliderType from 'glider-js';
import 'glider-js/glider.min.css';

import styles from './glider.module.css';

interface Props {
    children: JSX.Element[]
}

// const ContainerElement: FC<Props> = ({ children }) => {
//     return (
//         <div style={{ height: '100%' }}>{ children }</div>
//     )
// }

export const GliderComponent: FC<Props> = ({ children }) => {

// export const GliderComponent= (  ) => {
    const INTERVAL = 5000;
    const MAX = 11;

    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const callbackRef = useCallback((glider: GliderType) => {
        if (glider) {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
            let index = glider.page;
            if (index < MAX) {
                index += 1;
            } else {
                index = 0;
            }
            glider.scrollItem(index, false);
            }, INTERVAL);
        }
        }
    }, []);

    useEffect(
        () => () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        },
        []
    );

    return (
        <div className={ styles['glider-component'] }>
            <Glider
                className={ styles['glider-container'] }
                draggable
                // hasDots
                hasArrows
                slidesToShow={1}
                scrollLock
                ref={callbackRef}
                responsive={[
                    {
                        breakpoint: 800,
                        settings: {
                        slidesToShow: 2,
                        },
                    },
                ]}
            >
                <div className={ styles.slide }>
                <span>1</span>
                </div>
                <div className={ styles.slide }>
                <span>2</span>
                </div>
                <div className={ styles.slide }>
                <span>3</span>
                </div>
                <div className={ styles.slide }>
                <span>4</span>
                </div>
                <div className={ styles.slide }>
                <span>5</span>
                </div>
                <div className={ styles.slide }>
                <span>6</span>
                </div>
                <div className={ styles.slide }>
                <span>7</span>
                </div>
                <div className={ styles.slide }>
                <span>8</span>
                </div>
                <div className={ styles.slide }>
                <span>9</span>
                </div>
                <div className={ styles.slide }>
                <span>10</span>
                </div>
                <div className={ styles.slide }>
                <span>11</span>
                </div>
                <div className={ styles.slide }>
                <span>12</span>
                </div>
            </Glider>
        </div>
    );
    
}
