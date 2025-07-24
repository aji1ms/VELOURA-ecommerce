import React from "react";
import { TbBrandMeta } from "react-icons/tb"
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri"

const TopBar = () => {
    return (
        <div className="bg-[#ea2e0e] text-white">
            <div className="container mx-auto flex justify-between items-center py-3 px-4">
                <div className="hidden md:flex items-center space-x-4">
                    <a href="#">
                        <TbBrandMeta className="h-5 w-5" />
                    </a>
                    <a href="#">
                        <IoLogoInstagram className="h-5 w-5" />
                    </a>
                    <a href="#">
                        <RiTwitterXLine className="h-4 w-4" />
                    </a>
                </div>
                <div className="text-sm items-center flex-grow-0">
                    <span>We Ship WorldWide - Fast and Reliable Shipping</span>
                </div>
            </div>
        </div>
    )
}

export default TopBar;