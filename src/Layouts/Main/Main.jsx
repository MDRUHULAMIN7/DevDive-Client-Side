import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Fardus/Navbar/Navbar";

const Main = () => {
    return (
        <section className="text-black dark:text-white font-Montserrat">
            <div>
                <Navbar></Navbar>
            </div>
            <div className="mt-[68px] lg:ml-[256px]">
                <Outlet></Outlet>
            </div>
        </section>
    );
};

export default Main;