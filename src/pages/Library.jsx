import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  FiClock, FiThumbsUp, FiList, FiTrash2, FiPlay, FiX 
} from "react-icons/fi";
import { 
  removeFromWatchLater, 
  removeFromHistory, 
  clearHistory,
  toggleLikeVideo 
} from "../redux/userSlice";
import timeSince from "../utils/date";

function VideoItem({ video, type, onRemove, darkMode }) {
  const pageRoute = useNavigate();

  return (
    <div className={`flex gap-4 p-3 rounded-xl group transition-colors ${
      darkMode ? "hover:bg-white/5" : "hover:bg-gray-100"
    }`}>
      {/* Thumbnail */}
      <div 
        className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer"
        onClick={() => pageRoute(`/watch/${video.videoId}`)}
      >
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <FiPlay className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 
          onClick={() => pageRoute(`/watch/${video.videoId}`)}
          className={`text-sm font-medium line-clamp-2 cursor-pointer hover:text-blue-500 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {video.title}
        </h3>
        <p 
          onClick={() => pageRoute(`/channel/${video.channelId}`)}
          className={`text-xs mt-1 cursor-pointer hover:text-blue-500 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {video.channel}
        </p>
        {video.watchedAt && (
          <p className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
            Watched {timeSince(new Date(video.watchedAt))}
          </p>
        )}
      </div>

      {/* Remove Button */}
      <button 
        onClick={() => onRemove(video.videoId)}
        className={`self-center p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
          darkMode ? "hover:bg-white/10" : "hover:bg-gray-200"
        }`}
        title="Remove"
      >
        <FiX className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
      </button>
    </div>
  );
}

function Library() {
  const { darkMode } = useSelector((state) => state.darkMode);
  const { sidebarExtend } = useSelector((state) => state.category);
  const { watchLater, likedVideos, watchHistory } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("history");

  const tabs = [
    { id: "history", label: "History", icon: <FiClock />, count: watchHistory.length },
    { id: "watchLater", label: "Watch Later", icon: <FiList />, count: watchLater.length },
    { id: "liked", label: "Liked Videos", icon: <FiThumbsUp />, count: likedVideos.length },
  ];

  const handleRemove = (videoId) => {
    switch (activeTab) {
      case "history":
        dispatch(removeFromHistory(videoId));
        break;
      case "watchLater":
        dispatch(removeFromWatchLater(videoId));
        break;
      case "liked":
        dispatch(toggleLikeVideo({ videoId }));
        break;
      default:
        break;
    }
  };

  const getCurrentList = () => {
    switch (activeTab) {
      case "history":
        return watchHistory;
      case "watchLater":
        return watchLater;
      case "liked":
        return likedVideos;
      default:
        return [];
    }
  };

  const currentList = getCurrentList();

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarExtend && <div className="sm:hidden overlayEffect" />}

      {/* Main Content */}
      <main
        className={`pt-20 pb-20 sm:pb-8 px-4 sm:px-6 transition-all duration-300 ${
          sidebarExtend ? "sm:ml-60" : "sm:ml-[72px]"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h1 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Library
          </h1>

          {/* Tabs */}
          <div className={`flex gap-2 mb-6 border-b pb-2 overflow-x-auto ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? darkMode 
                      ? "bg-white text-black" 
                      : "bg-gray-900 text-white"
                    : darkMode
                      ? "bg-white/10 text-white hover:bg-white/20"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.icon}
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id
                    ? darkMode ? "bg-gray-200 text-black" : "bg-gray-700 text-white"
                    : darkMode ? "bg-white/20" : "bg-gray-200"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Clear History Button */}
          {activeTab === "history" && watchHistory.length > 0 && (
            <button
              onClick={() => dispatch(clearHistory())}
              className={`flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm font-medium ${
                darkMode 
                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
                  : "bg-red-100 text-red-600 hover:bg-red-200"
              }`}
            >
              <FiTrash2 className="w-4 h-4" />
              Clear all watch history
            </button>
          )}

          {/* Content */}
          {currentList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                darkMode ? "bg-white/10" : "bg-gray-100"
              }`}>
                {activeTab === "history" && <FiClock className={`w-10 h-10 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />}
                {activeTab === "watchLater" && <FiList className={`w-10 h-10 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />}
                {activeTab === "liked" && <FiThumbsUp className={`w-10 h-10 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />}
              </div>
              <h3 className={`text-lg font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {activeTab === "history" && "No watch history"}
                {activeTab === "watchLater" && "No videos in Watch Later"}
                {activeTab === "liked" && "No liked videos"}
              </h3>
              <p className={`text-sm text-center max-w-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {activeTab === "history" && "Videos you watch will appear here."}
                {activeTab === "watchLater" && "Save videos to watch later by clicking the clock icon."}
                {activeTab === "liked" && "Videos you like will appear here."}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {currentList.map((video, index) => (
                <VideoItem
                  key={video.videoId || index}
                  video={video}
                  type={activeTab}
                  onRemove={handleRemove}
                  darkMode={darkMode}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Library;

