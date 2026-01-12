import { createSlice } from '@reduxjs/toolkit';

const CART_KEY = 'cart';

const loadCartFromStorage = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return { items: [], drawerOpen: false, lastAdded: null };
    const parsed = JSON.parse(raw);
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      drawerOpen: !!parsed.drawerOpen,
      lastAdded: parsed.lastAdded ?? null,
    };
  } catch (e) {
    console.error('Failed to load cart from localStorage', e);
    return { items: [], drawerOpen: false, lastAdded: null };
  }
};

const saveCartToStorage = (state) => {
  try {
    const toSave = { items: state.items, drawerOpen: state.drawerOpen, lastAdded: state.lastAdded };
    localStorage.setItem(CART_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const it = action.payload;
      const key = `${it.category || ''}::${it.id}`;
      const existing = state.items.find((x) => `${x.category || ''}::${x.id}` === key);
      if (existing) {
        existing.qty = (existing.qty || 1) + (it.qty || 1);
      } else {
        state.items.push({ ...it, qty: it.qty || 1 });
      }
      state.lastAdded = { ...it, qty: it.qty || 1 };
      saveCartToStorage(state);
    },

    removeItem(state, action) {
      const { id, category } = action.payload;
      state.items = state.items.filter((x) => !(x.id === id && x.category === category));
      saveCartToStorage(state);
    },

    setQty(state, action) {
      const { id, category, qty } = action.payload;
      const key = `${category || ''}::${id}`;
      const existing = state.items.find((x) => `${x.category || ''}::${x.id}` === key);
      if (existing) existing.qty = qty;
      saveCartToStorage(state);
    },

    clearCart(state) {
      state.items = [];
      saveCartToStorage(state);
    },

    openDrawer(state) {
      state.drawerOpen = true;
      saveCartToStorage(state);
    },
    closeDrawer(state) {
      state.drawerOpen = false;
      saveCartToStorage(state);
    },
  },
});

export const { addItem, removeItem, setQty, clearCart, openDrawer, closeDrawer } = cartSlice.actions;
export const selectCart = (s) => s.cart;
export default cartSlice.reducer;
