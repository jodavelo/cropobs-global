import { NextPage } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './tools.module.css';
import { Layout } from '../../components/layouts';
import { CardComponent as Card } from '../../components/tools'

const cards = [
    {
        href: "https://www.google.com",
        imgUrl: "/home/homeimage1.jpg",
        height: "300px",
        width: "400px",
    },
    {
        href: "https://www.google.com",
        imgUrl: "https://flowersofcolombia.co/wp-content/uploads/2018/11/el-trigal-ambassador-440x419.jpg",
        height: "250px",
        width: "250px",
    },
]

const ToolsPage: NextPage = () => {

    return(
        <Layout title="Tools">
            <div className={styles['tools-container']}>
                <h2 className={styles['tools-tittle']}> Tools </h2>
                <div className={styles['tools-cards']}>
                    {cards.map( (card, idx) => ( <Card key={idx} href = {card.href} imgUrl={card.imgUrl} height={card.height} width={card.width}  /> ) )}
                </div>
                <div className={styles['tools-cards']}>
                    {cards.map( (card, idx) => ( <Card key={idx} href = {card.href} imgUrl={card.imgUrl} height={card.height} width={card.width}  /> ) )}
                </div>
                <h2 className={styles['tools-tittle']}> Country briefs </h2>
                <div className={styles['tools-cards']}>
                    {cards.map( (card, idx) => ( <Card key={idx} href = {card.href} imgUrl={card.imgUrl} height={card.height} width={card.width}  /> ) )}
                </div>
            </div>
        </Layout>
    )
}

export default ToolsPage