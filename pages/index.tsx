import { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from '../components/layouts';
import { Indicators, MainHome, NewsContainer, PublicationsContainer, QuickLinksContainer, SignUp, SubmainHome } from '../components/home';
import { CarouselComponent } from '../components/ui';
import { VideoContainer } from '../components/home/extras/Video';
import { VideoProvider } from '../context/ui';

const Index: NextPage = () => {

    const { t: commonTranslate } = useTranslation('common');
    const { t: homeTranslate } = useTranslation('home');

    return (
        <Layout title="Home">
            {/* <div>
                <h1>{ homeTranslate('title-page') }</h1>
                <h2>{ commonTranslate('text-test') }</h2>
            </div> */}
            <>
                <MainHome/>
                {/* <SubmainHome/> */}
                <Indicators/>
                <NewsContainer/>
                <CarouselComponent/>
                <PublicationsContainer/>
                <QuickLinksContainer/>
                {/* <SignUp/> */}
                {/* <VideoProvider>
                    <VideoContainer/>
                </VideoProvider> */}
            </>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    // console.log(locale)

    return {
        props: {
            ...( await serverSideTranslations( locale!, ['common'] ) ),
            ...( await serverSideTranslations( locale!, ['home'] ) )
        }
    }
}

export default Index;