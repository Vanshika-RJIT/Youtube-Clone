import React, { useState, useEffect } from "react";
import logo from "../assets/ytLogo.png";
import logoDark from "../assets/ytLogo-dark.png";
import { Link } from "react-router-dom";
import { setSidebarExtendedValue } from "../redux/categorySlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../redux/darkModeSlice";
import { FiSearch, FiSun, FiMoon, FiMic } from "react-icons/fi";

function Navbar({ sidebarExtended, setSidebarExtended }) {
  const dispatch = useDispatch();
  const pageRoute = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { isLoading } = useSelector((state) => state.category);
  const channelLoading = useSelector((state) => state.channel.isLoading);
  const videoLoading = useSelector((state) => state.video.isLoading);
  const searchLoading = useSelector((state) => state.search.isLoading);
  const { darkMode } = useSelector((state) => state.darkMode);

  const showLoading = videoLoading || channelLoading || isLoading || searchLoading;

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.style.backgroundColor = '#0f0f0f';
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.body.style.backgroundColor = '#ffffff';
    }
  }, [darkMode]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      pageRoute(`/search/${searchValue}`);
      setSearchValue("");
    }
  };

  return (
    <>
      {/* Loading Bar */}
      {showLoading && <div className="loading-bar" />}

      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 md:px-6 transition-colors duration-300 ${darkMode ? "bg-dark" : "bg-white"
          }`}
      >
        {/* Left Section - Menu & Logo */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => {
              dispatch(setSidebarExtendedValue(!sidebarExtended));
              setSidebarExtended(!sidebarExtended);
            }}
            className={`p-2.5 rounded-full transition-colors hover:bg-opacity-10 ${darkMode ? "hover:bg-white" : "hover:bg-black"
              }`}
            aria-label="Toggle sidebar"
          >
            <svg
              className={`w-6 h-6 ${darkMode ? "text-white" : "text-gray-800"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link to="/" className="flex items-center">
            <img
              className={darkMode ? "h-6 md:h-7" : "w-24 md:w-28"}
              src={darkMode ? logoDark : logo}
              alt="YouTube"
            />
          </Link>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 flex justify-center max-w-2xl mx-2 md:mx-8">
          <form onSubmit={handleOnSubmit} className="flex items-center w-full max-w-xl">
            <div className={`flex-1 flex items-center border rounded-l-full transition-all duration-200 ${isSearchFocused
                ? "border-blue-500 shadow-inner"
                : darkMode
                  ? "border-gray-600"
                  : "border-gray-300"
              } ${darkMode ? "bg-dark-secondary" : "bg-white"}`}>
              {isSearchFocused && (
                <FiSearch className={`ml-4 w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
              )}
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search"
                className={`w-full py-2.5 px-4 bg-transparent outline-none text-base ${darkMode ? "text-white placeholder-gray-500" : "text-gray-900 placeholder-gray-500"
                  }`}
              />
            </div>
            <button
              type="submit"
              className={`px-5 md:px-6 py-2.5 border border-l-0 rounded-r-full transition-colors ${darkMode
                  ? "bg-dark-tertiary border-gray-600 hover:bg-dark-hover"
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                }`}
              aria-label="Search"
            >
              <FiSearch className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-600"}`} />
            </button>
            <button
              type="button"
              className={`ml-2 md:ml-3 p-2.5 md:p-3 rounded-full transition-colors hidden sm:flex ${darkMode
                  ? "bg-dark-tertiary hover:bg-dark-hover"
                  : "bg-gray-100 hover:bg-gray-200"
                }`}
              aria-label="Voice search"
            >
              <FiMic className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-600"}`} />
            </button>
          </form>
        </div>

        {/* Right Section - Theme Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(setDarkMode())}
            className={`p-2.5 md:p-3 rounded-full transition-all duration-300 ${darkMode
                ? "bg-dark-tertiary hover:bg-dark-hover text-yellow-400"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <FiSun className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <FiMoon className="w-5 h-5 md:w-6 md:h-6" />
            )}
          </button>
        </div>
      </header>
    </>
  );
}

export default Navbar;
