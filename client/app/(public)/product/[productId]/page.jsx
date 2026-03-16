// "use client";
// import ProductDescription from "@/components/ProductDescription";
// import ProductDetails from "@/components/ProductDetails";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Product() {
//   const { productId } = useParams();
//   const [product, setProduct] = useState();
//   const [loading, setLoading] = useState(true);
//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8081/api/products/${productId}`,
//       );
//       setProduct(res.data.data || null);
//       console.log("Data: ", res.data);
//     } catch (error) {
//       console.error("Error fetching product: ", error);
//       setProduct(null);
//     }
//   };

//   useEffect(() => {
//     fetchProduct();
//     scrollTo(0, 0);
//   }, [productId]);

//   return (
//     <div className="mx-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Breadcrums */}
//         <div className="text-gray-600 text-sm mt-8 mb-5">
//           Home / Products / {product?.category}
//         </div>

//         {/* Product Details */}
//         {product && <ProductDetails product={product} />}

//         {/* Description & Reviews */}
//         {product && <ProductDescription product={product} />}
//       </div>
//     </div>
//   );
// }










"use client";

import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "@/components/Loading";

export default function Product() {
  const { productId } = useParams();
  const products = useSelector((state) => state.product.list);

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8081/api/products/${productId}`
      );

      setProduct(res.data.product || null);
      console.log("Data: ", res.data);
      console.log("Product: ", productId);
      
    } catch (error) {
      console.error(error);
      setProduct(null);
    }
  };

  useEffect(() => {
    const existingProduct = products.find((p) => p._id === productId);

    if (existingProduct) {
      setProduct(existingProduct);
    } else {
      fetchProduct();
    }

    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) return <Loading />;

  return (
    <div className="mx-6">
      <div className="max-w-7xl px-6 lg:px-8 mx-auto">
        <div className="text-gray-600 text-sm mt-8 mb-5">
          Home / Products / {product.category}
        </div>

        <ProductDetails product={product} />
        <ProductDescription product={product} />
      </div>
    </div>
  );
}