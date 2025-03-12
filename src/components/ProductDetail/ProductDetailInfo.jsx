import { useEffect, useState } from "react";
import { TbInfoHexagon } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { BsTicketPerforated } from "react-icons/bs";
import { FaCheckCircle, FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToWishlistAsync } from "../../redux/slices/wishListSlice";

export const ProductDetailInfo = ({
  product,
  variants,
  attributes,
  onAttributesChange,
  selectedAttributes,
  selectedVariant,
}) => {
  // console.log(product)
  const [liked, setLiked] = useState(product?.wishlist || false);

  useEffect(() => {
    setLiked(product?.wishlist || false);
  }, [product]);
  const dispatch = useDispatch();
  // const cartLoading = useSelector((state) => state.cart.loading);

  const handleAddToWishList = async (productId) => {
    dispatch(addToWishlistAsync({ productId, status: !liked }))
      .unwrap()
      .then(() => {
        setLiked(!liked);
        toast.success(!liked ? "Added to Wishlist!" : "Removed from Wishlist!");
      })
      .catch((err) => {
        console.error("Add To Wish List Failed: ", err);
        toast.error(err);
      });
  };

  // Xử lý chọn/bỏ chọn thuộc tính
  const handleAttributeSelect = (type, value) => {
    const newSelectedAttributes = { ...selectedAttributes };
    if (newSelectedAttributes[type] === value) {
      delete newSelectedAttributes[type]; // Bỏ chọn nếu đã chọn
    } else {
      newSelectedAttributes[type] = value; // Chọn giá trị mới
    }
    onAttributesChange(newSelectedAttributes);
  };

  // Tính toán các giá trị tương thích cho một thuộc tính
  const getCompatibleValues = (type) => {
    const otherSelected = { ...selectedAttributes };
    delete otherSelected[type]; // Loại bỏ thuộc tính hiện tại để kiểm tra

    const compatibleVariants = variants.filter((v) =>
      Object.entries(otherSelected).every(([t, val]) =>
        v.attributes.some((attr) => attr.type === t && attr.value === val)
      )
    );

    const compatibleValues = new Set(
      compatibleVariants.flatMap((v) =>
        v.attributes
          .filter((attr) => attr.type === type)
          .map((attr) => attr.value)
      )
    );

    return compatibleValues;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="pt-4">
        <div className="flex justify-between text-2xl font-semibold text-[#444143]">
          <h2>{product?.name}</h2>
          {selectedVariant && (
            <h2 className="flex items-center gap-5">
              <div className="flex items-center gap-1 relative">
                <span className="block text-3xl text-red-500">
                  $
                  {selectedVariant.salePrice?.toFixed(2) ||
                    selectedVariant.price.toFixed(2)}
                </span>
                {selectedVariant.salePrice && (
                  <>
                    <BsTicketPerforated className="text-red-500" />
                    <FaCheckCircle className="text-sm text-red-500 absolute right-[-5%] bottom-[10%] bg-white" />
                  </>
                )}
              </div>
              {selectedVariant.salePrice && (
                <span className="block line-through text-xl text-[#7b7779]">
                  ${selectedVariant.price.toFixed(2)}
                </span>
              )}
            </h2>
          )}
        </div>
        <h2 className="text-[#ada9ab] text-2xl font-semibold">
          {product?.brand_name}
        </h2>
      </div>

      {/* Hiển thị các thuộc tính */}
      {attributes.map((attribute) => (
        <div key={attribute.type} className="w-full">
          <h4 className="text-lg font-semibold text-[#444143] mb-2">
            {attribute.type}
          </h4>
          <ul className="flex flex-wrap gap-5">
            {attribute.values.map((value, index) => {
              const isSelected = selectedAttributes[attribute.type] === value;
              const compatibleValues = getCompatibleValues(attribute.type);
              const isCompatible = compatibleValues.has(value);

              return (
                <li
                  key={index}
                  className={`py-2 px-5 border-2 ${
                    isSelected
                      ? "border-pink-500"
                      : isCompatible
                      ? "border-[#ada9ab] hover:border-pink-500"
                      : "border-gray-300 cursor-not-allowed opacity-50"
                  } overflow-hidden rounded-xl cursor-pointer`}
                  onClick={() =>
                    isCompatible && handleAttributeSelect(attribute.type, value)
                  }
                >
                  <span>{value}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {selectedVariant && (
        <div className="w-full">
          <span className="flex items-center pt-2 gap-2 text-[#7f7c7d]">
            <TbInfoHexagon /> {selectedVariant.stock || 0} items left!
          </span>
        </div>
      )}
      <div className="w-full px-2 py-3 bg-[#eeebed] text-[#454244] font-semibold rounded-md">
        <h4>{product?.name} Specifications</h4>
      </div>
      <div className="w-full">
        <span className="block mb-2">Delivery on March 5th-11th</span>
        <div className="flex gap-2">
          <button className="w-4/9 bg-[#2e2b2d] text-[#c2c0c1] py-3 rounded-md text-xl cursor-pointer hover:bg-[#3f3b3e]">
            Buy now
          </button>
          <button className="w-4/9 bg-[#2e2b2d] text-[#c2c0c1] py-3 rounded-md text-xl cursor-pointer hover:bg-[#3f3b3e]">
            Add to cart
          </button>
          <button
            className="flex justify-center items-center w-1/9 border border-[#605d5e] py-3 rounded-md text-2xl cursor-pointer hover:border-pink-400 hover:text-pink-400"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToWishList(product?._id);
            }}
          >
            {liked ? (
              <FaHeart className="text-red-500 text-xl transition" />
            ) : (
              <FaRegHeart className="text-gray-500 text-xl transition" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
