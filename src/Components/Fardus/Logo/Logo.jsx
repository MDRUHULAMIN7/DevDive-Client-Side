import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const Logo = () => {
    return (
        <div>
            <Link to='/' className='flex justify-start items-center gap-2'> 
                <img src={logo} className='w-10' alt="logo" />
                <span className='font-black text-2xl text-pm-color sm:block hidden'>DevDive</span>
            </Link>
        </div>
    );
};

export default Logo;