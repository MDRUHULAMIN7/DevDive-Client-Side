import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Fardus/Navbar/Navbar";

const Main = () => {
    return (
        <section className="text-black dark:text-white font-Montserrat">
                <Navbar></Navbar>
            <div className="mt-[56px] lg:ml-[256px]">
                <Outlet></Outlet>
            </div>
        </section>
    );
};

export default Main;