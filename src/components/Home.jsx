// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Card from "./Card";
<<<<<<< HEAD

import Menu from "./menu";
import { darkb, rainb } from "../assets";

=======
import { rainb } from "../assets";
import Menu from "./Menu";
>>>>>>> 6a11c6c7bb7f687ef325d0483ad48ec0cb8f456b
const Home = () => {

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const handleDataUpdate = (newData_lat,newData_lon) => {
    setLat(newData_lat);
    setLon(newData_lon);

  };
  
  const [dark,setdark] =useState(true);
 
  const handleChange = (getvalue) => {
    setdark(getvalue);
    console.log("click2")
  };


  return (
    <div className="scroll-smooth">
      <div className="" id="HomeBar">
        <div className="absolute flex flex-col w-full max-w-[1440px]">
          <Menu onDataUpdate={handleDataUpdate} handleChange={handleChange} />
          <Card lat={lat} lon={lon} img={dark} />
        </div>  

        <img src={dark ? rainb : darkb} className="w-full h-[800px] " />
      </div>
    </div>
  );
};

export default Home;
