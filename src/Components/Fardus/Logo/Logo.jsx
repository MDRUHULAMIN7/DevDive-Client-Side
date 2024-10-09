import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const Logo = () => {
    return (
        <div className='xl:w-[186px]'>
            <Link to='/' className='flex justify-start items-center'> 
                <img src={logo} className='w-10' alt="logo" />
                <span className='font-black text-2xl text-pm-color sm:block hidden'>evDive</span>
            </Link>
        </div>
    );
};

export default Logo;