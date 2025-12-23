import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { getCategoryVideos } from "../redux/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import timeSince from "../utils/date";
import "./feed.css";
function Feed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { categoryVideos } = useSelector((state) => state.category);
  const { sidebarExtend } = useSelector((state) => state.category);
  const { darkMode } = useSelector((state) => state.darkMode);

  useEffect(() => {
    dispatch(
      getCategoryVideos(
        `search?part=snippet&q=${id ? id : "Coding development"}`
      )
    );
    document.title = `${id ? id + "- Youtube" : "Home - Youtube"}`;
  }, [id, dispatch]);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#131417" : "#fff";
  }, [darkMode]);
  var aDay = 24 * 60 * 60 * 1000;
  return (
    <>
      {/* <Sidebar /> */}
      <div
        className={`sm:hidden overlayEffect ${
          sidebarExtend ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`transition-all duration-300 ${
          sidebarExtend ? "sm:ml-60" : "sm:ml-[72px]"
        } feedGrid grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 pt-20 px-4 md:px-6 pb-6`}
      >
        {categoryVideos?.map((e, index) => {
          return (
            <div key={index} style={{ marginTop: index === 0 ? "0px" : "0px" }}>
              <VideoCard
                key={index}
                title={e.snippet.title}
                thumbnail={e.snippet?.thumbnails?.medium?.url}
                on={timeSince(
                  new Date(Date.parse(e.snippet.publishedAt) - aDay)
                )}
                channel={e.snippet.channelTitle}
                channelId={e.snippet.channelId}
                videoId={e.id.videoId}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Feed;
