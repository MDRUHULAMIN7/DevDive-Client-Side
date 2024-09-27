import { Helmet } from 'react-helmet';
import Slider from '../../Components/Fardus/Slider/Slider';
import Card from '../../Components/Sanjida/Card';
import RecentPostCard from '../../Components/Fardus/RecentPostCard/RecentPostCard';

const Home = () => {

    const slides = [
        { image: 'https://uqsport.com.au/wp-content/uploads/2018/05/UQ_Sport_2022_10_13_093-scaled.jpg', title: 'Slide 1', description: 'This is a short description for slide 1.' },
        { image: 'https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg', title: 'Slide 2', description: 'This is a short description for slide 2.' },
        { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Youth-soccer-indiana.jpg/1200px-Youth-soccer-indiana.jpg', title: 'Slide 3', description: 'This is a short description for slide 3.' },
        { image: 'https://sport.ec.europa.eu/sites/default/files/styles/eac_ratio_16_9_xl/public/sport-active-part-erasmus-plus-crop.jpg?h=5dabf909&itok=JM-JNmjy', title: 'Slide 4', description: 'This is a short description for slide 4.' },
        { image: 'https://ec.europa.eu/eurostat/documents/6921402/16814042/Air+Images_Shutterstock_216783763_RV+%281%29.jpg/412354d4-ceb8-4dff-4f77-92ddaa6c65f9?t=1684852348217', title: 'Slide 5', description: 'This is a short description for slide 5.' },
        { image: 'https://pursuit.unimelb.edu.au/__data/assets/image/0028/78805/Sport-and-that-sense-of-belonging_51b3e794-7427-402d-84c3-810f654adc40.jpg', title: 'Slide 6', description: 'This is a short description for slide 6.' },
        { image: 'https://static.ffx.io/images/$zoom_0.189%2C$multiply_0.7725%2C$ratio_1.5%2C$width_756%2C$x_0%2C$y_0/t_crop_custom/q_86%2Cf_auto/2ee480f429c64f56126005a5cd366b2e894d8be5', title: 'Slide 7', description: 'This is a short description for slide 1.' },
        { image: 'https://images.squarespace-cdn.com/content/v1/5e6eca70898be713ac794808/1672855228121-PPWYQDHDX0R8U8ZVMXZ6/GettyImages-862317986.jpg', title: 'Slide 8', description: 'This is a short description for slide 2.' },
        { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Youth-soccer-indiana.jpg/1200px-Youth-soccer-indiana.jpg', title: 'Slide 9', description: 'This is a short description for slide 3.' },
        { image: 'https://sport.ec.europa.eu/sites/default/files/styles/eac_ratio_16_9_xl/public/sport-active-part-erasmus-plus-crop.jpg?h=5dabf909&itok=JM-JNmjy', title: 'Slide 10', description: 'This is a short description for slide 4.' },
    ];

    return (
        <div className='mx-auto max-w-[1090px] w-[95%] pt-3'>
            <Helmet>
                <title>DevDive | Home</title>
            </Helmet>
            <Slider slides={slides} />
            <div className="flex justify-center gap-5 mx-auto mt-5">
                <div className="flex-1 space-y-5">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
                <div className="sticky top-[68px] scrollBar h-[calc(100vh-80px)] overflow-y-auto lg:w-[27%] w-[250px] border dark:border-gray-800 rounded-2xl py-5 px-3 md:block hidden">
                    <h2 className="font-semibold text-black dark:text-white mb-5">Recent Posts</h2>

                    <div className="space-y-5">
                        <RecentPostCard></RecentPostCard>
                        <RecentPostCard></RecentPostCard>
                        <RecentPostCard></RecentPostCard>
                        <RecentPostCard></RecentPostCard>
                        <RecentPostCard></RecentPostCard>
                        <RecentPostCard></RecentPostCard>
                        <RecentPostCard></RecentPostCard>
                        <RecentPostCard></RecentPostCard>
                        <RecentPostCard></RecentPostCard>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
