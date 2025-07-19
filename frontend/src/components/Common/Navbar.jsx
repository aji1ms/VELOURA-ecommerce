import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    HiOutlineUser,
    HiOutlineShoppingBag,
    HiBars3BottomRight
} from "react-icons/hi2";
import SearchBar from "../Common/SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openNavDrawer, setOpenNavDrawer] = useState(false);

    const toggleNavDrawer = () => {
        setOpenNavDrawer(!openNavDrawer)
    }

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    }

    return (
        <>
            <nav className="container mx-auto flex items-center justify-between px-6 py-4">
                <div >
                    <Link to="/" className="text-2xl font-bold">
                        VELOURA
                    </Link>
                </div>
                <div className="hidden md:flex space-x-6">
                    <Link
                        to="/collections/all"
                        className="text-gray-700 hover:text-black text-sm font-semibold uppercase">
                        MEN
                    </Link>
                    <Link
                        to="#"
                        className="text-gray-700 hover:text-black text-sm font-semibold uppercase">
                        WOMEN
                    </Link>
                    <Link
                        to="#"
                        className="text-gray-700 hover:text-black text-sm font-semibold uppercase">
                        TOP WEAR
                    </Link>
                    <Link
                        to="#"
                        className="text-gray-700 hover:text-black text-sm font-semibold uppercase">
                        BOTTOM WEAR
                    </Link>
                </div>

                {/*Right Section*/}

                <div className="flex items-center space-x-4">
                    <Link to="/admin"
                        className="block bg-black text-white text-sm px-2 py-2 hover:bg-white
                         hover:text-black hover:border hover:border-black"
                    >
                        ADMIN
                    </Link>
                    <Link to="/profile" className="hover:text-black">
                        <HiOutlineUser className="h-6 w-6 text-gray-700" />
                    </Link>
                    <button
                        onClick={toggleDrawer}
                        className="relative hover:text-black">
                        <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
                        <span className="absolute -top-1 bg-[#ea2e0e] text-xs text-white rounded-full px-2 py-0.5">
                            4
                        </span>
                    </button>
                    <div className="overflow-hidden">
                        <SearchBar />
                    </div>
                    <button
                        onClick={toggleNavDrawer}
                        className="md:hidden hover:text-black">
                        <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
                    </button>
                </div>
            </nav>
            <CartDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />

            {/* Mobile Navigation */}

            <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white
                shadow-lg transform transition-transform duration-300 z-50 ${openNavDrawer ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex justify-end">
                    <button
                        onClick={toggleNavDrawer}
                    >
                        <IoMdClose className="h-6 w-6 text-gray-600" />
                    </button>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Menu</h2>
                    <nav className="space-y-4">
                        <Link
                            onClick={toggleNavDrawer}
                            to="#"
                            className="block text-gray-600 hover:text-black">
                            MEN
                        </Link>
                        <Link
                            onClick={toggleNavDrawer}
                            to="#"
                            className="block text-gray-600 hover:text-black">
                            WOMEN
                        </Link>
                        <Link
                            onClick={toggleNavDrawer}
                            to="#"
                            className="block text-gray-600 hover:text-black">
                            TOP WEAR
                        </Link>
                        <Link
                            onClick={toggleNavDrawer}
                            to="#"
                            className="block text-gray-600 hover:text-black">
                            BOTTOM WEAR
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar;