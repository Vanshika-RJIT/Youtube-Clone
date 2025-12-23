import React, { useState } from "react";
import { useSelector } from "react-redux";
import { 
  FiX, FiCopy, FiCheck,
  FiFacebook, FiTwitter, FiMail, FiMessageCircle
} from "react-icons/fi";
import { FaWhatsapp, FaReddit, FaTelegram } from "react-icons/fa";

function ShareModal({ isOpen, onClose, videoId, title }) {
  const { darkMode } = useSelector((state) => state.darkMode);
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const encodedUrl = encodeURIComponent(videoUrl);
  const encodedTitle = encodeURIComponent(title || "Check out this video!");

  const shareLinks = [
    {
      name: "Copy link",
      icon: copied ? <FiCheck /> : <FiCopy />,
      action: () => {
        navigator.clipboard.writeText(videoUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      color: "bg-gray-600",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "bg-green-500",
    },
    {
      name: "Facebook",
      icon: <FiFacebook />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-blue-600",
    },
    {
      name: "Twitter",
      icon: <FiTwitter />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "bg-sky-500",
    },
    {
      name: "Reddit",
      icon: <FaReddit />,
      url: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      color: "bg-orange-500",
    },
    {
      name: "Telegram",
      icon: <FaTelegram />,
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: "bg-blue-400",
    },
    {
      name: "Email",
      icon: <FiMail />,
      url: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      color: "bg-gray-500",
    },
  ];

  const handleShare = (link) => {
    if (link.action) {
      link.action();
    } else if (link.url) {
      window.open(link.url, "_blank", "noopener,noreferrer,width=600,height=400");
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-md rounded-xl shadow-2xl animate-scale-in ${
          darkMode ? "bg-dark-secondary" : "bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}>
          <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Share
          </h2>
          <button 
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
            }`}
          >
            <FiX className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-600"}`} />
          </button>
        </div>

        {/* Share Options */}
        <div className="p-4">
          <div className="grid grid-cols-4 gap-4">
            {shareLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleShare(link)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110 ${link.color}`}>
                  <span className="text-xl">{link.icon}</span>
                </div>
                <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {link.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* URL Copy Section */}
        <div className={`p-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className={`flex items-center gap-2 p-3 rounded-lg ${
            darkMode ? "bg-dark-tertiary" : "bg-gray-100"
          }`}>
            <input
              type="text"
              value={videoUrl}
              readOnly
              className={`flex-1 bg-transparent text-sm outline-none ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            />
            <button
              onClick={() => handleShare(shareLinks[0])}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;






