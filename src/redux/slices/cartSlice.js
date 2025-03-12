import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../services/API";

// Fetch token from localStorage or authentication state
const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;


export const fetchCartQuantityAsync = createAsyncThunk(
  "cart/fetchCartQuantity",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;
      if (!token) throw new Error("User not authenticated");

      const response = await axios.get(`${API_URL}cart/quantity`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status !== 200) {
        throw new Error(
          response.data.message || "Failed to fetch cart quantity"
        );
      }

      return response.data.quantityItemsCart; // API response should return total quantity
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart quantity"
      );
    }
  }
);

// Async thunk for adding item to cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async ({ variantId, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${API_URL}cart/add`,
        { variant_id: variantId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message || "Add to cart failed");
      }

      dispatch(fetchCartQuantityAsync());

      return { variantId, quantity }; // Return payload for Redux
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Store cart items
    totalQuantity: 0, // Store total count
    loading: false,
    error: null,
  },
  reducers: {
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (i) => i.variantId === action.payload
      );
      if (itemIndex !== -1) {
        state.totalQuantity -= state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
    resetCartState: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart Quantity
      .addCase(fetchCartQuantityAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartQuantityAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.totalQuantity = action.payload;
      })
      .addCase(fetchCartQuantityAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const item = state.items.find(
          (i) => i.variantId === action.payload.variantId
        );
        if (item) {
          item.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
        state.totalQuantity += action.payload.quantity;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeFromCart, clearCart, resetCartState } = cartSlice.actions;
export default cartSlice.reducer;
