import React from "react";
import "./loader.css";

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="spinner">
        <div className="spinnerin"></div>
      </div>
    </div>
  );
}

export default Loading;
