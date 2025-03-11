
import React, { useEffect, useState } from "react";
import { ProductDetailInfo } from "../components/ProductDetail/ProductDetailInfo";
import { ProductDetailImage } from "../components/ProductDetail/ProductDetailImage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailProduct } from "../redux/slices/productSlice";

export const ProductDetail = () => {
  const [productData, setProductData] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const allImages = [];
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.products || {}
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchDetailProduct(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      setProductData(product);
      const defaultVariant =
        product.variants.find((v) => v._id === product.variantDefault) ||
        product.variants[0];
      setSelectedVariant(defaultVariant);
    }
  }, [product]);

  const handleVariantChange = (variantId) => {
    const newVariant = productData.variants.find((v) => v._id === variantId);
    setSelectedVariant(newVariant);
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductDetailImage
          images={
            selectedVariant
              ? selectedVariant.images
              : productData.product.images
          }
        />
        <ProductDetailInfo
          product={productData.product}
          variants={productData.variants}
          attributes={productData.attributes}
          selectedVariant={selectedVariant}
          onVariantChange={handleVariantChange}
        />
      </div>
    </div>
  );
};
