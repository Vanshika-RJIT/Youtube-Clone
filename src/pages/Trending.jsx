import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategoryVideos } from "../redux/categorySlice";
import { FeedSkeleton } from "../components/SkeletonLoader";
import timeSince from "../utils/date";
import { FiTrendingUp, FiMusic, FiFilm, FiZap } from "react-icons/fi";

const tabs = [
  { id: "now", label: "Now", icon: <FiTrendingUp />, query: "trending" },
  { id: "music", label: "Music", icon: <FiMusic />, query: "trending music" },
  { id: "gaming", label: "Gaming", icon: <FiZap />, query: "trending gaming" },
  { id: "movies", label: "Movies", icon: <FiFilm />, query: "trending movies trailers" },
];

function Trending() {
  const dispatch = useDispatch();
  const pageRoute = useNavigate();
  const { categoryVideos, isLoading } = useSelector((state) => state.category);
  const { sidebarExtend } = useSelector((state) => state.category);
  const { darkMode } = useSelector((state) => state.darkMode);
  const [activeTab, setActiveTab] = useState("now");

  useEffect(() => {
    const currentTab = tabs.find(t => t.id === activeTab);
    dispatch(getCategoryVideos(`search?part=snippet&q=${currentTab?.query || "trending"}&order=viewCount`));
    document.title = "Trending - YouTube";
  }, [activeTab, dispatch]);

  const aDay = 24 * 60 * 60 * 1000;
  const videos = categoryVideos?.filter((e) => e.id?.videoId) || [];

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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
              darkMode ? "bg-red-500/20" : "bg-red-100"
            }`}>
              <FiTrendingUp className="w-7 h-7 text-red-500" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Trending
              </h1>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                See what's trending on YouTube
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className={`flex gap-2 mb-6 border-b pb-4 overflow-x-auto ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
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
              </button>
            ))}
          </div>

          {/* Loading */}
          {isLoading && <FeedSkeleton count={10} />}

          {/* Videos List */}
          {!isLoading && videos.length > 0 && (
            <div className="space-y-4">
              {videos.map((video, index) => (
                <div
                  key={video.id?.videoId || index}
                  className={`flex gap-4 p-3 rounded-xl transition-colors cursor-pointer animate-fade-in ${
                    darkMode ? "hover:bg-white/5" : "hover:bg-gray-100"
                  }`}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  {/* Rank */}
                  <div className={`w-8 flex-shrink-0 flex items-center justify-center text-2xl font-bold ${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  }`}>
                    {index + 1}
                  </div>

                  {/* Thumbnail */}
                  <div 
                    className="relative w-64 h-36 flex-shrink-0 rounded-xl overflow-hidden"
                    onClick={() => pageRoute(`/watch/${video.id?.videoId}`)}
                  >
                    <img 
                      src={video.snippet?.thumbnails?.medium?.url}
                      alt={video.snippet?.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 py-1">
                    <h3 
                      onClick={() => pageRoute(`/watch/${video.id?.videoId}`)}
                      className={`text-lg font-medium line-clamp-2 hover:text-blue-500 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {video.snippet?.title}
                    </h3>
                    <p 
                      onClick={() => pageRoute(`/channel/${video.snippet?.channelId}`)}
                      className={`text-sm mt-2 hover:text-blue-500 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {video.snippet?.channelTitle}
                    </p>
                    <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                      {timeSince(new Date(Date.parse(video.snippet?.publishedAt) - aDay))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Trending;

