import { Helmet } from "react-helmet";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>DevDive | Home</title>
            </Helmet>
            <div className="min-w-full min-h-screen bg-red-400">
                first1111111
            </div>
            <div className="min-w-full min-h-screen bg-blue-400">
                sec22222222
            </div>
            <div className="min-w-full min-h-screen bg-green-400">
                third333333333
            </div>
        </div>
    );
};

export default Home;