const { createSlice } = require("@reduxjs/toolkit");

const initialAcessPermitState = {
    accessPermission: false
};

const authorizationSlice = createSlice({
    name: 'accessPermission',
    initialState: initialAcessPermitState,
    reducers: {
        accessGranted: (state) => {
            state.accessPermission = true;
        },
        accessDenied: (state) => {
            state.accessPermission = false;
        }
    }

});

export const { accessGranted, accessDenied } = authorizationSlice.actions;

export default authorizationSlice.reducer;