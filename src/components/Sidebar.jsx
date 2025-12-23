import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import categories from "../utils/categories";
import Navbar from "./Navbar";
import { setSelectedCategory, setSidebarExtendedValue } from "../redux/categorySlice";
import logo from "../assets/ytLogo.png";
import logoDark from "../assets/ytLogo-dark.png";

function Sidebar() {
  const pageRoute = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.category);
  const [sidebarExtended, setSidebarExtended] = useState(false);
  const { darkMode } = useSelector((state) => state.darkMode);

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category.name));
    
    if (category.path) {
      // Special pages like Trending, Library
      pageRoute(category.path);
    } else if (category.name === "Home") {
      pageRoute("/");
    } else {
      pageRoute(`/feed/${category.name}`);
    }
    
    // Close sidebar on mobile after selection
    if (window.innerWidth < 640) {
      dispatch(setSidebarExtendedValue(false));
      setSidebarExtended(false);
    }
  };

  const isActive = (category) => {
    if (category.path) {
      return location.pathname === category.path;
    }
    if (category.name === "Home" && location.pathname === "/") {
      return true;
    }
    return selectedCategory === category.name && location.pathname.startsWith("/feed");
  };

  const renderCategory = (category, extended = true) => {
    if (category.type === "divider") {
      return extended ? (
        <div 
          key={category.id} 
          className={`my-3 mx-3 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`} 
        />
      ) : null;
    }

    const active = isActive(category);

    return (
      <button
        key={category.id}
        onClick={() => handleCategoryClick(category)}
        className={`flex items-center rounded-xl mx-1 my-0.5 transition-all duration-200 ${
          extended 
            ? "px-3 py-2.5 gap-6" 
            : "flex-col px-1 py-3 gap-1"
        } ${
          active
            ? darkMode 
              ? "bg-white/10" 
              : "bg-gray-100"
            : darkMode
              ? "hover:bg-white/5"
              : "hover:bg-gray-100"
        }`}
        title={!extended ? category.name : ""}
      >
        {/* Icon */}
        <span
          className={`flex items-center justify-center transition-transform duration-200 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
          style={{ fontSize: extended ? '24px' : '22px' }}
        >
          {active ? category.active : category.icon}
        </span>
        
        {/* Label */}
        <span
          className={`transition-all duration-200 ${
            extended 
              ? "text-sm font-medium" 
              : "text-[10px] font-normal text-center"
          } ${
            active ? "font-semibold" : ""
          } ${darkMode ? "text-white" : "text-gray-800"}`}
        >
          {extended ? category.name : category.name.slice(0, 6)}
        </span>
      </button>
    );
  };

  // Filter out dividers for collapsed view
  const mainCategories = categories.filter(c => c.type !== "divider");
  const collapsedCategories = mainCategories.slice(0, 5); // Show first 5 in collapsed

  return (
    <>
      <Navbar
        sidebarExtended={sidebarExtended}
        setSidebarExtended={setSidebarExtended}
      />

      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-30 hidden sm:block transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden ${
          darkMode ? "bg-dark" : "bg-white"
        } ${sidebarExtended ? "w-60" : "w-[72px]"}`}
      >
        <nav className="flex flex-col py-3 px-1">
          {sidebarExtended 
            ? categories.map((category) => renderCategory(category, true))
            : collapsedCategories.map((category) => renderCategory(category, false))
          }
        </nav>

        {/* Sidebar Footer */}
        {sidebarExtended && (
          <div className={`px-4 py-6 border-t mt-4 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
              © 2025 YouTube Clone
            </p>
            <p className={`text-xs mt-1 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
              Built by Vanshika Sikarwar ❤️
            </p>
                  </div>
        )}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`sm:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          sidebarExtended ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => {
          dispatch(setSidebarExtendedValue(false));
          setSidebarExtended(false);
        }}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`sm:hidden fixed left-0 top-0 bottom-0 z-50 w-72 transform transition-transform duration-300 ease-in-out ${
          darkMode ? "bg-dark" : "bg-white"
        } ${sidebarExtended ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Mobile Header */}
        <div className={`flex items-center gap-4 h-16 px-4 border-b ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}>
          <button
            onClick={() => {
              dispatch(setSidebarExtendedValue(false));
              setSidebarExtended(false);
            }}
            className={`p-2.5 rounded-full transition-colors ${
              darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
            }`}
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
          <Link to="/">
            <img
              className={darkMode ? "h-6" : "w-24"}
              src={darkMode ? logoDark : logo}
              alt="YouTube"
            />
          </Link>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-col py-3 px-2 overflow-y-auto">
          {categories.map((category) => {
            if (category.type === "divider") {
              return (
                <div 
                  key={category.id} 
                  className={`my-3 mx-3 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`} 
                />
              );
                    }

            const active = isActive(category);

            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`flex items-center gap-6 px-4 py-3 rounded-xl transition-colors ${
                  active
                    ? darkMode 
                      ? "bg-white/10" 
                      : "bg-gray-100"
                    : darkMode
                      ? "hover:bg-white/5"
                      : "hover:bg-gray-100"
                }`}
              >
                <span
                  className={`flex items-center justify-center ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                  style={{ fontSize: '24px' }}
                >
                  {active ? category.active : category.icon}
                </span>
                <span
                  className={`text-sm ${
                    active ? "font-semibold" : "font-medium"
                  } ${darkMode ? "text-white" : "text-gray-800"}`}
                >
                  {category.name}
                </span>
                </button>
              );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
