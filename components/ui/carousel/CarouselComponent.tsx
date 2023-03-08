import Carousel from 'react-bootstrap/Carousel';
import { useWindowSize } from '../../../hooks';

export const CarouselComponent = () => {

    const { width = 0 } = useWindowSize();
    let heightVariable = 250;
    console.log( width )
    if( width < 300 ) heightVariable = 190;
    else if( width < 500 && width > 300) heightVariable = 230;
    else if( width < 700 && width > 500) heightVariable = 250;
    else if( width < 1200 && width > 1000) heightVariable = 390;
    else if( width > 1200) heightVariable = 440;
    // if( width < 300 ) heightVariable = 190;

    return (
        <Carousel>
            <Carousel.Item>
                <img
                    height={ heightVariable }
                    className="d-block w-100"
                    src="/home/slide1.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p style={{ fontSize: '0.8rem' }}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    height={ heightVariable }
                    className="d-block w-100"
                    src="/home/slide2.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p style={{ fontSize: '0.8rem' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    height={ heightVariable }
                    className="d-block w-100"
                    src="/home/slide3.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p style={{ fontSize: '0.8rem' }}>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
