import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectedProduct = {
    name: "Stlish fashion",
    price: 120,
    orginalPrice: 150,
    description: "This is a stylish jacket perfect for any occasion",
    material: "Leather",
    size: ["S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Black"],
    images: [
        {
            url: "https://picsum.photos/500/500?random=1",
            altText: "Stylish jacket 1"
        },
        {
            url: "https://picsum.photos/500/500?random=2",
            altText: "Stylish jacket 2"
        },
    ]
}

const similarProducts = [
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
    },
]

const ProductDetails = () => {
    const [mainImage, setMainImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url);
        }
    }, [selectedProduct])

    const handleQuantityChange = (action) => {
        if (action == "plus") setQuantity(prev => prev + 1)
        if (action == "minus" && quantity > 1) setQuantity(prev => prev - 1)
    }

    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            toast.error("Please select a size and colour", {
                duration: 2000,
            });
            return;
        }
        setIsButtonDisabled(true);
        setTimeout(() => {
            toast.success("Product added to cart", {
                duration: 2000,
            })
            setIsButtonDisabled(false);
        }, 500);
    }

    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
                <div className="flex flex-col md:flex-row">
                    {/*Left Thumbnail */}
                    <div className="hidden md:flex flex-col space-y-4 mr-6">
                        {selectedProduct.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={image.altText}
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                                     ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                                onClick={() => setMainImage(image.url)}
                            />
                        ))}
                    </div>
                    {/*Main Thumbnail */}
                    <div className="md:w-1/2">
                        <div className="mb-4">
                            <img
                                src={mainImage}
                                alt="Main Product"
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>
                    </div>
                    {/*Mobile Thumbnail */}
                    <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
                        {selectedProduct.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={image.altText}
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                                     ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                                onClick={() => setMainImage(image.url)}
                            />
                        ))}
                    </div>
                    {/*Right side*/}
                    <div className="md:w-1/2 md:ml-10">
                        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                            {selectedProduct.name}
                        </h1>
                        <p className="text-lg text-red-600 mb-1 line-through">
                            Rs.{selectedProduct.orginalPrice && `${selectedProduct.orginalPrice}`}
                        </p>
                        <p className="text-xl text-gray-600 font-bold mb-6">
                            Rs.{selectedProduct.price}
                        </p>

                        <div className="mb-6">
                            <p className="text-gray-700">COLOUR:</p>
                            <div className="flex gap-2 mt-2">
                                {selectedProduct.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-8 h-8 rounded-full border
                                             ${selectedColor == color ? "border-4 border-black" : "border-gray-300"}`}
                                        style={{ backgroundColor: color.toLocaleLowerCase() }}
                                    >
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-700">SELECT SIZE: </p>
                            <div className="flex gap-2 mt-2 mb-6">
                                {selectedProduct.size.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded border
                                             ${selectedSize == size ? "bg-black text-white" : ""}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            <p className="text-gray-600 mb-4 mt-4" >
                                {selectedProduct.description}
                            </p>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700 mb-2">Quantity:</p>
                            <div className="flex items-center space-x-4 mt-2">
                                <button
                                    onClick={() => handleQuantityChange("minus")}
                                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                                >
                                    -
                                </button>
                                <span className="text-lg">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange("plus")}
                                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={isButtonDisabled}
                            className={`bg-black text-white py-2 px-6 w-full mb-4
                                ${isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"}`}
                        >
                            {isButtonDisabled ? "Adding..." : "ADD TO CART"}
                        </button>

                        <div className="mt-10 text-gray-700">
                            <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                            <table className="w-full text-left text-sm text-gray-600">
                                <tbody>
                                    <tr>
                                        <td className="py-1">Material</td>
                                        <td className="py-1">{selectedProduct.material}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="mt-20">
                    <h2 className="text-2xl text-center font-semibold mb-4">
                        You May Also Like
                    </h2>
                    <ProductGrid products={similarProducts} />
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;