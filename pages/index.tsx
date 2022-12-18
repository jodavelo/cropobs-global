import { NextPage } from "next";
import { Layout } from "../components/layouts";
import 'bootstrap/dist/css/bootstrap.min.css';



const Index: NextPage = () => {
    return (
        <Layout title="Home">
            <div>
                <h1>Home page</h1>
            </div>
        </Layout>
    )
}


export default Index;