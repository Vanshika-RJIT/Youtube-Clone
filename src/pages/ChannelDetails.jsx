import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { FeedSkeleton } from "../components/SkeletonLoader";
import { getChannelVideos, getChannelDetails } from "../redux/channelSlice";
import convertToInternationalCurrencySystem from "../utils/convert";
import timeSince from "../utils/date";
import { FiBell, FiChevronDown, FiGrid, FiList } from "react-icons/fi";

function ChannelDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { sidebarExtend } = useSelector((state) => state.category);
  const { channelDetails, channelVideos, isLoading } = useSelector((state) => state.channel);
  const { darkMode } = useSelector((state) => state.darkMode);
  const [activeTab, setActiveTab] = useState("videos");
  const [viewMode, setViewMode] = useState("grid");
  const aDay = 24 * 60 * 60 * 1000;

  useEffect(() => {
    dispatch(getChannelVideos(`search?channelId=${id}&part=snippet&order=date`));
    dispatch(getChannelDetails(`channels?part=snippet,statistics,brandingSettings&id=${id}`));
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  // Filter only videos
  const videos = channelVideos?.filter((e) => e.id?.videoId) || [];

  const tabs = [
    { id: "home", label: "Home" },
    { id: "videos", label: "Videos" },
    { id: "shorts", label: "Shorts" },
    { id: "playlists", label: "Playlists" },
    { id: "community", label: "Community" },
    { id: "about", label: "About" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarExtend && <div className="sm:hidden overlayEffect" />}

      {/* Main Content */}
      <main
        className={`pt-16 pb-20 sm:pb-0 transition-all duration-300 ${
          sidebarExtend ? "sm:ml-60" : "sm:ml-[72px]"
        }`}
      >
        {/* Banner */}
        <div
          className="h-24 sm:h-32 md:h-40 lg:h-48 bg-cover bg-center"
          style={{
            background: channelDetails?.brandingSettings?.image?.bannerExternalUrl
              ? `url(${channelDetails.brandingSettings.image.bannerExternalUrl})`
              : `linear-gradient(135deg, ${darkMode ? "#1a1a2e" : "#667eea"} 0%, ${darkMode ? "#16213e" : "#764ba2"} 100%)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Channel Info Section */}
        <div className={`px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-dark" : "bg-white"}`}>
          <div className="max-w-6xl mx-auto">
            {/* Channel Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4">
              {/* Avatar */}
              <div className="relative -mt-12 sm:-mt-8">
                {channelDetails?.snippet?.thumbnails?.medium?.url ? (
                  <img
                    className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white dark:border-dark object-cover"
                    src={channelDetails.snippet.thumbnails.medium.url}
                    alt={channelDetails?.snippet?.title}
                  />
                ) : (
                  <div className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 flex items-center justify-center text-3xl font-bold text-white ${
                    darkMode ? "bg-purple-600 border-dark" : "bg-red-500 border-white"
                  }`}>
                    {channelDetails?.snippet?.title?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>

              {/* Channel Info */}
              <div className="flex-1">
                <h1 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {channelDetails?.snippet?.title}
                </h1>
                
                <div className={`flex flex-wrap items-center gap-2 mt-1 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  <span>{channelDetails?.snippet?.customUrl}</span>
                  <span>•</span>
                  <span>
                    {convertToInternationalCurrencySystem(channelDetails?.statistics?.subscriberCount)} subscribers
                  </span>
                  <span>•</span>
                  <span>
                    {convertToInternationalCurrencySystem(channelDetails?.statistics?.videoCount)} videos
                  </span>
                </div>

                {/* Description */}
                {channelDetails?.snippet?.description && (
                  <p className={`mt-2 text-sm line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {channelDetails.snippet.description.slice(0, 150)}
                    {channelDetails.snippet.description.length > 150 && "..."}
                  </p>
                )}
              </div>

              {/* Subscribe Button */}
              <div className="flex items-center gap-2">
                <button className="btn btn-primary">
                  Subscribe
                </button>
                <button className={`p-2.5 rounded-full ${
                  darkMode ? "bg-dark-tertiary hover:bg-dark-hover" : "bg-gray-100 hover:bg-gray-200"
                }`}>
                  <FiBell className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-700"}`} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b overflow-x-auto pb-0 mt-2 scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 px-1 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? `border-gray-900 dark:border-white ${darkMode ? "text-white" : "text-gray-900"}`
                      : `border-transparent ${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-900"}`
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Videos Section */}
        <div className={`px-4 sm:px-6 lg:px-8 py-6 ${darkMode ? "bg-dark" : "bg-white"}`}>
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h2 className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Videos
                </h2>
                <button className={`flex items-center gap-1 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  Latest <FiChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? darkMode ? "bg-dark-tertiary text-white" : "bg-gray-200 text-gray-900"
                      : darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? darkMode ? "bg-dark-tertiary text-white" : "bg-gray-200 text-gray-900"
                      : darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Loading */}
            {isLoading && <FeedSkeleton count={8} />}

            {/* Empty State */}
            {!isLoading && videos.length === 0 && (
              <div className="empty-state py-16">
                <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  No videos uploaded yet
                </h3>
                <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  This channel hasn't uploaded any videos.
                </p>
              </div>
            )}

            {/* Videos Grid */}
            {!isLoading && videos.length > 0 && (
              <div className={`grid gap-4 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}>
                {videos.map((video, index) => (
                  <div
                    key={video.id?.videoId || index}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <VideoCard
                      videoId={video.id.videoId}
                      thumbnail={video.snippet?.thumbnails?.medium?.url}
                      title={video.snippet?.title}
                      channel={video.snippet?.channelTitle}
                      channelId={video.snippet?.channelId}
                      on={timeSince(new Date(Date.parse(video.snippet?.publishedAt) - aDay))}
                      width={viewMode === "list" ? "320px" : undefined}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default ChannelDetails;
