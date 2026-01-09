import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  isAuthenticated: false,
  user: null,
};

try {
  const raw = localStorage.getItem('auth');
  if (raw) {
    const parsed = JSON.parse(raw);
    initialState = {
      isAuthenticated: !!parsed.isAuthenticated,
      user: parsed.user ?? null,
    };
  }
} catch (e) {
    console.log('Failed to load auth from localStorage', e);
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      try {
        localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user: action.payload }));
      } catch (e) {
         console.log('Failed to load auth from localStorage', e);
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      try {
        localStorage.removeItem('auth');
      } catch (e) {  console.log('Failed to load auth from localStorage', e);}
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      try {
        if (action.payload) localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user: action.payload }));
        else localStorage.removeItem('auth');
      } catch (e) {  console.log('Failed to load auth from localStorage', e);}
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;


