import logo from '../../../assets/logo.png';

const Logo = () => {
    return (
        <div>
            <div className='flex justify-start items-center gap-2'> 
                <img src={logo} className='w-10' alt="logo" />
                <span className='font-bold text-2xl text-pm-color sm:block hidden'>DevDive</span>
            </div>
        </div>
    );
};

export default Logo;