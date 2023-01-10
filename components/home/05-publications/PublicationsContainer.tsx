
import { v4 as uuidv4 } from 'uuid';

import { GliderComponent } from '../../ui/glider';
import { PublicationCard } from './';
import styles from './publications.module.css';

const publications = [
    {
        image_url: 'https://cgspace.cgiar.org/bitstream/handle/10568/121950/U22ArtJjagweRoleNothomDev.pdf.jpg?sequence=4&isAllowed=y',
        title: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
        link: 'https://cgspace.cgiar.org/'
    },
    {
        image_url: 'https://cgspace.cgiar.org/bitstream/handle/10568/121950/U22ArtJjagweRoleNothomDev.pdf.jpg?sequence=4&isAllowed=y',
        title: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
        link: 'https://cgspace.cgiar.org/'
    },
    {
        image_url: 'https://cgspace.cgiar.org/bitstream/handle/10568/121950/U22ArtJjagweRoleNothomDev.pdf.jpg?sequence=4&isAllowed=y',
        title: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
        link: 'https://cgspace.cgiar.org/'
    },
    {
        image_url: 'https://cgspace.cgiar.org/bitstream/handle/10568/121950/U22ArtJjagweRoleNothomDev.pdf.jpg?sequence=4&isAllowed=y',
        title: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
        link: 'https://cgspace.cgiar.org/'
    },
    {
        image_url: 'https://cgspace.cgiar.org/bitstream/handle/10568/121950/U22ArtJjagweRoleNothomDev.pdf.jpg?sequence=4&isAllowed=y',
        title: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
        link: 'https://cgspace.cgiar.org/'
    },
    {
        image_url: 'https://cgspace.cgiar.org/bitstream/handle/10568/121950/U22ArtJjagweRoleNothomDev.pdf.jpg?sequence=4&isAllowed=y',
        title: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
        link: 'https://cgspace.cgiar.org/'
    },
    {
        image_url: 'https://cgspace.cgiar.org/bitstream/handle/10568/121950/U22ArtJjagweRoleNothomDev.pdf.jpg?sequence=4&isAllowed=y',
        title: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
        link: 'https://cgspace.cgiar.org/'
    },
    {
        image_url: 'https://cgspace.cgiar.org/bitstream/handle/10568/121950/U22ArtJjagweRoleNothomDev.pdf.jpg?sequence=4&isAllowed=y',
        title: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
        link: 'https://cgspace.cgiar.org/'
    },
]

export const PublicationsContainer = () => {

    const publicationsCards = publications.map((publication, idx) => ( <PublicationCard key={ idx } publication={ publication }  /> ));

    return (
        <div className={styles['publications-container']}>
            <h2 className={ styles['publications-section-title'] }>Publications</h2>
            <GliderComponent key={ uuidv4() }  breakpoint={ 800 } items={ publicationsCards } slidesToShow={ 4 } />
        </div>
    )
}
