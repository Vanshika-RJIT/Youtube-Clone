import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  videoId: null,
  title: "",
  channel: "",
  thumbnail: "",
  isPaused: false,
};

const miniPlayerSlice = createSlice({
  name: "miniPlayer",
  initialState,
  reducers: {
    openMiniPlayer: (state, { payload }) => {
      state.isOpen = true;
      state.videoId = payload.videoId;
      state.title = payload.title;
      state.channel = payload.channel;
      state.thumbnail = payload.thumbnail;
      state.isPaused = false;
    },
    closeMiniPlayer: (state) => {
      state.isOpen = false;
      state.videoId = null;
      state.title = "";
      state.channel = "";
      state.thumbnail = "";
      state.isPaused = false;
    },
    toggleMiniPlayerPause: (state) => {
      state.isPaused = !state.isPaused;
    },
  },
});

export const { openMiniPlayer, closeMiniPlayer, toggleMiniPlayerPause } = miniPlayerSlice.actions;
export default miniPlayerSlice.reducer;






