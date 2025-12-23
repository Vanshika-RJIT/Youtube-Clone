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
import { useSelector } from "react-redux";

function App() {
  const { darkMode } = useSelector((state) => state.darkMode);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case '/':
          e.preventDefault();
          const searchInput = document.querySelector('input[type="text"]');
          if (searchInput) searchInput.focus();
          break;
        case 't':
          if (!e.ctrlKey && !e.metaKey) {
            document.body.setAttribute('data-theme', 
              document.body.getAttribute('data-theme') === 'dark' ? '' : 'dark'
            );
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
