import React from "react";
import { Link } from "react-router-dom";
import featuredVideo from "../../assets/featuredVideo.webm";

const FeaturedCollections = () => {
    return (
        <section className="py-16 px-4 lg:px-0">
            <div className="container mx-auto flex flex-col-reverse
             lg:flex-row items-center bg-green-50 rounded-3xl">
                <div className="lg:w-1/2 p-8 text-center lg:text-left">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">
                        Comfort and Style
                    </h2>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        Apparel Made For Your Everyday Life
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Discover high-quality, Comfort clothing that effortlessly blends
                        fashion and function, Designed to make you look and feel great every day.
                    </p>
                    <Link
                        to="/collections/all"
                        className="bg-black text-white px-6 py-3 text-lg hover:bg-gray-800"
                    >
                        Shop Now
                    </Link>
                </div>

                <div className="lg:w-1/2">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        src={featuredVideo}
                        className="w-full h-[600px] object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"
                    />
                </div>

            </div>
        </section >
    )
}

export default FeaturedCollections;