import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiMoreVertical, FiClock, FiList, FiCheck, FiShare2, FiFlag } from "react-icons/fi";
import { addToWatchLater, removeFromWatchLater } from "../redux/userSlice";

function VideoCard({
  videoId,
  thumbnail,
  title,
  channel,
  channelId,
  on,
  views,
  duration,
  width,
  display,
  rightWidth,
  channelAvatar,
}) {
  const pageRoute = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.darkMode);
  const { watchLater } = useSelector((state) => state.user);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const previewTimeoutRef = useRef(null);

  const isInWatchLater = watchLater.some(v => v.videoId === videoId);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Show video preview after 1 second hover
    previewTimeoutRef.current = setTimeout(() => {
      setShowPreview(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowPreview(false);
    setShowMenu(false);
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
    }
  };

  const handleWatchLater = (e) => {
    e.stopPropagation();
    if (isInWatchLater) {
      dispatch(removeFromWatchLater(videoId));
    } else {
      dispatch(addToWatchLater({
        videoId,
        title,
        thumbnail,
        channel,
        channelId,
      }));
    }
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const menuItems = [
    { icon: <FiClock />, label: isInWatchLater ? "Remove from Watch Later" : "Save to Watch Later", action: handleWatchLater },
    { icon: <FiList />, label: "Add to queue", action: () => {} },
    { icon: <FiShare2 />, label: "Share", action: () => {} },
    { icon: <FiFlag />, label: "Not interested", action: () => {} },
  ];

  return (
    <div
      style={{ width: width, display: display }}
      className="video-card cursor-pointer group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail Container */}
      <div 
        className="thumbnail-container relative aspect-video rounded-xl overflow-hidden bg-gray-200 dark:bg-dark-tertiary"
        onClick={() => pageRoute(`/watch/${videoId}`)}
      >
        {/* Skeleton while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton" />
        )}
        
        {/* Thumbnail Image */}
        <img
          className={`thumbnail w-full h-full object-cover transition-all duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } ${isHovered ? "scale-105" : "scale-100"}`}
          src={thumbnail}
          alt={title}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Video Preview on Hover (YouTube-like) */}
        {showPreview && videoId && (
          <div className="absolute inset-0 z-10">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              frameBorder="0"
            />
          </div>
        )}

        {/* Duration Badge */}
        {duration && !showPreview && (
          <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-xs font-medium rounded">
            {duration}
          </span>
        )}

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-end p-2 gap-2 transition-opacity duration-200 ${
            isHovered && !showPreview ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isInWatchLater 
                ? "bg-blue-500 hover:bg-blue-600" 
                : "bg-black/50 hover:bg-black/70"
            }`}
            onClick={handleWatchLater}
            title={isInWatchLater ? "Remove from Watch Later" : "Watch later"}
          >
            {isInWatchLater 
              ? <FiCheck className="w-4 h-4 text-white" />
              : <FiClock className="w-4 h-4 text-white" />
            }
          </button>
          <button
            className="p-2 bg-black/50 rounded-full backdrop-blur-sm hover:bg-black/70 transition-all"
            onClick={(e) => {
              e.stopPropagation();
            }}
            title="Add to queue"
          >
            <FiList className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Progress Bar (if watching) */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600/50">
          <div className="h-full bg-red-600 w-1/3" />
        </div> */}
      </div>

      {/* Video Info */}
      <div
        style={{ width: rightWidth }}
        className="flex gap-3 mt-3"
      >
        {/* Channel Avatar */}
        {channelAvatar ? (
          <img
            src={channelAvatar}
            alt={channel}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              pageRoute(`/channel/${channelId}`);
            }}
          />
        ) : (
          <div 
            className={`w-9 h-9 rounded-full flex-shrink-0 cursor-pointer flex items-center justify-center text-sm font-bold text-white ${
              darkMode ? "bg-purple-600" : "bg-red-500"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              pageRoute(`/channel/${channelId}`);
            }}
          >
            {channel?.[0]?.toUpperCase()}
          </div>
        )}

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3
            onClick={() => pageRoute(`/watch/${videoId}`)}
            className={`text-sm font-medium leading-5 line-clamp-2 mb-1 transition-colors ${
              darkMode ? "text-white hover:text-gray-300" : "text-gray-900 hover:text-gray-700"
            }`}
          >
            {title}
          </h3>

          {/* Channel Name */}
            <p
            onClick={(e) => {
              e.stopPropagation();
              pageRoute(`/channel/${channelId}`);
            }}
            className={`text-xs font-normal transition-colors ${
              darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-900"
            }`}
            >
            {channel}
            </p>

          {/* Views & Time */}
          <div className={`flex items-center gap-1 text-xs ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            {views && (
              <>
                <span>{views} views</span>
                <span>•</span>
              </>
            )}
            <span>{on}</span>
          </div>
        </div>

        {/* More Options */}
        <div className="relative">
          <button
            className={`self-start p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all ${
              darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
            }`}
            onClick={handleMenuClick}
          >
            <FiMoreVertical className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-700"}`} />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div 
              className={`absolute right-0 top-8 w-56 py-2 rounded-xl shadow-xl z-50 animate-scale-in ${
                darkMode ? "bg-dark-secondary" : "bg-white"
              }`}
            >
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    item.action(e);
                    setShowMenu(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    darkMode 
                      ? "text-white hover:bg-white/10" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="w-5 h-5">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
