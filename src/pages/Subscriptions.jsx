import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiBell, FiUser } from "react-icons/fi";
import { toggleSubscription } from "../redux/userSlice";

function Subscriptions() {
  const { darkMode } = useSelector((state) => state.darkMode);
  const { sidebarExtend } = useSelector((state) => state.category);
  const { subscriptions } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUnsubscribe = (channel) => {
    dispatch(toggleSubscription(channel));
  };

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
            Subscriptions
          </h1>

          {/* Empty State */}
          {subscriptions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                darkMode ? "bg-white/10" : "bg-gray-100"
              }`}>
                <FiBell className={`w-10 h-10 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
              </div>
              <h3 className={`text-lg font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                No subscriptions yet
              </h3>
              <p className={`text-sm text-center max-w-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Subscribe to channels to see their latest videos here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {subscriptions.map((channel, index) => (
                <div
                  key={channel.channelId || index}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                    darkMode ? "bg-white/5 hover:bg-white/10" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {/* Channel Avatar */}
                  <div
                    onClick={() => navigate(`/channel/${channel.channelId}`)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white cursor-pointer ${
                      darkMode ? "bg-purple-600" : "bg-red-500"
                    }`}
                  >
                    {channel.channelTitle?.[0]?.toUpperCase() || <FiUser />}
                  </div>

                  {/* Channel Info */}
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => navigate(`/channel/${channel.channelId}`)}
                  >
                    <h3 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {channel.channelTitle}
                    </h3>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Click to view channel
                    </p>
                  </div>

                  {/* Unsubscribe Button */}
                  <button
                    onClick={() => handleUnsubscribe(channel)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      darkMode
                        ? "bg-white/10 text-white hover:bg-red-500/20 hover:text-red-400"
                        : "bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-600"
                    }`}
                  >
                    Subscribed
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Subscriptions;






