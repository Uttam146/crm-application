import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken:'',
    email:'',
    name:'',
    userId:'',
    userStatus:'',
    userType:''
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        saveLogin(state,action) {
            state.accessToken= action.payload.accessToken;
            state.email= action.payload.email;
            state.name= action.payload.name;
            state.userId= action.payload.userId;
            state.userStatus= action.payload.userStatus;
            state.userType= action.payload.userType;
        },
        
        logout(state,action){
            state.accessToken= '';
            state.email= '';
            state.name= '';
            state.userId= '';
            state.userStatus= '';
            state.userType= '';
        }
    }

})

export const { saveLogin,logout } = loginSlice.actions;
export default loginSlice.reducer;