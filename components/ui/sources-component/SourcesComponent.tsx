import { FC } from 'react';
import styles from './sourcesComponent.module.css';

interface Props {
    sourcesText: string
    shortName: string
    year: number | string
    completeName: string
    url: string
}

export const SourcesComponent: FC<Props> = ({ sourcesText, shortName, year, completeName, url }) => {
    return (
        <div className={styles['sources-container']}>
          {sourcesText}
          <ul>
              <li><b>{ shortName }. ({year}).</b> {completeName}. <a href={url} target="_blank" rel="noreferrer">{url}</a></li>
          </ul>
        </div>
    )
}
