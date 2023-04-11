import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Col, Row } from 'react-bootstrap';
import { PercentContainer } from '../percent-info';
import { DataPodium, Podium,  } from '../podium';
import { MainBar, MapView, SidebarComponent } from '../../ui';
import styles from '../tabs/tabs.module.css';
import { v4 as uuidv4 } from 'uuid';

const data: DataPodium[] = [
  {
      rank: 3,
      cropName: 'Crop 3', 
      urlIcon: 'https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-4.png',
      heightBar: '65%',
      heightTransparentBar: '35%',
      color:  'rgb(181, 181, 181)',
  },
  {
      rank: 1,
      cropName: 'Crop 1', 
      urlIcon: 'https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-4.png',
      heightBar: '100%',
      heightTransparentBar: '0%',
      color:  'rgb(181, 181, 181)',
  },
  
  {
      rank: 2,
      cropName: 'Crop 2', 
      urlIcon: 'https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-4.png',
      heightBar: '80%',
      heightTransparentBar: '20%',
      color:  'rgb(181, 181, 181)',
  }, 
  {
      rank: 4,
      cropName: 'Crop 4', 
      urlIcon: 'https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-4.png',
      heightBar: '40%',
      heightTransparentBar: '60%',
      color:  'rgb(181, 181, 181)',
  }
]

export const TabComponent = () =>  {
  const [open, setOpen] = useState(false);


  return (
    <Tabs  defaultActiveKey="MapsGraphs" transition={false}   className={ `${ styles['no-margin'] }  ${ styles['no-padding'] } ` }>
      <Tab eventKey="MapsGraphs" title="Maps and Grpahs">
        <Row>
          <Col xs={ 12 } >
              <MainBar key={ uuidv4() } section='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis quas quis quae accusantium vel' />
          </Col>
          <Col xs={ 12 } xl={ 6 } className={ `${ styles['no-margin'] }  ` }>
              <MapView/>
          </Col>
          <Col xs={ 12 } xl={ 6 } style={{ height: '80vh' }}>
            <Podium data={ data }></Podium>
            <PercentContainer ></PercentContainer>
          </Col>
        </Row>
      </Tab>
      <Tab eventKey="Metadata" title="Metadata"  onClick={() => setOpen(open)}>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non praesentium, nesciunt sed ad pariatur minus officiis accusamus quos dolorum iusto repellendus possimus soluta earum tempore consequatur voluptatum in, quo perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore commodi magni corporis soluta doloremque dolorem, dolorum dolores omnis blanditiis debitis sit, earum quaerat culpa, corrupti dicta voluptas nemo cumque asperiores.</p>
      </Tab>

    </Tabs>
  );
}

