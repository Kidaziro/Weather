/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import { AiOutlineSearch } from "react-icons/ai";
import PropTypes from "prop-types";
import { style } from "../style";
import axios from "axios";
import Flag from "react-world-flags";
import { BsFillMoonStarsFill , BsSunFill } from "react-icons/bs";


const Menu = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dark, setdark] = useState(false);


  const toggleVisibility = () => setIsVisible(!isVisible);

  const [data, setData] = useState([]);
  const [data_temp, setData_temp] = useState([]);
  const [location, setLocation] = useState("");

  let lat = null;
  let lon = null;
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=4&appid=c311d70e4ee1fcc13e448eb2cc381be7`;

  const handleClick = (event) => {
    let output = event.currentTarget.id;
    let modifiedStr = output.replace(/\[|\]/g, "");
    modifiedStr = modifiedStr.replace(/\s/g, "");
    let coordinates = modifiedStr.split(",");
    lat = coordinates[0];
    lon = coordinates[1];
    search_with_location();
    toggleVisibility();
    goToLink();
  };
  const goToLink = () => {
    // window.location.href = "#card";
  };

  const searchlocation = (event) => {
    if (event.key === "Enter" && location != "") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
    }
    // else if (event.key === "Delete") {

    // }
  };
  const search_with_location = () => {
    const url_data = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c311d70e4ee1fcc13e448eb2cc381be7`;

    axios.get(url_data).then((response) => {
      setData_temp(response.data);
      props.onDataUpdate(lat, lon);
    });
  };
  
  const backGround = ()=>{
    props.handleChange(dark);
    setdark(!dark);
    console.log("click1" , dark)
    
    
  }

  const click = () => {
    axios.get(url).then((response) => {
      setData(response.data);
    });
  };

  return (
    <div className="z-[1] ">
      <div className="flex justify-between items-center">
        <div>
          <HiOutlineMenu
            className={`${style.icon} ${isVisible ? "hidden" : "visible"}`}
            onClick={toggleVisibility}
          />
          <VscChromeClose
            className={`${style.icon} ${isVisible ? "visible" : "hidden"} `}
            onClick={toggleVisibility}
          />
        </div>
        <BsFillMoonStarsFill className={` ${dark ? "hidden":"visible "}  lg:h-[45px] md:h-[30px] sm:h-[20px] h-[50px] lg:mr-[38px] md:mr-[10px] lg:mt-[26px] md:mt-[10px] sm:mt-[10px] mt-[10px] cursor-pointer lg:w-[70px] md:w-[50px] sm:w-[50px] w-[60px] lg:mb-0 md:mb-0 sm:mb-0 mb-11 text-black`} 
        onClick={backGround}
        />
        <BsSunFill className={`${dark ? "visible ":"hidden"} lg:h-[45px] md:h-[30px] sm:h-[20px] h-[50px] lg:mr-[38px] md:mr-[10px] lg:mt-[26px] md:mt-[10px] sm:mt-[10px] mt-[10px] cursor-pointer lg:w-[70px] md:w-[50px] sm:w-[50px] w-[60px] lg:mb-0 md:mb-0 sm:mb-0 mb-11 text-white`} 
        onClick={backGround}/>
      </div>
      <div
        className={`p-10  ${
          isVisible ? "visible" : "hidden"
        } absolute flex flex-col items-start`}
        id="search"
      >
        <div className="flex items-center justify-end  ">
          <input
            className="shadow appearance-none border rounded lg:w-[350px] md:w-[250px] sm:w-[200px] w-[235px]
              lg:py-2 md:py-2 sm:py-1 py-2 px-3 
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchlocation}
          />
          <AiOutlineSearch
            className="absolute text-2xl text-[#1e1e1e] cursor-pointer lg:mr-3 md:mr-1 sm:mr-1 mr-1 "
            onClick={click}
          />
        </div>

        <div className="backdrop-blur-md  text-white border-b-[1px] border-l-[1px] border-r-[1px] rounded-b-2xl lg:min-w-[350px] md:max-w-[250px] sm:max-w-[200px] max-w-[245px] ">
          {data.map((locationData, index) => (
            <div
              key={index}
              className={`hover:opacity-80 hover:text-[#1e1e1e]  
                pl-3 pr-3 `}
            >
              <div
                className="flex justify-between cursor-pointer"
                id={`[ ${locationData.lat} , ${locationData.lon} ]`}
                onClick={handleClick}
              >
                <h2 className="font-bold lg:text-base md:text-sm sm:text-xs text-lg">
                  {locationData.name}
                </h2>

                <p className=" lg:text-base md:text-sm sm:text-xs text-xs ml-1">
                  Country: {locationData.country}
                  <Flag
                    code={locationData.country}
                    className="lg:w-[30px] md:w-[20px] sm:w-[20px] w-[35px] ml-auto"
                  />
                </p>
              </div>

              <div className="flex mt-2 lg:mb-2 md:mb-3 sm:mb-2 mb-2">
                <p className="lg:text-xs md:text-[9px] sm:text-[8px] text-[8px] ">
                  Latitude: {locationData.lat}
                </p>
                <p className="lg:text-xs md:text-[9px] sm:text-[8px] text-[8px] lg:ml-3 md:ml-10 sm:ml-10 ml-11">
                  Longitude: {locationData.lon}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
Menu.propTypes = {
  onDataUpdate: PropTypes.func.isRequired,
  handleChange : PropTypes.func.isRequired,
};
export default Menu;
