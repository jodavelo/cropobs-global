

import { GliderComponent } from './GliderComponent';
import styles from './glidercomponent.module.css';

export const GliderContainer = () => {
    return (
        <div className={ styles['glider-container'] }>
            <GliderComponent/>
        </div>
    )
}
