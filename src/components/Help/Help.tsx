
import { Outlet } from "react-router-dom";
import "./Help.css";
import LeftNav from "./LeftNav";

import Footer from "../Footer/Footer";

const Help = () => {
    return (
        <>
            <div className="nav_container d-flex help_main_page">
                <LeftNav />
                <Outlet />
            </div>
            <Footer helpIcon={false} />
        </>

    )
}

export default Help