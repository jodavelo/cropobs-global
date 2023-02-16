import { PercentInfo } from './PercentInfo';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from './percent.module.css';


const items = [
  {
      percent: 1.25,
      label: 'lorem ipsum'
  },
  {
      percent: 1.25,
      label: 'lorem ipsum'
  },
  {
    percent: 1.25,
    label: 'lorem ipsum'
  },
  {
  percent: 1.25,
  label: 'lorem ipsum'
  },

]

export const PercentContainer = () => {
  return (
    <Row className={styles['percent-container']}>
      {
        items.map((item, idx) => (
            <PercentInfo key={ idx } percent={ item.percent } label={ item.label }/>
        ))
      }
    </Row>
  )
}