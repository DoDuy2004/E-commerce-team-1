import React, { useEffect, useState } from "react";
import { ProductDetailInfo } from "../components/ProductDetail/ProductDetailInfo";
import { ProductDetailImage } from "../components/ProductDetail/ProductDetailImage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailProduct } from "../redux/slices/productSlice";

export const ProductDetail = () => {
  const [productData, setProductData] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({}); // Thuộc tính đã chọn
  const [selectedVariant, setSelectedVariant] = useState(null); // Biến thể được chọn
  const [attributes, setAttributes] = useState([]); // Danh sách thuộc tính
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.products || {}
  );

  function extractAttributes(variants) {
    const attributeMap = {};

    variants.forEach((variant) => {
      variant.attributes.forEach((attr) => {
        if (!attributeMap[attr.type]) {
          attributeMap[attr.type] = new Set();
        }
        attributeMap[attr.type].add(attr.value);
      });
    });

    return Object.entries(attributeMap).map(([type, values]) => ({
      type,
      values: [...values],
    }));
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchDetailProduct(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      setProductData(product);
      // Tạo danh sách thuộc tính từ các biến thể
      const groupedAttributes = extractAttributes(product.variants);

      setAttributes(groupedAttributes);

      console.log(groupedAttributes);
    }
  }, [product]);

  useEffect(() => {
    if (product && Object.keys(selectedAttributes).length > 0) {
      const compatibleVariants = product.variants.filter((v) =>
        Object.entries(selectedAttributes).every(([type, value]) =>
          v.attributes.some(
            (attr) => attr.type === type && attr.value === value
          )
        )
      );
      if (compatibleVariants.length === 1) {
        setSelectedVariant(compatibleVariants[0]);
      } else {
        setSelectedVariant(null);
      }
    } else {
      setSelectedVariant(null);
    }
  }, [selectedAttributes, product]);

  // Callback để cập nhật thuộc tính
  const handleAttributesChange = (newAttributes) => {
    setSelectedAttributes(newAttributes);
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
              : productData.productData.images
          }
        />
        <ProductDetailInfo
          product={productData.productData}
          variants={productData.variants}
          attributes={attributes}
          onAttributesChange={handleAttributesChange}
          selectedAttributes={selectedAttributes}
          selectedVariant={selectedVariant}
        />
      </div>
    </div>
  );
};
