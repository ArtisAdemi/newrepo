import {createSlice} from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit";

// Define the loadFromLocalStorage function before using it
const loadFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : undefined;
};

// Now define the initialState using the function
const initialState = {
    isCartOpen: false,
    cart: loadFromLocalStorage() || [],
    wishlist: 0,
    items: [],
};

const saveToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const localStorageMiddleware = store => next => action => {
    const result = next(action);
    saveToLocalStorage(store.getState().cart.cart); // Ensure correct path to cart state
    return result;
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        resetCart: (state) => {
            state.cart = [];
            state.items = [];
        },

        setItems: (state, action) => {
            state.items = action.payload;
        },

        addToCart: (state, action) => {
            const { product } = action.payload;
            const existingProduct = state.cart.find((item) => item.id === product.id);

            if (existingProduct) {
                existingProduct.count++;
            } else {
                state.cart = [...state.cart, { ...product, count: 1 }];
            }
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },

        increaseCount: (state, action) => {
            const { id } = action.payload;
            const product = state.cart.find((item) => item.id === id);
            if (product) {
                product.count++;
            }
        },

        decreaseCount: (state, action) => {
            const { id } = action.payload;
            const product = state.cart.find((item) => item.id === id);
            if (product && product.count > 1) {
                product.count--;
            }
        },

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },

        addToWishlist: (state, action) => {
            state.wishlist += 1;
        },
        
        removeFromWishlist: (state, action) => {
            state.wishlist -= 1;
        },
        setWishlistLength: (state, action) => {
            state.wishlist = action.payload
        },
    }
})

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
});

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
    resetCart,
    addToWishlist,
    removeFromWishlist,
    setWishlistLength
} = cartSlice.actions;

export default cartSlice.reducer;