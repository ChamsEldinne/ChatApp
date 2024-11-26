import React from "react";

function ActiveUserWithStoryContainer() {
  return (
    <div className="text-sm text-center mr-4">
      <div className="p-1 border-4 border-blue-600 rounded-full">
        <div className="w-16 h-16 relative flex flex-shrink-0">
          <img
            className="shadow-md rounded-full w-full h-full object-cover"
            src="https://randomuser.me/api/portraits/women/12.jpg"
            alt=""
          />
        </div>
      </div>
      <p>Anna</p>
    </div>
  );
}

export default ActiveUserWithStoryContainer;
