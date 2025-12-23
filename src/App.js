import {
  ChannelDetails,
  Feed,
  SearchFeed,
  Sidebar,
  VideoDetails,
} from "./pages/index";
import Library from "./pages/Library";
import Trending from "./pages/Trending";
import Subscriptions from "./pages/Subscriptions";
import MobileNav from "./components/MobileNav";
import MiniPlayer from "./components/MiniPlayer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode } from "./redux/darkModeSlice";

function App() {
  const { darkMode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case '/':
          e.preventDefault();
          const searchInput = document.querySelector('input[type="text"]');
          if (searchInput) {
            searchInput.focus();
            searchInput.select(); // Also select any existing text
          }
          break;
        case 't':
        case 'T':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            dispatch(setDarkMode()); // Toggle dark mode via Redux
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-white'}`}>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/feed/:id" element={<Feed />} />
        <Route path="/channel/:id" element={<ChannelDetails />} />
        <Route path="/search/:id" element={<SearchFeed />} />
        <Route path="/watch/:id" element={<VideoDetails />} />
          <Route path="/library" element={<Library />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
      </Routes>
        <MobileNav />
        <MiniPlayer />
      </div>
    </Router>
  );
}

export default App;
