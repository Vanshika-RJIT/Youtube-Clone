import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { FiX, FiPlay, FiPause, FiMaximize2 } from "react-icons/fi";
import { closeMiniPlayer, toggleMiniPlayerPause } from "../redux/miniPlayerSlice";

function MiniPlayer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useSelector((state) => state.darkMode);
  const { isOpen, videoId, title, channel, isPaused } = useSelector((state) => state.miniPlayer);

  // Don't show mini player on the video page itself
  if (!isOpen || location.pathname.startsWith('/watch/')) return null;

  const handleExpand = () => {
    navigate(`/watch/${videoId}`);
  };

  const handleClose = () => {
    dispatch(closeMiniPlayer());
  };

  const handleTogglePlay = () => {
    dispatch(toggleMiniPlayerPause());
  };

  return (
    <div
      className={`fixed bottom-16 sm:bottom-4 right-4 z-50 w-80 rounded-lg overflow-hidden shadow-2xl animate-slide-up ${
        darkMode ? "bg-dark-secondary" : "bg-white"
      }`}
    >
      {/* Video Preview */}
      <div className="relative aspect-video bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPaused ? 0 : 1}&mute=0`}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        
        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity">
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
            <button
              onClick={handleTogglePlay}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              {isPaused ? (
                <FiPlay className="w-4 h-4 text-white" />
              ) : (
                <FiPause className="w-4 h-4 text-white" />
              )}
            </button>
            <button
              onClick={handleExpand}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <FiMaximize2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="flex items-center p-2 gap-2">
        <div className="flex-1 min-w-0" onClick={handleExpand}>
          <h4 className={`text-sm font-medium truncate cursor-pointer ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            {title}
          </h4>
          <p className={`text-xs truncate ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {channel}
          </p>
        </div>
        <button
          onClick={handleClose}
          className={`p-1.5 rounded-full transition-colors ${
            darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
          }`}
        >
          <FiX className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-600"}`} />
        </button>
      </div>
    </div>
  );
}

export default MiniPlayer;






