import { FC, useRef } from 'react';
import { Collapse  } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';


interface Props {
    isOpen: boolean;
    text: string;
}

export const ToggleDescription: FC<Props> = ({ isOpen, text }) => {
    // const [open, setOpen] = useState( isOpen );

    // const collapseDivRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <Collapse in={ isOpen }>
                <div key={ uuidv4() }>
                    { text }
                </div>
            </Collapse>
        </>
    );
}
