import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const OrderDetailsPage = () => {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const mockData = {
            _id: id,
            createdAt: new Date(),
            isPaid: true,
            isDelivered: false,
            paymentType: "PayPal",
            deliveryType: "standard",
            shippingAddress: { city: "New York", country: "USA" },
            orderItems: [
                {
                    productId: "1",
                    name: "Jacket",
                    price: 123,
                    quantity: 1,
                    image: "https://picsum.photos/150?random=1"
                },
                {
                    productId: "2",
                    name: "shirt",
                    price: 1234,
                    quantity: 2,
                    image: "https://picsum.photos/150?random=2"
                },
                {
                    productId: "3",
                    name: "Pant",
                    price: 1200,
                    quantity: 5,
                    image: "https://picsum.photos/150?random=3"
                },
            ],
        };
        setOrderDetails(mockData)
    }, [id]);

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className='text-2xl md:text-3xl font-bold mb-6'>
                Order Details
            </h2>
            {!orderDetails ? (
                <p>No Order Details found</p>
            ) : (
                <div className='p-4 sm:p-6 rounded-lg border'>
                    {/* Order Info*/}
                    <div className='flex flex-col sm:flex-row justify-between mb-8'>
                        <div>
                            <h3 className='text-lg md:text-xl font-semibold'>
                                Order ID: #{orderDetails._id}
                            </h3>
                            <p className='text-gray-600'>
                                {new Date(orderDetails.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                            <span className={`${orderDetails.isPaid ?
                                "bg-green-100 text-green-700" :
                                "bg-red-100 text-red-700"
                                }px-3 py-1 rounded-full text-sm font-medium mb-2`}
                            >
                                {orderDetails.isPaid ? "Approved" : "Pending"}
                            </span>
                            <span className={`${orderDetails.isDelivered ?
                                "bg-green-100 text-green-700" :
                                "bg-yellow-100 text-yellow-700"
                                }px-3 py-1 rounded-full text-sm font-medium mb-2`}
                            >
                                {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
                            </span>
                        </div>
                    </div>
                    {/* Customer, Payment, Shippinf Info*/}
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-3 gap-8 mb-8'>
                        <div>
                            <h4 className='text-lg font-bold mb-2'>Payment Info</h4>
                            <p className='text-gray-600 font-semibold'>Payment Method: {orderDetails.paymentType}</p>
                            <p className='text-gray-600 font-semibold'>Status: {orderDetails.isPaid ? "paid" : "Unpaid"}</p>
                        </div>
                        <div>
                            <h4 className='text-lg font-bold mb-2'>
                                Shipping Info
                            </h4>
                            <p className='text-gray-600 text-sm font-semibold'>
                                Shipping Method: {orderDetails.deliveryType}
                            </p>
                            <p className='text-gray-600 text-sm font-semibold'>
                                Address:{" "}
                                {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
                            </p>
                        </div>
                    </div>
                    {/*Product List*/}
                    <div className='overflow-x-auto'>
                        <h4 className='text-lg font-bold mb-4'>Products</h4>
                        <table className='min-w-full text-gray-600 font-semibold mb-4'>
                            <thead className='bg-gray-100'>
                                <tr>
                                    <td className='py-2 px-4'>Name</td>
                                    <td className='py-2 px-4'>UnitPrice</td>
                                    <td className='py-2 px-4'>Quantity</td>
                                    <td className='py-2 px-4'>Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.orderItems.map((item) => (
                                    <tr key={item.productId} className='border-b'>
                                        <td className='py-2 px-4 flex items-center'>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className='w-12 h-12 object-cover mr-4'
                                            />
                                            <Link
                                                to={`/product/${item.productId}`}
                                                className='text-blue-500 hover:underline'
                                            >
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td className='py-2 px-4'>Rs.{item.price}</td>
                                        <td className='py-2 px-4'>{item.quantity}</td>
                                        <td className='py-2 px-4'>Rs.{item.price * item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/*Back For Orders*/}
                    <Link
                        to="/my-orders"
                        className='text-blue-500 hover:underline'
                    >
                        Back To My Orders
                    </Link>
                </div>
            )
            }
        </div >
    )
}

export default OrderDetailsPage
