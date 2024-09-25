import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Fardus/Navbar/Navbar";
// import SignModal from "../../Components/Nur/SignModal";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
// import RuhulSignIn from "../../Components/Ruhul/Card-Ruhul/RuhulSignIn";
import SignModal from "../../Components/Nur/SignModal";

const Main = () => {

    const { logout, user, isModalOpen } = useContext(AuthContext);


    return (
        <section className="text-black dark:text-white font-Montserrat">
                <Navbar></Navbar>
            <div className="mt-[56px] xl:ml-[256px]">
                {(isModalOpen && user === null) && <SignModal></SignModal>}
                <Outlet></Outlet>
            </div>
        </section>
    );
};

export default Main;