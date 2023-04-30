import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { USER_LOGIN, USER_TOKEN, getStore } from '../../service/configURL';

const initialState = {
  userLogin: getStore(USER_LOGIN),
  userToken: getStore(USER_TOKEN)
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    // Define Action here
    loginAction: (state, actions) => {
      state.userLogin = actions.payload.userLogin;
      state.userToken = actions.payload.userToken;
    },
  },
});

export const { loginAction, getProfileAction } = userReducer.actions

export default userReducer.reducer






