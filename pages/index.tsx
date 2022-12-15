import { NextPage } from "next";
import { Layout } from "../components/layouts";
import 'bootstrap/dist/css/bootstrap.min.css';



const Index: NextPage = () => {
    return (
        <Layout title="Home">
            <h1>Home page</h1>
        </Layout>
    )
}


export default Index;