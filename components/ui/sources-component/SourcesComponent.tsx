import { FC } from 'react';
import styles from './sourcesComponent.module.css';

interface Props {
    shortName: string
    year: number | string
    completeName: string
    url: string
}

export const SourcesComponent: FC<Props> = ({ shortName, year, completeName, url }) => {
    return (
        <div className={styles['sources-container']}>
          Data Sources:
          <ul>
              <li><b>{ shortName }. ({year}).</b> {completeName}. <a href={url} target="_blank">{url}</a></li>
          </ul>
        </div>
    )
}
