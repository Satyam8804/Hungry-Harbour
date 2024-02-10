import React from "react";

const Shimmer = () => {
  return (
    <div className="shimmer-container flex flex-col gap-4 p-4 items-center justify-center">
      <div className="shimmer-search-bar h-12 w-32 rounded-md bg-gray-300 mb-4 animate-pulse justify-center items-center"></div>
      <div className="shimmer-title h-8 w-1/2 rounded-md bg-gray-300 mb-4 animate-pulse justify-center"></div>
      <div className="shimmer-cards flex flex-wrap justify-center items-center gap-4">
        {[...Array(30)].map((_, index) => (
          <div
            key={index}
            className="shimmer-card h-72 w-60 p-4 shadow-md rounded-md transition-transform duration-300 flex flex-col gap-4 animate-pulse"
          >
            <div className="img h-40 w-full rounded-md bg-gray-300"></div>
            <div className="img h-4 w-full rounded-md bg-gray-300 mt-2"></div>
            <div className="img h-4 w-full rounded-md bg-gray-300 mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shimmer;
