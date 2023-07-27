// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

import Card from "./Card";
import { rainb } from "../assets";
import Menu from "./menu";
const Home = () => {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const handleDataUpdate = (newData_lat,newData_lon) => {
    setLat(newData_lat);
    setLon(newData_lon);

  };
  
  return (
    <div className="scroll-smooth">
      <div className="" id="HomeBar">
        <div className="absolute flex flex-col w-full max-w-[1440px]">
          <Menu onDataUpdate={handleDataUpdate}/>
          <Card lat={lat} lon={lon} />
        </div>  

        <img src={rainb} className="w-full h-[800px] " />
      </div>
    </div>
  );
};

export default Home;
