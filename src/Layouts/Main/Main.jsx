import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <section className="mx-1">
           <div>navbar</div> 
           <div>
            <Outlet></Outlet>
           </div>
           <div>
            footer
           </div>
        </section>
    );
};

export default Main;