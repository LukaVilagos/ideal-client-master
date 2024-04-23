import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "./setAuthToken";

const AUTH_URL = "localhost:10001/api/auth/";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    registerFail: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = "Registration was not successful!";
    },
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFail: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    userLoaded: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = {};
    },
    authError: (state, action) => {
      state.user = null;
      // state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const selectActiveUser = (state) => state.auth.user;

export const selectActiveUserLoading = (state) => state.auth.loading;

export const selectAuthError = (state) => state.auth.error;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// Action creators
export const {
  registerSuccess,
  registerFail,
  loginSuccess,
  loginFail,
  logout,
  userLoaded,
  authError,
  setToken,
  clearToken,
} = authSlice.actions;

// Thunk for user registration
export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${AUTH_URL}register`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(registerSuccess(res.data));
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      console.error(errors);
    }
    dispatch(registerFail());
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${AUTH_URL}login`, formData);

    const token = res.data;

    dispatch(loginSuccess(token));
    dispatch(loadUser());
  } catch (error) {
    console.error(error.response.data);
  }
};

export const loadUser = () => async (dispatch, getState) => {
  const { auth } = getState();
  if (localStorage.token && !auth.hasReloadedUser) {
    setAuthToken(localStorage.token);
    try {
      const res = await axios.get(`${AUTH_URL}activeUser`, {
        headers: {
          token: localStorage.token,
        },
      });
      dispatch(userLoaded(res.data));
    } catch (error) {
      dispatch(authError(error.response.data));
    }
  } else {
    dispatch(authError("No token found"));
  }
};

export default authSlice.reducer;
