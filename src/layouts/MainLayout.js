import React from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => (
    <div>
        <header>
            <Header />
        </header>
        <div className="flex flex-row px-6 sm:px-0 sm:mx-auto">
            <div className="w-[20%]">
                <Sidebar />
            </div>
            <div className="w-[80%] relative">
                <div className="shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-white my-3 rounded-[10px] ml-3 min-h-[590px]">
                    <main>{children}</main>
                </div>
            </div>
        </div>
        <footer>
            {/* <Footer /> */}
        </footer>
    </div>
);

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;
