import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserState } from '../models/User';
import { userService } from '../services/userService';

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    return await userService.getUsers();
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id: number) => {
    return await userService.getUserById(id);
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar usuarios';
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar usuario';
      });
  }
});

export const { setSelectedUser, clearError } = userSlice.actions;
export default userSlice.reducer; 