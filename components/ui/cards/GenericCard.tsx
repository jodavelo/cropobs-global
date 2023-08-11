import { useState } from 'react';
import Image from 'next/image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import styles from './style.module.css';
import { Button } from 'react-bootstrap';

interface Props {
    imageUrl: string; 
    title: string;
    description: string;
    btntext: string;
    link: string;
}

export const GenericCard = ({ imageUrl, title, description, btntext, link }: Props ) => {
    const [imageError, setImageError] = useState(false);
    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <>
            <Card border="light" style={{ width: '100%' }}>
                <Card.Header style={{ background: '#000' }}>
                { !imageError && <Image src={imageUrl} alt="" width={220} height={50} onError={handleImageError} /> }
                </Card.Header>
                <Card.Body>
                    <Card.Title className={ styles['center-text'] }>
                        { title }
                    </Card.Title>
                    {/* <Card.Text className={ styles['center-text'] }>
                        Indicadores de agricultura a nivel mundial
                    </Card.Text> */}
                    <ListGroup className="list-group-flush" >
                        <ListGroup.Item className={ styles['center-text'] }>
                            { description }
                        </ListGroup.Item>
                        <ListGroup.Item style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button href={ link }>
                                { btntext }
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
        </Card>
        </>
    )
}