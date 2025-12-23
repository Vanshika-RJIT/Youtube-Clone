import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiThumbsUp, FiThumbsDown, FiMoreVertical, FiChevronDown, FiChevronUp } from "react-icons/fi";

// Mock comments data
const mockComments = [
  {
    id: 1,
    author: "TechEnthusiast",
    avatar: "T",
    avatarColor: "bg-blue-500",
    text: "This is really helpful! Thanks for sharing this content. I've been looking for something like this for a while.",
    likes: 245,
    time: "2 days ago",
    replies: [
      {
        id: 11,
        author: "CodeMaster",
        avatar: "C",
        avatarColor: "bg-green-500",
        text: "Totally agree! This helped me understand the concept much better.",
        likes: 45,
        time: "1 day ago",
      },
    ],
  },
  {
    id: 2,
    author: "WebDeveloper2024",
    avatar: "W",
    avatarColor: "bg-purple-500",
    text: "Great explanation! Can you make a follow-up video on advanced topics?",
    likes: 189,
    time: "3 days ago",
    replies: [],
  },
  {
    id: 3,
    author: "LearnWithMe",
    avatar: "L",
    avatarColor: "bg-red-500",
    text: "I've watched this 3 times already. Every time I learn something new!",
    likes: 523,
    time: "1 week ago",
    replies: [
      {
        id: 31,
        author: "StudyBuddy",
        avatar: "S",
        avatarColor: "bg-yellow-500",
        text: "Same here! The quality of this content is amazing.",
        likes: 28,
        time: "5 days ago",
      },
      {
        id: 32,
        author: "DevNewbie",
        avatar: "D",
        avatarColor: "bg-pink-500",
        text: "This is exactly what I needed for my project!",
        likes: 15,
        time: "4 days ago",
      },
    ],
  },
  {
    id: 4,
    author: "CodeNinja",
    avatar: "C",
    avatarColor: "bg-indigo-500",
    text: "The best tutorial on this topic I've found on YouTube. Keep up the great work! 🔥",
    likes: 892,
    time: "2 weeks ago",
    replies: [],
  },
  {
    id: 5,
    author: "TechReviewer",
    avatar: "T",
    avatarColor: "bg-teal-500",
    text: "This channel deserves more subscribers. The content quality is consistently high.",
    likes: 156,
    time: "3 weeks ago",
    replies: [],
  },
];

function Comment({ comment, isReply = false, darkMode }) {
  const [showReplies, setShowReplies] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div className={`flex gap-3 ${isReply ? "ml-12 mt-3" : ""}`}>
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0 ${comment.avatarColor}`}>
        {comment.avatar}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
            @{comment.author}
          </span>
          <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
            {comment.time}
          </span>
        </div>

        <p className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          {comment.text}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-2">
          <button 
            onClick={() => setLiked(!liked)}
            className="flex items-center gap-1 group"
          >
            <FiThumbsUp className={`w-4 h-4 transition-colors ${
              liked 
                ? "text-blue-500 fill-blue-500" 
                : darkMode ? "text-gray-400 group-hover:text-white" : "text-gray-500 group-hover:text-gray-900"
            }`} />
            <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {liked ? comment.likes + 1 : comment.likes}
            </span>
          </button>
          <button>
            <FiThumbsDown className={`w-4 h-4 ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`} />
          </button>
          <button className={`text-xs font-medium ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}>
            Reply
          </button>
        </div>

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-2 mt-2 text-blue-500 text-sm font-medium hover:bg-blue-500/10 px-2 py-1 rounded-full -ml-2"
          >
            {showReplies ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
            {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
          </button>
        )}

        {showReplies && comment.replies?.map((reply) => (
          <Comment key={reply.id} comment={reply} isReply={true} darkMode={darkMode} />
        ))}
      </div>

      {/* More Options */}
      <button className={`self-start p-1 rounded-full opacity-0 group-hover:opacity-100 ${
        darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
      }`}>
        <FiMoreVertical className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
      </button>
    </div>
  );
}

function Comments({ videoId }) {
  const { darkMode } = useSelector((state) => state.darkMode);
  const [commentText, setCommentText] = useState("");
  const [sortBy, setSortBy] = useState("top");
  const [comments, setComments] = useState(mockComments);

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        author: "You",
        avatar: "Y",
        avatarColor: "bg-red-500",
        text: commentText,
        likes: 0,
        time: "Just now",
        replies: [],
      };
      setComments([newComment, ...comments]);
      setCommentText("");
    }
  };

  return (
    <div className={`mt-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
      {/* Header */}
      <div className="flex items-center gap-6 mb-6">
        <h3 className="text-lg font-medium">
          {comments.length} Comments
        </h3>
        <button className="flex items-center gap-2 text-sm font-medium">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
          </svg>
          Sort by
        </button>
      </div>

      {/* Add Comment */}
      <div className="flex gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-medium flex-shrink-0">
          Y
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className={`w-full pb-2 bg-transparent border-b outline-none text-sm transition-colors ${
              darkMode 
                ? "border-gray-700 focus:border-white placeholder-gray-500" 
                : "border-gray-300 focus:border-gray-900 placeholder-gray-400"
            }`}
          />
          {commentText && (
            <div className="flex justify-end gap-2 mt-2">
              <button 
                onClick={() => setCommentText("")}
                className={`px-4 py-2 text-sm font-medium rounded-full ${
                  darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>
              <button 
                onClick={handleAddComment}
                className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                Comment
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} darkMode={darkMode} />
        ))}
      </div>
    </div>
  );
}

export default Comments;






