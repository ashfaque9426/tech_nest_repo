const { createSlice } = require("@reduxjs/toolkit");

const initialUserState = {
    userData: {
        firstName: null,
        lastName: null,
        email: null,
        imgUrl: null,
        role: null,
        address: null
    },
    userLoading: false
};

const userSlice = createSlice({
    name: 'loggedInUser',
    initialState: initialUserState,
    reducers: {
        checkUser: (state) => {
            state.userData = {...state.userData};
            state.userLoading = true;
        },
        updateUserState: (state, action) => {
            state.userData.firstName = action.payload.firstName;
            state.userData.lastName = action.payload.lastName;
            state.userData.email = action.payload.email;
            state.userData.imgUrl = action.payload.imgUrl;
            state.userData.role = action.payload.role;
            state.userData.address = action.payload.address;
        },
        userStateChangeSuccessfull: (state) => {
            state.userData = {...state.userData};
            state.userLoading = false;
        },
        userStateReset: (state) => {
            state.userData = initialUserState.userData;
            state.userLoading = false;
        }
    }
});

export const { checkUser, updateUserState, userStateChangeSuccessfull, userStateReset } = userSlice.actions;

export default userSlice.reducer;