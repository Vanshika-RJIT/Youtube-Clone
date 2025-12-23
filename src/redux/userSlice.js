import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const loadFromStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const initialState = {
  watchLater: loadFromStorage("yt_watchLater", []),
  likedVideos: loadFromStorage("yt_likedVideos", []),
  watchHistory: loadFromStorage("yt_watchHistory", []),
  subscriptions: loadFromStorage("yt_subscriptions", []),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Watch Later
    addToWatchLater: (state, { payload }) => {
      const exists = state.watchLater.find((v) => v.videoId === payload.videoId);
      if (!exists) {
        state.watchLater.unshift(payload);
        localStorage.setItem("yt_watchLater", JSON.stringify(state.watchLater));
      }
    },
    removeFromWatchLater: (state, { payload }) => {
      state.watchLater = state.watchLater.filter((v) => v.videoId !== payload);
      localStorage.setItem("yt_watchLater", JSON.stringify(state.watchLater));
    },

    // Liked Videos
    toggleLikeVideo: (state, { payload }) => {
      const index = state.likedVideos.findIndex((v) => v.videoId === payload.videoId);
      if (index === -1) {
        state.likedVideos.unshift(payload);
      } else {
        state.likedVideos.splice(index, 1);
      }
      localStorage.setItem("yt_likedVideos", JSON.stringify(state.likedVideos));
    },

    // Watch History
    addToHistory: (state, { payload }) => {
      // Remove if already exists (to move to top)
      state.watchHistory = state.watchHistory.filter((v) => v.videoId !== payload.videoId);
      // Add to beginning
      state.watchHistory.unshift({ ...payload, watchedAt: new Date().toISOString() });
      // Keep only last 100 videos
      state.watchHistory = state.watchHistory.slice(0, 100);
      localStorage.setItem("yt_watchHistory", JSON.stringify(state.watchHistory));
    },
    clearHistory: (state) => {
      state.watchHistory = [];
      localStorage.setItem("yt_watchHistory", JSON.stringify(state.watchHistory));
    },
    removeFromHistory: (state, { payload }) => {
      state.watchHistory = state.watchHistory.filter((v) => v.videoId !== payload);
      localStorage.setItem("yt_watchHistory", JSON.stringify(state.watchHistory));
    },

    // Subscriptions
    toggleSubscription: (state, { payload }) => {
      const index = state.subscriptions.findIndex((c) => c.channelId === payload.channelId);
      if (index === -1) {
        state.subscriptions.push(payload);
      } else {
        state.subscriptions.splice(index, 1);
      }
      localStorage.setItem("yt_subscriptions", JSON.stringify(state.subscriptions));
    },
  },
});

export const {
  addToWatchLater,
  removeFromWatchLater,
  toggleLikeVideo,
  addToHistory,
  clearHistory,
  removeFromHistory,
  toggleSubscription,
} = userSlice.actions;

export default userSlice.reducer;






