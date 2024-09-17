import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Fardus/Navbar/Navbar";

const Main = () => {
    return (
        <section className="mx-1">
           <Navbar></Navbar>
           <div>
            <Outlet></Outlet>
           </div>
        </section>
    );
};

export default Main;