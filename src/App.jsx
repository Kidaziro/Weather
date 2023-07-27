import "./index.css";
import React from "react";
import Home from "./components/Home";

function App() {

  return (
    <>
      <div className="w-full flex justify-center bg-gray-600 h-screen select-none" >
        <div className="max-w-[1440px] w-full ">
          <Home />
        </div>
      </div>

    </>
  );
}

export default App;
