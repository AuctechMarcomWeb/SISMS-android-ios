// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userId: null,
  user: null, //  user data store here
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { token, userId, user } = action.payload;
      state.token = token;
      state.userId = userId;
      state.user = user; //  Save full user data after login
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setUser(state, action) {
      //  for profile update
      state.user = action.payload;
    },
    logout(state) {
      state.token = null;
      state.userId = null;
      state.user = null;
    },
  },
});

export const { login, setToken, setUserId, setUser, logout } =
  authSlice.actions;
export default authSlice.reducer;
