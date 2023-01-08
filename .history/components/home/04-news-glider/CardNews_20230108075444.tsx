


import { useCallback, useRef } from 'react';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';


export const CardNews = () => {

    
    return (
        <Glider
            draggable
            hasArrows
            hasDots
            slidesToShow={2}
            slidesToScroll={1}
        >
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
        </Glider>
    )
}
