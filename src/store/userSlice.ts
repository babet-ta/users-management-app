import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { User, UsersState } from '@/types'

const initialState: UsersState = {
  users: [],
  selectedUsers: [],
  isLoading: false,
  error: null,
  sortOrder: 'asc',
  sortBy: 'id'
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  }
);

// Simulated delete - won't actually delete
export const simulateDeleteUsers = createAsyncThunk(
  'users/simulateDeleteUsers',
  async (userIds: number[]) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return userIds;
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (user: User) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return user;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      const index = state.selectedUsers.indexOf(userId);
      if (index === -1) {
        state.selectedUsers.push(userId);
      } else {
        state.selectedUsers.splice(index, 1);
      }
    },
    selectAllUsers: (state) => {
      state.selectedUsers = state.users.map(user => user.id);
    },
    deselectAllUsers: (state) => {
      state.selectedUsers = [];
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'id' | 'name' | 'zipcode'>) => {
      state.sortBy = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(simulateDeleteUsers.fulfilled, (state, action) => {
        state.users = state.users.filter(
          user => !action.payload.includes(user.id)
        );
        state.selectedUsers = state.selectedUsers.filter(
          id => !action.payload.includes(id)
        );
      });
  }
});

export const {
  selectUser,
  selectAllUsers,
  deselectAllUsers,
  setSortOrder,
  setSortBy
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;