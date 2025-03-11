import React, { useEffect, useState } from "react";
import { ProductDetailInfo } from "../components/ProductDetail/ProductDetailInfo";
import { ProductDetailImage } from "../components/ProductDetail/ProductDetailImage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDetailProduct,
} from "../redux/slices/productSlice";
import { SellerProfile } from "../components/ProductDetail/SellerProfile";
import AsSeenOn from "../components/ProductDetail/AsSeenOn";
import { ListProduct } from "../components/Product/ListProduct";
import SkeletonLoader from "../components/Loader/SkeletionLoader";

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

  // Lấy dữ liệu sản phẩm từ Redux
  useEffect(() => {
    if (id) {
      dispatch(fetchDetailProduct(id));
    }
  }, [id, dispatch]);

  // Xử lý dữ liệu sản phẩm khi nhận được
  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      setProductData(product);
      // Tạo danh sách thuộc tính từ các biến thể
      const groupedAttributes = product.variants
        .flatMap((v) => v.attributes)
        .reduce((acc, { type, value }) => {
          const attr = acc.find((a) => a.type === type);
          if (attr) {
            attr.values.add(value);
          } else {
            acc.push({ type, values: new Set([value]) });
          }
          return acc;
        }, [])
        .map((attr) => ({ type: attr.type, values: Array.from(attr.values) }));
      setAttributes(groupedAttributes);
    }
  }, [product]);

  // Cập nhật biến thể khi thuộc tính thay đổi
  useEffect(() => {
    if (productData && Object.keys(selectedAttributes).length > 0) {
      const compatibleVariants = productData.variants.filter((v) =>
        Object.entries(selectedAttributes).every(([type, value]) =>
          v.attributes.some(
            (attr) => attr.type === type && attr.value === value
          )
        )
      );
      // Nếu chỉ có 1 biến thể khớp, chọn nó
      if (compatibleVariants.length === 1) {
        setSelectedVariant(compatibleVariants[0]);
      } else {
        setSelectedVariant(null);
      }
    } else {
      setSelectedVariant(null); // Không có thuộc tính nào được chọn thì không chọn biến thể
    }
  }, [selectedAttributes, productData]);

  // Callback để cập nhật thuộc tính
  const handleAttributesChange = (newAttributes) => {
    setSelectedAttributes(newAttributes);
  };

  if (!productData) {
    return (
      <div className="flex justify-center items-center my-50">
        <SkeletonLoader />
      </div>
    );
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
      <SellerProfile />
      <AsSeenOn />
    </div>
  );
};
