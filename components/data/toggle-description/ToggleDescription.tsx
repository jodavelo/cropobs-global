import { FC, useRef } from 'react';
import { Collapse  } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import styles from './toggle.module.css';

interface Props {
    isOpen: boolean;
    text: string;
    text2?: string;
}

export const ToggleDescription: FC<Props> = ({ isOpen, text, text2 = '' }) => {
    let finalText: string='';
    if(text.includes('`')) {
        finalText = eval(text+text2)   
    }
    else{
        finalText = text+text2
    }
    return (
        <>
            <Collapse in={ isOpen }>
                <div key={ uuidv4() } className={ styles.text } dangerouslySetInnerHTML={{__html: finalText}}/>
                
            </Collapse>
        </>
    );
}
