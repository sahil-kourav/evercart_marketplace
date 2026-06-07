"use client";

import { addItemToCart } from "@/lib/features/cart/cartActions";
import toast from "react-hot-toast";
import {
  StarIcon,
  TagIcon,
  EarthIcon,
  CreditCardIcon,
  UserIcon,
  XCircle,
  AlertTriangle,
  Package,
  EarthLockIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { fetchCart } from "@/lib/features/cart/cartActions";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ product }) => {
  const productId = product._id;
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  const { cart } = useSelector((state) => state.cart);

  const quantity =
    cart?.items?.find((item) => item.productId === productId)?.quantity || 0;

  const dispatch = useDispatch();
  const router = useRouter();

  const images = product?.images?.map((img) => img.url) || [];

  const [mainImage, setMainImage] = useState(images[0]);

  const addToCartHandler = async () => {
    try {
      await dispatch(addItemToCart({ productId, qty: 1 }));

      toast.success("Item added to cart 🛒");
    } catch (error) {
      toast.error("Failed to add item ❌");
    }
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // demo rating
  const averageRating = 4.5;
  const totalReviews = 8;

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

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, index) => (
                <StarIcon
                  key={index}
                  size={14}
                  className="text-transparent"
                  fill={averageRating >= index - 1 ? "#00C950" : "#D1D5DB"}
                />
              ))}
          </div>
          <p className="text-sm font-medium text-slate-700">{averageRating} </p>
          <span className="text-slate-500">·</span>
          <p className="text-sm font-normal text-slate-800">
            {totalReviews} reviews
          </p>
        </div>

        <div className="flex items-start my-5 gap-3 text-2xl font-semibold text-slate-800">
          <p>
            {currency} {product.price?.amount?.toLocaleString()}
          </p>
        </div>

        <div className="flex items-end gap-5 mt-6">
          {quantity > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-lg font-semibold">Quantity</p>
              <Counter productId={productId} quantity={quantity} />
            </div>
          )}

          <button
            onClick={() =>
              quantity === 0 ? addToCartHandler() : router.push("/cart")
            }
            className="bg-slate-800 text-white px-10 py-3 text-sm font-medium rounded hover:bg-slate-900 active:scale-95 transition"
          >
            {quantity === 0 ? "Add to Cart" : "View Cart"}
          </button>
        </div>

        <hr className="border-gray-300 my-5" />

        <div className="flex flex-col gap-2 text-slate-600">
          <p className="flex items-center gap-3 text-md font-normal">
            <Package size={18} /> Estimated delivery within 3-5 business days
          </p>
          <p className="flex items-center gap-3 text-md font-normal">
            <TagIcon size={18} /> Easy returns within 6 days of delivery
          </p>

          <p className="flex items-center gap-3 text-md font-normal">
            <EarthLockIcon size={18} /> We ship worldwide, wherever you are
          </p>
          <p className="flex items-center gap-3 text-md font-normal">
            <UserIcon size={18} /> 24/7 customer support, we're here to help
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
