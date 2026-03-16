// 'use client'

// import { addToCart } from "@/lib/features/cart/cartSlice";
// import { addItemToCart } from "@/lib/features/cart/cartActions";
// import { StarIcon, TagIcon, EarthIcon, CreditCardIcon, UserIcon } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import Image from "next/image";
// import Counter from "./Counter";
// import { useDispatch, useSelector } from "react-redux";

// const ProductDetails = ({ product }) => {

//     const productId = product.id;
//     const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

//     const cart = useSelector(state => state.cart.cartItems);
//     const dispatch = useDispatch();

//     const router = useRouter()

//     const [mainImage, setMainImage] = useState(product.images[0]);

//     const addToCartHandler = () => {
//         dispatch(addItemToCart({ productId }))
//     }

//     const averageRating = product.rating.reduce((acc, item) => acc + item.rating, 0) / product.rating.length;

//     return (
//         <div className="flex max-lg:flex-col gap-12">
//             <div className="flex max-sm:flex-col-reverse gap-3">
//                 <div className="flex sm:flex-col gap-3">
//                     {product.images.map((image, index) => (
//                         <div key={index} onClick={() => setMainImage(product.images[index])} className="bg-slate-100 flex items-center justify-center size-26 rounded-lg group cursor-pointer">
//                             <Image src={image} className="group-hover:scale-103 group-active:scale-95 transition" alt="" width={45} height={45} />
//                         </div>
//                     ))}
//                 </div>
//                 <div className="flex justify-center items-center h-100 sm:size-113 bg-slate-100 rounded-lg ">
//                     <Image src={mainImage} alt="" width={250} height={250} />
//                 </div>
//             </div>
//             <div className="flex-1">
//                 <h1 className="text-3xl font-semibold text-slate-800">{product.name}</h1>
//                 <div className='flex items-center mt-2'>
//                     {Array(5).fill('').map((_, index) => (
//                         <StarIcon key={index} size={14} className='text-transparent mt-0.5' fill={averageRating >= index + 1 ? "#00C950" : "#D1D5DB"} />
//                     ))}
//                     <p className="text-sm ml-3 text-slate-500">{product.rating.length} Reviews</p>
//                 </div>
//                 <div className="flex items-start my-6 gap-3 text-2xl font-semibold text-slate-800">
//                     <p> {currency}{product.price} </p>
//                     <p className="text-xl text-slate-500 line-through">{currency}{product.mrp}</p>
//                 </div>
//                 <div className="flex items-center gap-2 text-slate-500">
//                     <TagIcon size={14} />
//                     <p>Save {((product.mrp - product.price) / product.mrp * 100).toFixed(0)}% right now</p>
//                 </div>
//                 <div className="flex items-end gap-5 mt-10">
//                     {
//                         cart[productId] && (
//                             <div className="flex flex-col gap-3">
//                                 <p className="text-lg text-slate-800 font-semibold">Quantity</p>
//                                 <Counter productId={productId} />
//                             </div>
//                         )
//                     }
//                     <button onClick={() => !cart[productId] ? addToCartHandler() : router.push('/cart')} className="bg-slate-800 text-white px-10 py-3 text-sm font-medium rounded hover:bg-slate-900 active:scale-95 transition">
//                         {!cart[productId] ? 'Add to Cart' : 'View Cart'}
//                     </button>
//                 </div>
//                 <hr className="border-gray-300 my-5" />
//                 <div className="flex flex-col gap-4 text-slate-500">
//                     <p className="flex gap-3"> <EarthIcon className="text-slate-400" /> Free shipping worldwide </p>
//                     <p className="flex gap-3"> <CreditCardIcon className="text-slate-400" /> 100% Secured Payment </p>
//                     <p className="flex gap-3"> <UserIcon className="text-slate-400" /> Trusted by top brands </p>
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default ProductDetails

"use client";

import { addItemToCart } from "@/lib/features/cart/cartActions";
import {
  StarIcon,
  TagIcon,
  EarthIcon,
  CreditCardIcon,
  UserIcon,
  XCircle,
  AlertTriangle,
  Package,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ product }) => {
  const productId = product._id;
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const router = useRouter();

  const images = product?.images?.map((img) => img.url) || [];

  const [mainImage, setMainImage] = useState(images[0]);

  //   const addToCartHandler = () => {
  //     dispatch(addItemToCart({ productId }));
  //   };

  // demo rating
  const averageRating = 4;
  const totalReviews = 6;

  return (
    <div className="flex max-lg:flex-col gap-12">
      <div className="flex max-sm:flex-col-reverse gap-3">
        <div className="flex sm:flex-col gap-3">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setMainImage(image)}
              className="bg-slate-100 flex items-center justify-center size-24 rounded-lg cursor-pointer"
            >
              <Image src={image} alt={product.title} width={60} height={60} />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center h-96 sm:w-96 bg-slate-100 rounded-lg">
          <Image src={mainImage} alt={product.title} width={250} height={250} />
        </div>
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-slate-800">
          {product.title}
        </h1>

        <div className="flex items-center mt-2">
          {Array(5)
            .fill("")
            .map((_, index) => (
              <StarIcon
                key={index}
                size={14}
                className="text-transparent mt-0.5"
                fill={averageRating >= index + 1 ? "#00C950" : "#D1D5DB"}
              />
            ))}
          <p className="text-sm ml-3 text-slate-500">{totalReviews} Reviews</p>
        </div>

        <div className="flex items-start my-5 gap-3 text-2xl font-semibold text-slate-800">
          <p>
           {currency} {product.price?.amount?.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <TagIcon size={14} />
          <p>Category: {product.category}</p>
        </div>

        <div className="mt-3 text-sm flex items-center gap-2">
          {product.stock === 0 ? (
            <>
              <XCircle size={16} className="text-red-500" />
              <span className="text-red-500">Out of stock</span>
            </>
          ) : product.stock <= 10 ? (
            <>
              <AlertTriangle size={16} className="text-orange-500" />
              <span className="text-orange-500">
                Hurry! Only {product.stock} left
              </span>
            </>
          ) : (
            <>
              <Package size={16} className="text-slate-500" />
              <span className="text-slate-500">{product.stock} available</span>
            </>
          )}
        </div>

        <div className="flex items-end gap-5 mt-6">
          {/* {cart[productId] && (
            <div className="flex flex-col gap-3">
              <p className="text-lg font-semibold">Quantity</p>
              <Counter productId={productId} />
            </div>
          )} */}

          <button
            // onClick={() =>
            //   !cart[productId]
            //     ? addToCartHandler()
            //     : router.push("/cart")
            // }
            disabled={product.stock === 0}
            className={`px-10 py-3 rounded text-white ${
              product.stock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-slate-800 hover:bg-slate-900"
            }`}
          >
            {/* {!cart[productId] ? "Add to Cart" : "View Cart"} */}

            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>

        <hr className="border-gray-300 my-5" />

        <div className="flex flex-col gap-4 text-slate-500">
          <p className="flex gap-3 text-md">
            <EarthIcon size={20}/> Free shipping worldwide 
          </p>
          <p className="flex gap-3 text-md">
            <CreditCardIcon size={20}/> 100% Secured Payment
          </p>
          <p className="flex gap-3 text-md">
            <UserIcon size={20}/> Trusted by top brands
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
