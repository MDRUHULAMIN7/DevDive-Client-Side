import { Link } from 'react-router-dom';


const Logo = () => {
    return (
        <div className='xl:w-[186px]'>
            <Link to='/' className='flex justify-start items-center'> 
                <img src='https://res.cloudinary.com/dpomtzref/image/upload/v1729491491/1000005962_n0vgih.png' className='w-6' alt="logo" />
                <span className='font-black text-2xl text-pm-color sm:block hidden'>evDive</span>
            </Link>
        </div>
    );
};

export default Logo;