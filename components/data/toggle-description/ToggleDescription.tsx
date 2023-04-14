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
    // const [open, setOpen] = useState( isOpen );

    // const collapseDivRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <Collapse in={ isOpen }>
                <div key={ uuidv4() } className={ styles.text }>
                    <p>{ text }</p>
                    { 
                        text2.length > 0 ? <p> { text2 } </p> : undefined
                    }
                </div>
                
            </Collapse>
        </>
    );
}
