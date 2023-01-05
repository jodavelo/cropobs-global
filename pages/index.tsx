import { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from '../components/layouts';
import { MainHome } from '../components/home';

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
            </>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    console.log(locale)

    return {
        props: {
            ...( await serverSideTranslations( locale!, ['common'] ) ),
            ...( await serverSideTranslations( locale!, ['home'] ) )
        }
    }
}

export default Index;