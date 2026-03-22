'use client'
import PageTitle from "@/components/PageTitle"
import { useEffect, useState } from "react";
import OrderItem from "@/components/OrderItem";
import axios from "axios";

export default function Orders() {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8083/api/orders/me',
                { withCredentials: true }
            );
            console.log(response.data.orders);

            const rawOrders = response.data.orders;

            // 🔥 enrich products
            const enrichedOrders = await Promise.all(
                rawOrders.map(async (order) => {

                    const itemsWithProducts = await Promise.all(
                        order.items.map(async (item) => {
                            try {
                                const res = await axios.get(
                                    `http://localhost:8081/api/products/${item.productId}`
                                );

                                return {
                                    ...item,
                                    product: res.data.product
                                };
                            } catch (err) {
                                return item;
                            }
                        })
                    );

                    return {
                        ...order,
                        items: itemsWithProducts
                    };
                })
            );

            setOrders(enrichedOrders);

        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        // <div className="min-h-[70vh]">
        //     {orders.length > 0 ? (
        //         <div className="my-10 max-w-7xl mx-auto px-6 lg:px-10">
        //             <PageTitle 
        //                 heading="My Orders" 
        //                 text={`Showing total ${orders.length} orders`} 
        //                 linkText={'Go to home'} 
        //             />

        //             <table className="w-full max-w-7xl text-slate-500 table-auto border-separate border-spacing-y-4 border-spacing-x-0">
        //                 <thead>
        //                     <tr className="max-sm:text-sm text-slate-600 max-md:hidden">
        //                         <th className="text-left">Product</th>
        //                         <th className="text-center">Total Price</th>
        //                         <th className="text-left px-6">Address</th>
        //                         <th className="text-center">Status</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {orders.map((order) => (
        //                         <OrderItem order={order} key={order._id} />
        //                     ))}
        //                 </tbody>
        //             </table>
        //         </div>
        //     ) : (
        //         <div className="min-h-[80vh] flex items-center justify-center text-slate-400">
        //             <h1 className="text-2xl sm:text-4xl font-semibold">
        //                 You have no orders
        //             </h1>
        //         </div>
        //     )}
        // </div>



        
<div className="min-h-[70vh]">
  {orders.length > 0 ? (
    <div className="my-10 max-w-7xl mx-auto px-6 lg:px-10">
      
      <PageTitle
        heading="My Orders"
        text={`Showing total ${orders.length} orders`}
        linkText={"Go to home"}
      />

      {/* 🔥 CARD LIST (NO TABLE) */}
      <div className="mt-8 space-y-6">
        {orders.map((order) => (
          <OrderItem key={order._id} order={order} />
        ))}
      </div>

    </div>
  ) : (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl sm:text-5xl font-bold text-gray-700 mb-3">
        No Orders Yet 🛒
      </h1>
    </div>
  )}
</div>
    );
}