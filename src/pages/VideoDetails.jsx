import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getVideoDetails, getRelatedVideos } from "../redux/videoSlice";
import { addToHistory, toggleLikeVideo, addToWatchLater, toggleSubscription } from "../redux/userSlice";
import ReactPlayer from "react-player";
import { FiThumbsUp, FiThumbsDown, FiShare2, FiDownload, FiMoreHorizontal, FiClock, FiBell, FiCheck } from "react-icons/fi";
import timeSince from "../utils/date";
import convertToInternationalCurrencySystem from "../utils/convert";
import { VideoDetailsSkeleton, RelatedVideoSkeleton } from "../components/SkeletonLoader";
import ShareModal from "../components/ShareModal";
import Comments from "../components/Comments";

// Related Video Component
const RelatedVideo = ({ video, darkMode }) => {
  const pageRoute = useNavigate();
  const aDay = 24 * 60 * 60 * 1000;
  
  if (!video?.id?.videoId) return null;

  return (
    <div 
      className="related-video"
      onClick={() => pageRoute(`/watch/${video.id.videoId}`)}
    >
      <img
        className="thumbnail"
        src={video.snippet?.thumbnails?.medium?.url}
        alt={video.snippet?.title}
        loading="lazy"
      />
      <div className="info">
        <h4 className={`title ${darkMode ? "text-white" : "text-gray-900"}`}>
          {video.snippet?.title}
        </h4>
        <p 
          className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          onClick={(e) => {
            e.stopPropagation();
            pageRoute(`/channel/${video.snippet?.channelId}`);
          }}
        >
          {video.snippet?.channelTitle}
          </p>
        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          {timeSince(new Date(Date.parse(video.snippet?.publishedAt) - aDay))}
          </p>
      </div>
    </div>
  );
};

