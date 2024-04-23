import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "0",
    first_name: "John",
    last_name: "Doe",
    email: "kenaa@example.com",
    phone: "0123456789",
    address: "123 Main St",
    city: "New York",
  },
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "kenaa@example.com",
    phone: "0123456789",
  },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users.users;

export default usersSlice.reducer;
