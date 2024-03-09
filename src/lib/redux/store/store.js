const { configureStore } = require("@reduxjs/toolkit");
import authReducer from "../features/authorizationSlice";
import userReducer from "../features/userSlice";


const store = configureStore({
    reducer: {
        loggedInUser: userReducer,
        accessPermission: authReducer
    }
});

export default store;