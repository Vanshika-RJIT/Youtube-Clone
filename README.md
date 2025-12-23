# 🎥 YouTube Clone

A fully responsive YouTube clone built with React.js and Redux Toolkit, featuring real-time video search, embedded playback, channel exploration, and an interactive user experience. This application replicates YouTube's core functionality with a modern, clean UI and seamless dark mode support.

### 🎯 Key Highlights

- 🎥 **Real YouTube Integration** - Fetches live data from YouTube v3 API
- 🔥 **Complete User Experience** - Watch history, liked videos, watch later, and subscriptions
- 📤 **Multi-Platform Sharing** - Share videos across WhatsApp, Facebook, Twitter, Reddit, Telegram, Email
- ⚡ **Performance Optimized** - Skeleton loaders, lazy loading, and smooth transitions
- 📱 **Mobile-First Design** - Dedicated mobile navigation and responsive layouts
- 🎨 **Professional UI** - Polished interface with attention to detail

## 🌐 Live Demo

**🔗 [View Live Demo](https://youtube-clone-tau-peach-50.vercel.app)**

> Deployed on Vercel with automatic CI/CD from GitHub

---

## 📸 Screenshots

### 🏠 Home Page

_Browse videos by category with a clean, modern interface_

![Home Page](./screenshots/home.png)

### 🎬 Video Player

_Watch videos with embedded player, description, and related content_

![Video Player](./screenshots/video-player.png)

### 📺 Channel Page

_Explore channel details and video collections_

![Channel Details](./screenshots/channel.png)

### 🔍 Search Results

_Real-time search with relevant video results_

![Search Results](./screenshots/search.png)

### 🌙 Dark Mode

_Seamless dark theme for comfortable viewing_

![Dark Mode](./screenshots/dark-mode.png)

---

## ✨ Features

### Core Features

- 🏠 **Home Feed** - Browse videos by category (React JS, DuaLipa, Comedy, Technology, Food, Travis Scott, Cricket)
- 🔍 **Advanced Search** - Real-time search with keyword-based results using YouTube v3 API
- ▶️ **Video Player** - Embedded YouTube player with ReactPlayer for smooth playback
- 📺 **Channel Details** - View channel information, videos, and statistics
- 💬 **Interactive Comments** - Add, like, and reply to comments with expandable threads
- 📱 **Mini Player** - Picture-in-picture style player to watch while browsing
- 🔥 **Trending Page** - Discover trending content across Now, Music, Gaming, and Movies tabs

### UI/UX Features

- 🌓 **Dark/Light Mode** - Seamless theme switching with persistent state
- 📱 **Fully Responsive** - Mobile-first design with dedicated mobile bottom navigation
- 🎨 **Modern UI** - YouTube-inspired interface with smooth animations and transitions
- ⚡ **Skeleton Loaders** - Beautiful loading states for videos, feeds, and search results
- 📑 **Dynamic Category Sidebar** - Collapsible sidebar with icons for quick navigation
- 🎯 **Active States** - Visual feedback on hover, focus, and active elements
- 🖼️ **Video Card Hover Effects** - Interactive preview effects on video thumbnails

### User Experience Features

- 📚 **Library Management System**

  - ⏱️ **Watch History** - Automatically tracks all videos you watch
  - 🕐 **Watch Later** - Save videos to watch at your convenience
  - ❤️ **Liked Videos** - Keep track of videos you've liked
  - 📊 All organized in an easy-to-navigate tabbed interface

- 📤 **Advanced Share Functionality**

  - Share videos across 7+ platforms (WhatsApp, Facebook, Twitter, Reddit, Telegram, Email)
  - One-click copy link feature
  - Beautiful share modal with platform-specific icons
  - Share directly from video cards or video player page

- 📊 **Subscriptions System**
  - Subscribe/unsubscribe to channels with one click
  - View all subscribed channels in dedicated page
  - Subscribe button with visual feedback
  - Persistent subscription data

### Advanced Features

- ⌨️ **Keyboard Shortcuts** - Press `/` to focus search, `t` to toggle theme
- 🎬 **Smart Related Videos** - Keyword-based algorithm to show relevant content
- 🔄 **Redux State Management** - Centralized state for categories, videos, user data, dark mode, and more
- 💾 **Persistent User Data** - All user interactions saved in Redux (history, likes, watch later, subscriptions)
- 🎨 **Video Card Quick Actions** - Add to Watch Later, Like, and Share directly from any video card
- 📍 **Smart Navigation** - Click channel names to view channel pages, smooth page transitions
- 🔔 **Interactive UI Elements** - Real-time visual feedback for all user actions

---

## 🛠️ Technologies Used

### Frontend

- **React.js** - UI library for building user interfaces
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **Material-UI (MUI)** - UI component library
- **Tailwind CSS** - Utility-first CSS framework

### APIs & Libraries

- **Axios** - HTTP client for API requests
- **RapidAPI (YouTube v3)** - YouTube data fetching
- **React Player** - Video playback component
- **React Icons** - Icon library
- **JavaScript Time Ago** - Time formatting utility

### Development Tools

- **Create React App** - Project setup and build tools
- **Docker** - Containerization support
- **dotenv** - Environment variable management

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- RapidAPI Key for YouTube v3 API

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/vanshikasikarwar/Youtube-Clone.git
cd Youtube-Clone
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
REACT_APP_SECRET_KEY=your_rapidapi_key_here
```

To get your RapidAPI key:

- Go to [RapidAPI YouTube v3](https://rapidapi.com/ytdlfree/api/youtube-v31/)
- Sign up/Login
- Subscribe to the API (Free tier available)
- Copy your API key

4. **Start the development server**

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

| Command         | Description                                      |
| --------------- | ------------------------------------------------ |
| `npm start`     | Runs the app in development mode                 |
| `npm run build` | Builds the app for production                    |
| `npm test`      | Launches the test runner                         |
| `npm run eject` | Ejects from Create React App (one-way operation) |

---

## 📁 Project Structure

```
Youtube-Clone/
├── public/
│   ├── index.html          # HTML template
│   ├── yt3.png            # App icon
│   └── _redirects         # Netlify redirects
├── src/
│   ├── assets/            # Images and static assets
│   │   ├── darkMode.png
│   │   ├── lightMode.png
│   │   ├── ytLogo.png
│   │   └── ytLogo-dark.png
│   ├── components/        # Reusable components
│   │   ├── Comments.jsx
│   │   ├── DarkModeButton.jsx
│   │   ├── MiniPlayer.jsx
│   │   ├── MobileNav.jsx
│   │   ├── Navbar.jsx
│   │   ├── ShareModal.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SkeletonLoader.jsx
│   │   └── VideoCard.jsx
│   ├── pages/            # Page components
│   │   ├── ChannelDetails.jsx
│   │   ├── Feed.jsx
│   │   ├── Library.jsx
│   │   ├── SearchFeed.jsx
│   │   ├── Subscriptions.jsx
│   │   ├── Trending.jsx
│   │   └── VideoDetails.jsx
│   ├── redux/            # Redux slices
│   │   ├── categorySlice.js
│   │   ├── channelSlice.js
│   │   ├── darkModeSlice.js
│   │   ├── miniPlayerSlice.js
│   │   ├── searchSlice.js
│   │   ├── userSlice.js
│   │   └── videoSlice.js
│   ├── utils/            # Utility functions
│   │   ├── categories.js
│   │   ├── convert.js
│   │   ├── date.js
│   │   └── Fetch.js
│   ├── App.js           # Main App component
│   ├── index.js         # Entry point
│   ├── index.css        # Global styles
│   └── store.js         # Redux store
├── .env                 # Environment variables (create this)
├── Dockerfile          # Docker configuration
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
└── README.md          # Project documentation
```

---

## 🔑 Key Components

### State Management (Redux Slices)

- **categorySlice** - Manages selected categories, sidebar state, and category-based video feeds
- **channelSlice** - Stores channel information and videos
- **darkModeSlice** - Handles dark/light theme switching and persistence
- **miniPlayerSlice** - Controls mini player visibility and video state
- **searchSlice** - Manages search queries and results
- **userSlice** - Watch history, liked videos, watch later list, and channel subscriptions
- **videoSlice** - Current video details, statistics, and related videos

### Key Pages

- **Feed** - Main home page with category-filtered video grid
- **VideoDetails** - Full video player with description, stats, comments, and related videos
- **ChannelDetails** - Channel page with banner, info, and video grid
- **SearchFeed** - Search results page with filtered video list
- **Trending** - Trending content with tabbed navigation (Now, Music, Gaming, Movies)
- **Library** - Complete user library with three tabs:
  - **History Tab** - All watched videos with timestamps
  - **Watch Later Tab** - Saved videos for future viewing
  - **Liked Videos Tab** - Collection of all liked content
- **Subscriptions** - List of subscribed channels with management options

### Reusable Components

- **Navbar** - Top navigation bar with search, logo, menu toggle, and theme switcher
- **Sidebar** - Collapsible category navigation (desktop) and full sidebar (mobile)
- **VideoCard** - Reusable video card with thumbnail, title, channel, views, and actions
- **Comments** - Interactive comment section with like, reply, and add comment features
- **ShareModal** - Multi-platform sharing modal with copy link functionality
- **MiniPlayer** - Floating video player for background watching
- **MobileNav** - Bottom navigation bar for mobile devices
- **SkeletonLoader** - Loading placeholders for better UX

### Utility Functions

- **Fetch.js** - API calls to YouTube v3
- **categories.js** - Category definitions with icons
- **convert.js** - Number formatting (views, subscribers)
- **date.js** - Time formatting (upload dates)

---

## 🌐 API Integration

This project uses the **YouTube v3 API** from RapidAPI to fetch:

- ✅ Video details and metadata (title, description, views, likes, publish date)
- ✅ Channel information (name, subscriber count, videos)
- ✅ Search results (keyword-based video search)
- ✅ Related videos (keyword-matching algorithm for relevant content)
- ✅ Category-based content (filtered by predefined categories)
- ✅ Trending content (popular videos across different categories)

**Note:** Comments are currently displayed using mock data for demonstration purposes

### API Configuration

Located in `src/utils/Fetch.js`:

```javascript
const base_url = "https://youtube-v31.p.rapidapi.com";
const options = {
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_SECRET_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};
```

---

## 🐳 Docker Support

The project includes a Dockerfile for containerization:

```bash
# Build Docker image
docker build -t youtube-clone .

# Run container
docker run -p 3000:3000 youtube-clone
```

---

## ⌨️ Keyboard Shortcuts

Enhance your browsing experience with these shortcuts:

| Key | Action                 | Description                        |
| --- | ---------------------- | ---------------------------------- |
| `/` | Focus search bar       | Quickly start searching for videos |
| `t` | Toggle dark/light mode | Switch between themes instantly    |

> 💡 **Note:** Shortcuts work on all pages except when typing in input fields

---

## 🎨 Color Scheme

### Light Mode

- Background: `#FFFFFF`
- Text: `#0F0F0F`
- Secondary: `#606060`

### Dark Mode

- Background: `#0F0F0F`
- Text: `#FFFFFF`
- Secondary: `#AAAAAA`

---

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

## 🚀 Deployment

### Deploy to Netlify

1. Build the project:

```bash
npm run build
```

2. Deploy to Netlify:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Environment Variables

Don't forget to add your `REACT_APP_SECRET_KEY` in your deployment platform's environment variables section.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Vanshika Sikarwar** ❤️

Built with passion and dedication by Vanshika Sikarwar

- 🌟 **GitHub:** [@vanshikasikarwar](https://github.com/Vanshika-RJIT)
- 💼 **LinkedIn:** [Connect with me](https://linkedin.com/in/vanshika-s-540604185)
- 📧 **Email:** vanshikasikarwar277@gmail.com

_Feel free to reach out for collaborations or questions!_

---

## 🙏 Acknowledgments

- **YouTube** - For design inspiration and UI/UX patterns
- **RapidAPI** - For providing access to YouTube v3 API
- **React Community** - For amazing libraries and tools
- **Material-UI** - For elegant component styling
- **React Icons** - For comprehensive icon library
- **Tailwind CSS** - For utility-first styling approach

---

## 📊 Project Stats

- **Total Components:** 9 reusable components
- **Total Pages:** 7 different pages
- **Redux Slices:** 7 state management slices
- **API Integration:** YouTube v3 via RapidAPI
- **Responsive Breakpoints:** 3 (Mobile, Tablet, Desktop)
- **Theme Support:** Dark & Light modes

---

## 🚧 Future Enhancements

- 🔐 User authentication with Google Sign-In
- 💬 Real-time comments integration
- 📊 Advanced video analytics
- 🎵 Create and manage playlists
- 📹 Video upload simulation
- 🔔 Notification system
- 🎯 Personalized recommendations
- 📱 Progressive Web App (PWA) support

---

## ⭐ Show Your Support

If you like this project, please consider giving it a ⭐ on GitHub!

[![GitHub stars](https://img.shields.io/github/stars/Vanshika-RJIT/Youtube-Clone?style=social)](https://github.com/Vanshika-RJIT/Youtube-Clone)

---
