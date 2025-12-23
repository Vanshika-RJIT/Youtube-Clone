import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./redux/categorySlice";
import channelSlice from "./redux/channelSlice";
import searchSlice from "./redux/searchSlice";
import videoSlice from "./redux/videoSlice";
import darkModeSlice from "./redux/darkModeSlice";
import userSlice from "./redux/userSlice";
import miniPlayerSlice from "./redux/miniPlayerSlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    channel: channelSlice,
    video: videoSlice,
    search: searchSlice,
    darkMode: darkModeSlice,
    user: userSlice,
    miniPlayer: miniPlayerSlice,
  },
});

export default store;
