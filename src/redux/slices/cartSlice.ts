import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "../../types";
import { RootState } from "../store";

// Cart Item structure
interface CartItem {
  id: string;
  title: string;
  discountedPrice: number;
  price: number;
  quantity: number;
  discount: number;
  image: string;
}

// Cart State
interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalDiscountedPrice: number; // New variable for total discounted price
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalDiscountedPrice: 0, // Initialize the new variable
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add to Cart with Discount and Image
    addToCart: (state, action: PayloadAction<TProduct>) => {
      const product = action.payload;

      // Apply discount if available
      const priceAfterDiscount =
        product.discount > 0
          ? product.price - (product.price * product.discount) / 100
          : product.price;

      // Check if the product already exists in the cart
      const existingItem = state.items.find((item) => item.id === product._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: product._id,
          title: product.title,
          price: product.price,
          discountedPrice: priceAfterDiscount,
          quantity: 1,
          discount: product.discount,
          image: product.images[0],
        });
      }

      // Update total price and total discounted price
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.totalDiscountedPrice = state.items.reduce(
        (total, item) => total + item.discountedPrice * item.quantity,
        0
      );
    },

    // Remove product
    removeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // Update total price and total discounted price
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.totalDiscountedPrice = state.items.reduce(
        (total, item) => total + item.discountedPrice * item.quantity,
        0
      );
    },

    // Clear cart
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalDiscountedPrice = 0; // Reset total discounted price
    },

    // Increase quantity
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }

      // Update total price and total discounted price
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.totalDiscountedPrice = state.items.reduce(
        (total, item) => total + item.discountedPrice * item.quantity,
        0
      );
    },

    // Decrease quantity
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      // Update total price and total discounted price
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.totalDiscountedPrice = state.items.reduce(
        (total, item) => total + item.discountedPrice * item.quantity,
        0
      );
    },
  },
});

export const {
  addToCart,
  removeProduct,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export const useCartOptions = (state: RootState) => state.cart;

export default cartSlice.reducer;
