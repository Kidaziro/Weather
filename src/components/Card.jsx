/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { dark, rain } from "../assets";
import PropTypes from "prop-types";
import axios from "axios";
import dotenv from 'react-dotenv';
const Carde = (props) => {
  const { lat,lon , img} = props;
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Months start at 0!
  const year = today.getFullYear();
  const formattedToday = `${day}-${month}-${year}`;
  const [city,setCity]=useState("No Where");
  const [temp,setTemp]=useState("9");
  const [icon,setIcon]=useState("09n");
  const [Humidity,setHumidity]=useState("-");
  const [weather,setWeather]=useState("Raining");
  const [description,setDescription]=useState("-");
  const [country,setCountry]=useState("-");
  const [time,setTime]=useState("-");

  
  const divs = [];

  for (let i = 0; i < 3; i++) {
    divs.push(
      <div id={`dote-`+i} className={`rounded-xl lg:p-[7px] md:p-[5px] sm:p-[5px] p-[7px] lg:ml-2 md:ml-1 sm:ml-[2px] ml-1  ${i==1 ? "bg-white ":"bg-gray-300 "} animate-bounce`}></div>
    );
  }

  useEffect(() => {
    const url_data = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c311d70e4ee1fcc13e448eb2cc381be7`;
    if (lat != null && lon != null && lon != "" && lat != "") {
          
      axios.get(url_data).then((response) => {

      setCity(response.data.name);
      setTemp(Math.ceil(response.data.main.temp))
      setWeather(response.data.weather[0].main)
      setIcon(response.data.weather[0].icon)
      setHumidity(response.data.main.humidity)
      setDescription(response.data.weather[0].description)
      setCountry(response.data.sys.country)    
      setTime(new Date((response.data.dt * 1000 - response.data.timezone * 1000)+ 60 * 60 * 1000).toString())
      
    });
  }
  }, [lat, lon]);

  const divData = [
    { label: "Humidity", value: Humidity },
    { label: "Description", value: description },
    { label: "Country", value: country },
  ];


  return (
    <div
      className="flex justify-center z-[0]"
      id="card"
    >
      <p className="text-xl text-white">{img} </p>
      <div className="lg:w-[450px] md:w-[350px] sm:w-[250px] w-[340px] ">
        <div className="absolute mt-[15px] ml-[15px] ">
          <div id="dotes" className="flex">
          {divs}
          </div>

          <div className="lg:mt-[30px] md:mt-[16px] sm:mt-[6px] mt-[18px] lg:ml-[10px] md:ml-[2px] sm:ml-[2px] ml-[2px]" id="date">
            <p className="text-white lg:text-3xl md:text-xl sm:text-md text-2xl font-mono lg:pb-[9px] md:pb-[9px] sm:pb-[1px] pb-[4px]">
              {formattedToday}
            </p>
            <p className="font-bold text-black lg:text-base md:text-[12px] sm:text-[9px] text-[13px] ">{time}</p>
          </div>

          <div
            className="lg:mt-[40px] md:mt-[10px] sm:mt-[10px] mt-[50px] text-white flex justify-between items-center  lg:w-[420px] md:w-[320px] sm:w-[240px] w-[320px]  "
            id="C°"
          >
            <p className="lg:text-9xl md:text-8xl sm:text-7xl text-8xl lg:ml-4 md:ml-3 sm:ml-0 ml-4"> {temp}°</p>
            <div className="flex flex-col items-center justify-end">
              {/* <WiDaySunny className="text-9xl" /> */}
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                className="lg:w-[130px] md:w-[100px] sm:w-[90px] w-[130px] lg:mb-5 md:mb-2"
              />
              <p className="text-center font-medium lg:text-3xl md:text-xl sm:text-xs text-md absolute ">
                {weather}
              </p>
            </div>
          </div>

          <div className="lg:mt-[100px] md:mt-[90px] sm:mt-[45px] mt-[90px] " id="text">
            <p className="text-white font-light lg:text-2xl md:text-xl sm:text-[16px] text-xl lg:mb-3 md:mb-2 sm:mb-1 mb-2 ">We are in {city}</p>

            <div className="backdrop-blur-lg bg-[#1e1e1e] rounded-md text-white lg:w-full md:w-full sm:w-[225px] bg-opacity-50 flex justify-between lg:p-3 md:p-2 sm:p-1 p-3">
              {divData.map((data, index) => (
                <div className="flex flex-col items-center" key={index}>
                  <h2 className="font-bold lg:text-base md:text-sm sm:text-xs text-base">{data.label}</h2>
                  <p className="lg:text-base md:text-[12px] sm:text-[10px]  mt-1 ">{data.value}</p>
                </div>

              ))}
            </div>
          </div>
        </div>
        <img src={img ? rain : dark} className="w-full lg:h-[550px] md:h-[420px] sm:h-[320px] h-[500px] rounded-[30px] " />
      </div>
    </div>
  );
};

Carde.propTypes = {
  lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  lon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  img :PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  
};
export default Carde;
