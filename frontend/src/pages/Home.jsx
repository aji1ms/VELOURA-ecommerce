import React from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import FeaturedCollections from "../components/Products/FeaturedCollections";
import FeaturedSection from "../components/Products/FeaturedSection";
import ProductDetails from "../components/Products/ProductDetails";

const Home = () => {
    return (
        <div>
            <Hero />
            <GenderCollectionSection />
            <NewArrivals />
            <FeaturedCollections />
            <FeaturedSection />
        </div>
    )
}


export default Home;