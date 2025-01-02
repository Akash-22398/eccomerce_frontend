import React, { useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom"; // Added `useLocation` to determine active route
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faHouse, faList } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isEditProductPage = matchPath("/edit-product/:id", location.pathname);
    const isEditSubCategoryPage = matchPath("/edit-subcategory/:id", location.pathname);
    const isEditCategoryPage = matchPath("/edit-category/:id", location.pathname);
    return (
        <div className="flex">
            {/* Toggle Button */}
            <button
                className="lg:hidden p-2 m-2 bg-blue-600 text-white rounded focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </button>

            {/* Sidebar */}
            <aside
                className={`bg-[#F4F4F4] text-black w-72 min-h-screen p-6 fixed lg:relative transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0`}
            >
                <nav className="space-y-4">
                    <Link
                        to="/"
                        className={`flex items-center relative p-2 rounded ${location.pathname === "/" ? "bg-[#F4EDAF]" : "hover:bg-gray-200"
                            }`}
                        onClick={() => setIsOpen(false)}
                    >
                        <FontAwesomeIcon icon={faHouse} className="text-xl mr-4" />
                        Home
                        <FontAwesomeIcon icon={faCaretRight} className="text-2xl absolute right-1" />

                    </Link>
                    <Link
                        to="/category"
                        className={`flex items-center relative p-2 rounded ${(location.pathname === "/category" || location.pathname === "/add-category" || isEditCategoryPage)
                            ? "bg-[#F4EDAF]"
                            : "hover:bg-gray-200"
                            }`}
                        onClick={() => setIsOpen(false)}
                    >
                        <img src="/category.png" alt="category" className="w-[20px] h-[20px] mr-4" />
                        Category
                        <FontAwesomeIcon icon={faCaretRight} className="text-2xl absolute right-1" />
                    </Link>
                    <Link
                        to="/sub-category"
                        className={`flex items-center relative p-2 rounded ${(location.pathname === "/sub-category" || location.pathname === "/add-subcategory" || isEditSubCategoryPage)
                            ? "bg-[#F4EDAF]"
                            : "hover:bg-gray-200"
                            }`}
                        onClick={() => setIsOpen(false)}
                    >
                        <FontAwesomeIcon icon={faList} className="text-xl mr-4" />
                        Subcategory
                        <FontAwesomeIcon icon={faCaretRight} className="text-2xl absolute right-1" />

                    </Link>
                    <Link
                        to="/products"
                        className={`flex items-center relative p-2 rounded ${(location.pathname === "/products" || location.pathname === "/add-product" || isEditProductPage)
                            ? "bg-[#F4EDAF]"
                            : "hover:bg-gray-200"
                            }`}
                        onClick={() => setIsOpen(false)}
                    >
                        <FontAwesomeIcon icon={faList} className="text-xl mr-4" />
                        Products
                        <FontAwesomeIcon icon={faCaretRight} className="text-2xl absolute right-1" />

                    </Link>
                </nav>
            </aside>


        </div>
    );
};

export default Sidebar;
