import React, { useEffect } from "react";
import { ProductDetailInfo } from "../components/ProductDetail/ProductDetailInfo";
import { ProductDetailImage } from "../components/ProductDetail/ProductDetailImage";
import { ProductDescription } from "../components/ProductDetail/ProductDescription";
import { SellerProfile } from "../components/ProductDetail/SellerProfile";
import AsSeenOn from "../components/ProductDetail/AsSeenOn";
import { ListProduct } from "../components/Product/ListProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularProduct } from "../redux/slices/productSlice";

export const ProductDetail = () => {
  const dispatch = useDispatch();
  const { popularProduct } = useSelector((state) => state.products);

  useEffect(() => {
      dispatch(fetchPopularProduct());
    }, [dispatch]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-15 md:mt-0">
        <div className="md:col-span-2">
          <ProductDetailImage />
        </div>
        <div className="md:col-span-1">
          <ProductDetailInfo />
        </div>
      </div>

      <ProductDescription />
      <SellerProfile />
      <ListProduct title={"Related Product"} productList={popularProduct}/>
      <AsSeenOn />
    </>
  );
};
