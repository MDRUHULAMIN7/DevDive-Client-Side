import { Helmet } from "react-helmet";
import Card from "../../Components/Card/Card";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>DevDive | Home</title>
            </Helmet>
            <Card/>
        </div>
    );
};

export default Home;