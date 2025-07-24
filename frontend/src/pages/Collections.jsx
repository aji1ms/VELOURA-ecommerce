import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from "react-icons/fa"
import FilterSideBar from '../components/Products/FilterSideBar';
import SortOption from '../components/Products/SortOption';
import ProductGrid from '../components/Products/ProductGrid';

const Collections = () => {
    const [products, setproducts] = useState([]);
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    useEffect(() => {
        setTimeout(() => {
            const fetchedProduct = [
                {
                    _id: 1,
                    name: "Products 1",
                    price: 300,
                    images: [{ url: "https://picsum.photos/200?random=1", }]
                },
                {
                    _id: 2,
                    name: "Products 2",
                    price: 300,
                    images: [{ url: "https://picsum.photos/200?random=2", }]
                },
                {
                    _id: 3,
                    name: "Products 3",
                    price: 300,
                    images: [{ url: "https://picsum.photos/200?random=3", }]
                }, {
                    _id: 4,
                    name: "Products 4",
                    price: 300,
                    images: [{ url: "https://picsum.photos/200?random=4", }]
                }, {
                    _id: 5,
                    name: "Products 5",
                    price: 300,
                    images: [{ url: "https://picsum.photos/200?random=5", }]
                }, {
                    _id: 6,
                    name: "Products 6",
                    price: 300,
                    images: [{ url: "https://picsum.photos/200?random=6", }]
                }, {
                    _id: 7,
                    name: "Products 7",
                    price: 300,
                    images: [{ url: "https://picsum.photos/200?random=7", }]
                }, {
                    _id: 8,
                    name: "Products 8",
                    price: 300,
                    images: [{ url: "https://picsum.photos/200?random=8", }]
                },
            ]
            setproducts(fetchedProduct);
        }, 1000)
    }, [])

    return (
        <div className='flex flex-col lg:flex-row'>
            {/*Mobile Filter Button*/}
            <button
                onClick={toggleSidebar}
                className='lg:hidden border p-2 flex justify-center items-center'
            >
                <FaFilter className='mr-2' />Filter
            </button>
            {/*Filter Sidebar*/}
            <div
                ref={sidebarRef}
                className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50
                 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
            >
                <FilterSideBar />
            </div>
            <div className='flex-grow p-4'>
                <h2 className='text-2xl text-gray-600 font-bold uppercase mb-4'>All Collections</h2>
                {/*Filter Sidebar*/}
                <SortOption />
                {/*Filter Sidebar*/}
                <ProductGrid products={products} />
            </div>
        </div>
    )
}

export default Collections;