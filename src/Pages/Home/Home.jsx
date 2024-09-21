import { Helmet } from "react-helmet";
import Card from "../../Components/Card/Card";

const Home = () => {
    return (
        <div className="container mx-auto py-5">
            <Helmet>
                <title>DevDive | Home</title>
            </Helmet>
        </div>
    );
};

export default Home;
