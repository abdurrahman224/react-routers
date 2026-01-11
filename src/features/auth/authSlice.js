import { createSlice } from '@reduxjs/toolkit';

const AUTH_KEY = 'auth';
const loadAuthFromStorage = () => {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return { isAuthenticated: false, user: null };

    const parsed = JSON.parse(raw);
    return {
      isAuthenticated: !!parsed.isAuthenticated,
      user: parsed.user ?? null,
    };
  } catch (error) {
    console.error('Failed to load auth from localStorage', error);
    return { isAuthenticated: false, user: null };
  }
};
const saveAuthToStorage = (authState) => {
  try {
    if (authState.user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  } catch (error) {
    console.error('Failed to save auth to localStorage', error);
  }
};

const initialState = loadAuthFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      saveAuthToStorage({ isAuthenticated: true, user: action.payload });
    },

    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      saveAuthToStorage({ isAuthenticated: false, user: null });
    },

    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      saveAuthToStorage({
        isAuthenticated: !!action.payload,
        user: action.payload,
      });
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;






// import { createSlice } from '@reduxjs/toolkit';

// let initialState = {
//   isAuthenticated: false,
//   user: null,
// };

// try {
//   const raw = localStorage.getItem('auth');
//   if (raw) {
//     const parsed = JSON.parse(raw);
//     initialState = {
//       isAuthenticated: !!parsed.isAuthenticated,
//       user: parsed.user ?? null,
//     };
//   }
// } catch (e) {
//     console.log('Failed to load auth from localStorage', e);
// }

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login(state, action) {
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       try {
//         localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user: action.payload }));
//       } catch (e) {
//          console.log('Failed to load auth from localStorage', e);
//       }
//     },
//     logout(state) {
//       state.isAuthenticated = false;
//       state.user = null;
//       try {
//         localStorage.removeItem('auth');
//       } catch (e) {  console.log('Failed to load auth from localStorage', e);}
//     },
//     setUser(state, action) {
//       state.user = action.payload;
//       state.isAuthenticated = !!action.payload;
//       try {
//         if (action.payload) localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user: action.payload }));
//         else localStorage.removeItem('auth');
//       } catch (e) {  console.log('Failed to load auth from localStorage', e);}
//     },
//   },
// });

// export const { login, logout, setUser } = authSlice.actions;
// export const selectAuth = (state) => state.auth;
// export default authSlice.reducer;


