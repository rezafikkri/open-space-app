/**
 * @TODO: Create Redux store
 */

import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";
import usersReducer from "./users/reducer";
import talksReducer from "./talks/reducer";
import talkDetailRecuer from "./talkDetail/reducer";
import { loadingBarReducer } from "react-redux-loading-bar";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    talks: talksReducer,
    talkDetail: talkDetailRecuer,
    loadingBar: loadingBarReducer
  }
});

export default store;
