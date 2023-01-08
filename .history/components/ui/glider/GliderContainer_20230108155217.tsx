

import { GliderComponent } from './GliderComponent';
import styles from './glidercomponent.module.css';

export const NewsContainer = () => {
    return (
        <div className={ styles['glider-container'] }>
            <GliderComponent/>
        </div>
    )
}