function VideoDetails() {
  const { sidebarExtend } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { videoDetails, relatedVideos, isLoading } = useSelector((state) => state.video);
  const { darkMode } = useSelector((state) => state.darkMode);
  const { likedVideos, watchLater, subscriptions } = useSelector((state) => state.user);
  const pageRoute = useNavigate();
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  // Check if video is liked, in watch later, or channel is subscribed
  const isLiked = likedVideos.some(v => v.videoId === id);
  const isInWatchLater = watchLater.some(v => v.videoId === id);
  const isSubscribed = subscriptions.some(c => c.channelId === videoDetails?.snippet?.channelId);

  useEffect(() => {
    dispatch(getVideoDetails(`videos?part=snippet,statistics&id=${id}`));
    dispatch(getRelatedVideos(`search?part=snippet&relatedToVideoId=${id}&type=video`));
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  // Add to watch history when video details load
  useEffect(() => {
    if (videoDetails?.snippet) {
      dispatch(addToHistory({
        videoId: id,
        title: videoDetails.snippet.title,
        thumbnail: videoDetails.snippet.thumbnails?.medium?.url,
        channel: videoDetails.snippet.channelTitle,
        channelId: videoDetails.snippet.channelId,
      }));
    }
  }, [videoDetails, id, dispatch]);

  const handleLike = () => {
    if (videoDetails?.snippet) {
      dispatch(toggleLikeVideo({
        videoId: id,
        title: videoDetails.snippet.title,
        thumbnail: videoDetails.snippet.thumbnails?.medium?.url,
        channel: videoDetails.snippet.channelTitle,
        channelId: videoDetails.snippet.channelId,
      }));
    }
  };

  const handleWatchLater = () => {
    if (videoDetails?.snippet) {
      dispatch(addToWatchLater({
        videoId: id,
        title: videoDetails.snippet.title,
        thumbnail: videoDetails.snippet.thumbnails?.medium?.url,
        channel: videoDetails.snippet.channelTitle,
        channelId: videoDetails.snippet.channelId,
      }));
    }
  };

  const handleSubscribe = () => {
    if (videoDetails?.snippet) {
      dispatch(toggleSubscription({
        channelId: videoDetails.snippet.channelId,
        channelTitle: videoDetails.snippet.channelTitle,
      }));
    }
  };

  // Filter related videos
  const filteredRelatedVideos = relatedVideos?.filter((e) => e.id?.videoId) || [];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarExtend && <div className="sm:hidden overlayEffect" />}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        videoId={id}
        title={videoDetails?.snippet?.title}
      />

      {/* Main Content */}
      <main
        className={`pt-20 pb-20 sm:pb-8 px-4 lg:px-6 transition-all duration-300 ${
          sidebarExtend ? "sm:ml-60" : "sm:ml-[72px]"
        }`}
      >
        <div className="max-w-[1800px] mx-auto lg:flex lg:gap-6">
          {/* Video Section */}
          <div className="flex-1 max-w-[1100px]">
            {/* Video Player */}
            <div className="video-player-container aspect-video w-full">
          <ReactPlayer
            width="100%"
            height="100%"
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
                playing={false}
                config={{
                  youtube: {
                    playerVars: {
                      modestbranding: 1,
                      rel: 0,
                    },
                  },
                }}
              />
            </div>

            {/* Video Info */}
            {isLoading ? (
              <div className="mt-4">
                <VideoDetailsSkeleton />
              </div>
            ) : (
              <div className="mt-4">
                {/* Tags */}
                {videoDetails?.snippet?.tags && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {videoDetails.snippet.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs text-blue-500 hover:text-blue-600 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className={`video-title ${darkMode ? "text-white" : ""}`}>
              {videoDetails?.snippet?.title}
                </h1>

                {/* Stats & Actions Row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
                  {/* Channel Info */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="cursor-pointer"
                      onClick={() => pageRoute(`/channel/${videoDetails?.snippet?.channelId}`)}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        darkMode ? "bg-purple-600" : "bg-red-500"
                      }`}>
                        {videoDetails?.snippet?.channelTitle?.[0]?.toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <h3 
                        onClick={() => pageRoute(`/channel/${videoDetails?.snippet?.channelId}`)}
                        className={`font-medium cursor-pointer hover:text-blue-500 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                {videoDetails?.snippet?.channelTitle}
                      </h3>
                      <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {convertToInternationalCurrencySystem(videoDetails?.statistics?.viewCount)} views
                      </p>
                    </div>
                    
                    {/* Subscribe Button */}
                    <button 
                      onClick={handleSubscribe}
                      className={`ml-4 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        isSubscribed
                          ? darkMode
                            ? "bg-white/10 text-white hover:bg-white/20"
                            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                    >
                      {isSubscribed ? (
                        <>
                          <FiBell className="w-4 h-4" />
                          Subscribed
                        </>
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Like/Dislike */}
                    <div className={`flex items-center rounded-full overflow-hidden ${
                      darkMode ? "bg-white/10" : "bg-gray-100"
                    }`}>
                      <button 
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                          isLiked ? "text-blue-500" : ""
                        } ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-200"}`}
                >
                        <FiThumbsUp className={`w-5 h-5 ${isLiked ? "fill-blue-500" : ""}`} />
                        <span className={`text-sm font-medium ${darkMode ? "text-white" : ""}`}>
                    {convertToInternationalCurrencySystem(
                            isLiked 
                              ? parseInt(videoDetails?.statistics?.likeCount || 0) + 1 
                              : videoDetails?.statistics?.likeCount
                          )}
                  </span>
                      </button>
                      <div className={`w-px h-6 ${darkMode ? "bg-white/20" : "bg-gray-300"}`} />
                      <button className={`px-4 py-2 ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-200"}`}>
                        <FiThumbsDown className={`w-5 h-5 ${darkMode ? "text-white" : ""}`} />
                      </button>
                    </div>

                    {/* Share */}
                    <button 
                      onClick={() => setShowShareModal(true)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                        darkMode 
                          ? "bg-white/10 hover:bg-white/20 text-white" 
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <FiShare2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>

                    {/* Watch Later */}
                    <button 
                      onClick={handleWatchLater}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                        isInWatchLater
                          ? "bg-blue-500 text-white"
                          : darkMode 
                            ? "bg-white/10 hover:bg-white/20 text-white" 
                            : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {isInWatchLater ? <FiCheck className="w-5 h-5" /> : <FiClock className="w-5 h-5" />}
                      <span className="hidden sm:inline">{isInWatchLater ? "Saved" : "Save"}</span>
                    </button>

                    {/* More */}
                    <button className={`p-2 rounded-full ${
                      darkMode 
                        ? "bg-white/10 hover:bg-white/20 text-white" 
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}>
                      <FiMoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div 
                  className={`mt-4 p-4 rounded-xl cursor-pointer ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-gray-100 hover:bg-gray-200"}`}
                  onClick={() => setShowDescription(!showDescription)}
                >
                  <div className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {convertToInternationalCurrencySystem(videoDetails?.statistics?.viewCount)} views
                    <span className="mx-2">•</span>
                    {videoDetails?.snippet?.publishedAt && 
                      new Date(videoDetails.snippet.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })
                    }
                  </div>
                  <p className={`mt-2 text-sm whitespace-pre-line ${
                    showDescription ? "" : "line-clamp-2"
                  } ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {videoDetails?.snippet?.description}
                  </p>
                  {!showDescription && videoDetails?.snippet?.description?.length > 200 && (
                    <button className={`mt-2 text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Show more
                    </button>
                  )}
                  {showDescription && (
                    <button className={`mt-2 text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Show less
                    </button>
                  )}
                </div>

                {/* Comments Section */}
                <Comments videoId={id} />
              </div>
            )}
          </div>

          {/* Related Videos Sidebar */}
          <aside className="lg:w-[400px] mt-6 lg:mt-0">
            <h2 className={`text-lg font-medium mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Related Videos
            </h2>
            
            <div className="flex flex-col gap-3">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <RelatedVideoSkeleton key={i} />
                ))
              ) : filteredRelatedVideos.length > 0 ? (
                filteredRelatedVideos.map((video, index) => (
                  <RelatedVideo
                    key={video.id?.videoId || index}
                    video={video}
                    darkMode={darkMode}
                  />
                ))
              ) : (
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  No related videos found
                </p>
              )}
        </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default VideoDetails;
