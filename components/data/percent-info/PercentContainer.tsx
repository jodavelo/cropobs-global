import { FC } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { PercentInfo } from './PercentInfo';
import styles from './percent.module.css';
import { PercentInfoProps } from '../../../interfaces/data';
import { v4 as uuidv4 } from 'uuid';


interface Props {
    data: PercentInfoProps[];
    percentAlone: boolean;
}

export const PercentContainer: FC<Props> = ({ data, percentAlone }) => {
    if( percentAlone ) {
      if( data.length > 1 ) throw new Error('Please check number of items in your array, it should has 1 element only if percentAlone flag is active');
      return (
        <Row>
          {
            data.map(item => (
                <PercentInfo key={ uuidv4() } percent={ item.percent } label={ item.label } secondaryLabel={ item.secondaryLabel } />
            ))
          }   
        </Row>
      );
    }
    return (
      <Row className={styles['percent-container']}>
        {
            data.map((item, idx) => (
                <PercentInfo key={ idx } percent={ item.percent } label={ item.label } secondaryLabel={ item.secondaryLabel } />
            ))
        }
      </Row>
    )
}