import { FC } from "react";
import { Button, Col, Container, Row } from 'react-bootstrap';
// import { useTranslation } from 'react-i18next';
import styles from './percent.module.css';

interface Props {
  percent: number;
  label: string;
}

export const PercentInfo: FC<Props> = ({ percent, label }) => {
  // const { t: dataTranslate } = useTranslation('data');

  return (
        <Col className={styles['percent-column']}>
            <span className={styles['percent-data']}>{ percent }</span>
            <span  className={styles['percent-text']}>{ label }</span>       
        </Col>
  )
}



