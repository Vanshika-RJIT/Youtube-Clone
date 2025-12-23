import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { HiOutlineFire, HiFire } from "react-icons/hi";
import { MdOutlineVideoLibrary, MdVideoLibrary, MdOutlineSubscriptions, MdSubscriptions } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useSelector((state) => state.darkMode);

  const navItems = [
    {
      path: "/",
      label: "Home",
      icon: <AiOutlineHome className="w-6 h-6" />,
      activeIcon: <AiFillHome className="w-6 h-6" />,
    },
    {
      path: "/trending",
      label: "Trending",
      icon: <HiOutlineFire className="w-6 h-6" />,
      activeIcon: <HiFire className="w-6 h-6" />,
    },
    {
      path: "/search",
      label: "Search",
      icon: <FiSearch className="w-6 h-6" />,
      activeIcon: <FiSearch className="w-6 h-6 stroke-[2.5]" />,
      isSearch: true,
    },
    {
      path: "/subscriptions",
      label: "Subscriptions",
      icon: <MdOutlineSubscriptions className="w-6 h-6" />,
      activeIcon: <MdSubscriptions className="w-6 h-6" />,
    },
    {
      path: "/library",
      label: "Library",
      icon: <MdOutlineVideoLibrary className="w-6 h-6" />,
      activeIcon: <MdVideoLibrary className="w-6 h-6" />,
    },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (item) => {
    if (item.isSearch) {
      // Focus search input or open search modal
      const searchInput = document.querySelector('input[type="text"]');
      if (searchInput) {
        searchInput.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate(item.path);
    }
  };

  return (
    <nav 
      className={`sm:hidden fixed bottom-0 left-0 right-0 z-50 border-t safe-area-bottom ${
        darkMode 
          ? "bg-dark border-gray-800" 
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => handleNavClick(item)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                active
                  ? darkMode ? "text-white" : "text-gray-900"
                  : darkMode ? "text-gray-500" : "text-gray-500"
              }`}
            >
              {active ? item.activeIcon : item.icon}
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileNav;






