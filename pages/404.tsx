import Layout from "../components/Layout";

const Custom404 = () => (
    <Layout>
        <div>404 - Page Not Found</div>
    </Layout>
);

export default Custom404;

export async function getStaticProps() {
    return {
        props: {}
    }
}