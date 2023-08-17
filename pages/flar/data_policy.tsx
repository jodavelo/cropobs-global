import { GetStaticProps, NextPage } from 'next';
import { Layout } from "../../components/layouts"
import style from './policies.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'isomorphic-dompurify';

var styles = style;

const PoliciesPage: NextPage = () => {
    const { t: dataTranslate } = useTranslation('data-policy');
    //dataTranslate('text2')
    return(
        <Layout title="Data Policy">
            <div className={styles['policies-container']}>
                <div key={ uuidv4() } dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(eval((dataTranslate('text'))))}} />
            </div>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...( await serverSideTranslations( locale!, ['data-policy'] ) )
        }
    }
}

export default PoliciesPage