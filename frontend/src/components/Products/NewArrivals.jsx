import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const newArrivals = [
        {
            _id: "1",
            name: "jacket",
            price: 100,
            imgaes: [
                {
                    url: "https://picsum.photos/200?random=1",
                    alt: "jacket"
                }
            ]
        },
        {
            _id: "2",
            name: "shirt",
            price: 200,
            imgaes: [
                {
                    url: "https://picsum.photos/200?random=2",
                    alt: "shirt"
                }
            ]
        },
        {
            _id: "3",
            name: "pants",
            price: 100,
            imgaes: [
                {
                    url: "https://picsum.photos/200?random=3",
                    alt: "jacket"
                }
            ]
        },
        {
            _id: "4",
            name: "jacket",
            price: 100,
            imgaes: [
                {
                    url: "https://picsum.photos/200?random=4",
                    alt: "jacket"
                }
            ]
        },
        {
            _id: "5",
            name: "jacket",
            price: 100,
            imgaes: [
                {
                    url: "https://picsum.photos/200?random=5",
                    alt: "jacket"
                }
            ]
        },
        {
            _id: "6",
            name: "jacket",
            price: 100,
            imgaes: [
                {
                    url: "https://picsum.photos/200?random=6",
                    alt: "jacket"
                }
            ]
        },
        {
            _id: "7",
            name: "jacket",
            price: 100,
            imgaes: [
                {
                    url: "https://picsum.photos/200?random=7",
                    alt: "jacket"
                }
            ]
        },
        {
            _id: "8",
            name: "jacket",
            price: 100,
            imgaes: [
                {
                    url: "https://picsum.photos/200?random=8",
                    alt: "jacket"
                }
            ]
        },
    ]

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    }

    const handleMouseUpOrLeave = (e) => {
        setIsDragging(false);
    }

    const scroll = (direction) => {
        const scrollAmount = direction === 'left' ? -300 : 300;
        scrollRef.current.scrollBy({ left: scrollAmount, behaviour: 'smooth' });
    }

    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (container) {
            const leftScroll = container.scrollLeft;
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;

            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable);
        }
    }

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons)
            updateScrollButtons();
            return () => container.addEventListener("scroll", updateScrollButtons)
        }
    }, [])

    return (
        <section className="py-16 px-4 lg:px-0">
            <div className="container mx-auto text-center mb-10 relative">
                <h2 className="text-3xl font-bold mb-4">
                    Explore New Arrivals
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                    Discover the latest styles straight off the runway, freshly added to
                    keep your wardrobe on the cutting edge of fashion.
                </p>

                <div className="absolute right-0 bottom-[-50px] flex space-x-2">
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`p-2 rounded border ${canScrollLeft ? 'bg-white text-black' : 'bg-gray-300 cursor-not-allowed'}`}>
                        <FiChevronLeft className="text-2xl" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className={`p-2 rounded border ${canScrollRight ? 'bg-white text-black' : 'bg-gray-300 cursor-not-allowed'}`}>
                        <FiChevronRight className="text-2xl" />
                    </button>
                </div>

                <div
                    ref={scrollRef}
                    className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                >

                    {newArrivals.map((product) => (
                        <div key={product._id}
                            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
                        >
                            <img
                                src={product.imgaes[0]?.url}
                                alt={product.name}
                                className="w-full h-[400px] object-cover"
                                draggable="false"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4">
                                <Link to={`/product/${product._id}`} className="block">
                                    <h4 className="font-medium">{product.name}</h4>
                                    <p className="mt-1">Rs.{product.price}</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default NewArrivals;