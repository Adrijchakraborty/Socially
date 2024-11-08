import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInformation:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state,action) => {
      state.userInformation = action.payload;
    },
    removeUser: (state) => {
      state.userInformation = null;
    }
  },
})

export const { addUser,removeUser } = userSlice.actions

export default userSlice.reducer