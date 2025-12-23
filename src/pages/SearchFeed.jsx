import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchById } from "../redux/searchSlice";
import timeSince from "../utils/date";
import { SearchResultSkeleton } from "../components/SkeletonLoader";
import { FiSearch, FiFilter } from "react-icons/fi";

function SearchFeed() {
  const { id } = useParams();
  const { searchResults, isLoading } = useSelector((state) => state.search);
  const { sidebarExtend } = useSelector((state) => state.category);
  const { darkMode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const pageRoute = useNavigate();
  const aDay = 24 * 60 * 60 * 1000;

  useEffect(() => {
    dispatch(searchById(`search?part=snippet&q=${id}`));
    document.title = `${id} - YouTube`;
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  // Filter only videos
  const videos = searchResults?.filter((e) => e.id?.videoId) || [];

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
          {/* Search Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className={`text-xl font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                Search results for "{id}"
              </h1>
              {!isLoading && (
                <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {videos.length} results
                </p>
              )}
            </div>
            
            {/* Filter Button */}
            <button
              className={`btn btn-secondary flex items-center gap-2 ${
                darkMode ? "bg-dark-tertiary hover:bg-dark-hover text-white" : ""
              }`}
            >
              <FiFilter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
            {["All", "Videos", "Channels", "Playlists", "This week", "This month"].map((chip, index) => (
              <button
                key={chip}
                className={`chip whitespace-nowrap ${index === 0 ? "active" : ""} ${
                  darkMode ? "bg-dark-tertiary hover:bg-dark-hover" : ""
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SearchResultSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && videos.length === 0 && (
            <div className="empty-state py-16">
              <FiSearch className={`w-20 h-20 ${darkMode ? "text-gray-600" : "text-gray-300"}`} />
              <h3 className={`text-xl font-semibold mt-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                No results found
              </h3>
              <p className={`mt-2 max-w-md ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Try different keywords or remove search filters
              </p>
            </div>
          )}

          {/* Search Results */}
          {!isLoading && videos.length > 0 && (
            <div className="flex flex-col gap-4">
              {videos.map((video, index) => (
                <div
                  key={video.id?.videoId || index}
                  className={`flex flex-col sm:flex-row gap-4 p-3 rounded-xl cursor-pointer transition-colors animate-fade-in ${
                    darkMode ? "hover:bg-dark-tertiary" : "hover:bg-gray-100"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Thumbnail */}
                  <div
                    className="relative sm:w-64 md:w-80 flex-shrink-0 aspect-video rounded-xl overflow-hidden"
                    onClick={() => pageRoute(`/watch/${video.id?.videoId}`)}
                  >
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      src={video.snippet?.thumbnails?.medium?.url}
                      alt={video.snippet?.title}
                      loading="lazy"
                    />
                    {/* Duration Badge */}
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-xs rounded">
                      {/* Duration would go here */}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 py-1">
                    {/* Title */}
                    <h3
                      onClick={() => pageRoute(`/watch/${video.id?.videoId}`)}
                      className={`text-lg font-medium leading-snug line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {video.snippet?.title}
                  </h3>

                    {/* Meta Info */}
                    <div className={`flex items-center gap-2 mt-2 text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                      <span>{timeSince(new Date(Date.parse(video.snippet?.publishedAt) - aDay))}</span>
                    </div>

                    {/* Channel */}
                    <div
                      className="flex items-center gap-2 mt-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        pageRoute(`/channel/${video.snippet?.channelId}`);
                      }}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white ${
                        darkMode ? "bg-purple-600" : "bg-red-500"
                      }`}>
                        {video.snippet?.channelTitle?.[0]?.toUpperCase()}
                      </div>
                      <span className={`text-sm hover:text-gray-900 dark:hover:text-white transition-colors ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}>
                        {video.snippet?.channelTitle}
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      onClick={() => pageRoute(`/watch/${video.id?.videoId}`)}
                      className={`mt-2 text-sm line-clamp-2 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {video.snippet?.description?.slice(0, 150)}
                      {video.snippet?.description?.length > 150 && "..."}
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

export default SearchFeed;
