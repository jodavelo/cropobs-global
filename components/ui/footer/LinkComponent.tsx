import { CSSProperties, FC } from 'react';

const style: CSSProperties = {
    color: '#fff',
    fontWeight: 'bolder',
    fontSize: 12,
    textDecoration: 'none'
}

interface Props {
    href: string;
}


export const LinkComponent: FC<Props> = ({ href }) => {

    // console.log(href)

    return (
        <a href={ `https://` + href } target="_blank" rel={ 'noopener noreferrer' } style={ style } >{ href }</a>
    )
}
