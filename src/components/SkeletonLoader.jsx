import React from "react";
import { useSelector } from "react-redux";

// Video Card Skeleton
export function VideoCardSkeleton() {
  const { darkMode } = useSelector((state) => state.darkMode);
  
  return (
    <div className="animate-pulse">
      {/* Thumbnail Skeleton */}
      <div 
        className={`aspect-video rounded-xl ${
          darkMode ? "bg-dark-tertiary" : "bg-gray-200"
        }`}
      />
      
      {/* Info Skeleton */}
      <div className="flex gap-3 mt-3">
        {/* Avatar Skeleton */}
        <div 
          className={`w-9 h-9 rounded-full flex-shrink-0 ${
            darkMode ? "bg-dark-tertiary" : "bg-gray-200"
          }`}
        />
        
        <div className="flex-1">
          {/* Title Skeleton */}
          <div 
            className={`h-4 rounded mb-2 ${
              darkMode ? "bg-dark-tertiary" : "bg-gray-200"
            }`}
          />
          <div 
            className={`h-4 w-3/4 rounded mb-3 ${
              darkMode ? "bg-dark-tertiary" : "bg-gray-200"
            }`}
          />
          
          {/* Channel Skeleton */}
          <div 
            className={`h-3 w-1/2 rounded mb-1 ${
              darkMode ? "bg-dark-tertiary" : "bg-gray-200"
            }`}
          />
          
          {/* Views Skeleton */}
          <div 
            className={`h-3 w-1/3 rounded ${
              darkMode ? "bg-dark-tertiary" : "bg-gray-200"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

// Feed Skeleton Grid
export function FeedSkeleton({ count = 12 }) {
  return (
    <div className="grid gap-4 gap-y-6 sm:gap-y-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
      {Array.from({ length: count }).map((_, index) => (
        <VideoCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Related Video Skeleton
export function RelatedVideoSkeleton() {
  const { darkMode } = useSelector((state) => state.darkMode);
  
  return (
    <div className="flex gap-3 animate-pulse">
      <div 
        className={`w-40 h-24 rounded-lg flex-shrink-0 ${
          darkMode ? "bg-dark-tertiary" : "bg-gray-200"
        }`}
      />
      <div className="flex-1">
        <div 
          className={`h-4 rounded mb-2 ${
            darkMode ? "bg-dark-tertiary" : "bg-gray-200"
          }`}
        />
        <div 
          className={`h-4 w-3/4 rounded mb-3 ${
            darkMode ? "bg-dark-tertiary" : "bg-gray-200"
          }`}
        />
        <div 
          className={`h-3 w-1/2 rounded ${
            darkMode ? "bg-dark-tertiary" : "bg-gray-200"
          }`}
        />
      </div>
    </div>
  );
}

// Video Details Skeleton
export function VideoDetailsSkeleton() {
  const { darkMode } = useSelector((state) => state.darkMode);
  
  return (
    <div className="animate-pulse">
      {/* Video Player Skeleton */}
      <div 
        className={`aspect-video rounded-xl mb-4 ${
          darkMode ? "bg-dark-tertiary" : "bg-gray-200"
        }`}
      />
      
      {/* Title Skeleton */}
      <div 
        className={`h-6 rounded mb-2 ${
          darkMode ? "bg-dark-tertiary" : "bg-gray-200"
        }`}
      />
      <div 
        className={`h-6 w-3/4 rounded mb-4 ${
          darkMode ? "bg-dark-tertiary" : "bg-gray-200"
        }`}
      />
      
      {/* Stats Skeleton */}
      <div className="flex items-center gap-4 mb-4">
        <div 
          className={`h-10 w-32 rounded-full ${
            darkMode ? "bg-dark-tertiary" : "bg-gray-200"
          }`}
        />
        <div 
          className={`h-10 w-24 rounded-full ${
            darkMode ? "bg-dark-tertiary" : "bg-gray-200"
          }`}
        />
      </div>
      
      {/* Channel Info Skeleton */}
      <div className="flex items-center gap-4">
        <div 
          className={`w-12 h-12 rounded-full ${
            darkMode ? "bg-dark-tertiary" : "bg-gray-200"
          }`}
        />
        <div className="flex-1">
          <div 
            className={`h-4 w-32 rounded mb-2 ${
              darkMode ? "bg-dark-tertiary" : "bg-gray-200"
            }`}
          />
          <div 
            className={`h-3 w-24 rounded ${
              darkMode ? "bg-dark-tertiary" : "bg-gray-200"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

// Search Result Skeleton
export function SearchResultSkeleton() {
  const { darkMode } = useSelector((state) => state.darkMode);
  
  return (
    <div className="flex gap-4 animate-pulse">
      <div 
        className={`w-64 h-36 rounded-xl flex-shrink-0 ${
          darkMode ? "bg-dark-tertiary" : "bg-gray-200"
        }`}
      />
      <div className="flex-1 py-1">
        <div 
          className={`h-5 rounded mb-2 ${
            darkMode ? "bg-dark-tertiary" : "bg-gray-200"
          }`}
        />
        <div 
          className={`h-5 w-3/4 rounded mb-3 ${
            darkMode ? "bg-dark-tertiary" : "bg-gray-200"
          }`}
        />
        <div 
          className={`h-3 w-1/4 rounded mb-3 ${
            darkMode ? "bg-dark-tertiary" : "bg-gray-200"
          }`}
        />
        <div className="flex items-center gap-2 mb-3">
          <div 
            className={`w-6 h-6 rounded-full ${
              darkMode ? "bg-dark-tertiary" : "bg-gray-200"
            }`}
          />
          <div 
            className={`h-3 w-24 rounded ${
              darkMode ? "bg-dark-tertiary" : "bg-gray-200"
            }`}
          />
        </div>
        <div 
          className={`h-3 w-full rounded mb-1 ${
            darkMode ? "bg-dark-tertiary" : "bg-gray-200"
          }`}
        />
        <div 
          className={`h-3 w-2/3 rounded ${
            darkMode ? "bg-dark-tertiary" : "bg-gray-200"
          }`}
        />
      </div>
    </div>
  );
}

const SkeletonLoaders = {
  VideoCardSkeleton,
  FeedSkeleton,
  RelatedVideoSkeleton,
  VideoDetailsSkeleton,
  SearchResultSkeleton,
};

export default SkeletonLoaders;

