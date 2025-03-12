import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion"; // Import Framer Motion
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemCartAsync,
  fetchCartListAsync,
  updateItemQuantityCartAsync,
} from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

export default function Cart() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { items, totalQuantity, loading, error } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCartListAsync());
  }, [dispatch]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const screenWidth = window.innerWidth;
      if (event.clientX > screenWidth - 10) {
        setOpen(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handlUpdateCart = async (item_id, quantity) => {
    dispatch(updateItemQuantityCartAsync({ item_id, quantity }))
      .unwrap()
      .then(() => {
        toast.success("Cart updated!");
      })
      .catch((err) => {
        console.error("Update Cart Failed:", err);
        toast.error(err);
      });
  };

  const handleDeleteItemCart = async (item_id) => {
    dispatch(deleteItemCartAsync(item_id))
      .unwrap()
      .then(() => {
        toast.success("Cart deleted!");
      })
      .catch((err) => {
        console.error("Update Cart Failed:", err);
        toast.error(err);
      });
  };

  console.log(items)

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      {/* Backdrop with smooth fade-in */}
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity duration-1000" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            {/* Use Framer Motion for smoother animation */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }} // Start off-screen
              animate={{ x: open ? "0%" : "100%", opacity: open ? 1 : 0 }} // Slide in/out
              exit={{ x: "100%", opacity: 0 }} // Exit animation
              transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth easing
              className="pointer-events-auto w-screen max-w-md bg-white shadow-xl"
            >
              <DialogPanel className="flex h-full flex-col overflow-y-scroll">
                {/* Header */}
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </DialogTitle>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="ml-3 -m-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="size-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Cart Items */}
                  <div className="mt-8">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {items.map((product) => (
                        <li key={product.item_id} className="flex py-6">
                          <img
                            alt={product.name}
                            src={product.thumbnail}
                            className="size-24 rounded-md border"
                          />
                          <div className="ml-4 flex flex-1 flex-col">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.name}</a>
                              </h3>
                              <p className="ml-4">{product.originalPrice}</p>
                              <p className="ml-4">{product.sellingPrice}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.attributes
                                .map((item) => item.value)
                                .join(" ")}
                            </p>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <select
                                  value={product.quantity}
                                  onChange={(e) =>
                                    handlUpdateCart(
                                      product.item_id,
                                      Number(e.target.value)
                                    )
                                  }
                                  className="px-2 py-1 border border-gray-300 rounded-md text-gray-600"
                                >
                                  {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                      {i + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteItemCart(product.item_id);
                                }}
                                className="text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$262.00</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 text-center text-sm text-gray-500">
                    or{" "}
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </motion.div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
