import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Fardus/Navbar/Navbar";

const Main = () => {
    return (
        <section className="">
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