import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Fardus/Navbar/Navbar";
import SignModal from "../../Components/Nur/SignModal";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const Main = () => {

    const { logout, user, isModalOpen } = useContext(AuthContext);


    return (
        <section className="text-black dark:text-white font-Montserrat">
                <Navbar></Navbar>
            <div className="mt-[56px] lg:ml-[256px]">
                {(isModalOpen && user === null) && <SignModal></SignModal>}
                <Outlet></Outlet>
            </div>
        </section>
    );
};

export default Main;