import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import CartContext from "../Cart/CartContext";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ openDrawer, toggleDrawer }) => {
    const navigate = useNavigate();

    const handleCheckout = () => {
        toggleDrawer()
        navigate('/checkout')
    }

    return (
        <div className={`fixed top-0 right-0 w-3/4 sm:w-1/4 md:w-[30rem] h-full bg-white shadow-lg
         transform transition-transform duration-300 flex flex-col z-50 ${openDrawer ? "translate-x-0" : "translate-x-full"}`} >
            <div className="flex justify-end p-4">
                <button
                    onClick={toggleDrawer}>
                    <IoMdClose className="h-6 w-6 text-gray-600" />
                </button>
            </div>
            <div className="flex-grow-0 p-4 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                <CartContext />
            </div>
            <div className="p-4 bg-white w-full mt-auto">
                <button
                    onClick={handleCheckout}
                    className="w-full bg-black text-white py-3
                 rounded-lg font-semibold hover:bg-gray-800">
                    Checkout
                </button>
                <p className="text-xs tracking-tighter
                 text-gray-500 mt-2 text-center">
                    shipping, taxes, and discount codes calculated at checkout
                </p>
            </div>
        </div>
    )
}

export default CartDrawer;