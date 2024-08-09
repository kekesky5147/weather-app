// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react"
import "./Weather.css"
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"
import humidity_icon from "../assets/humidity.png"

const Weather = () => {
  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState()
  const [alertText, setAlertText] = useState()

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
  }

  const search = async (cityName) => {
    if (cityName === "") {
      setAlertText("Please type city name")
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`

      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }

      console.log(data)
      const icon = allIcons[data.weather[0].icon] || clear_icon
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        feelsLike: data.main.feels_like,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      })
    } catch (error) {
      setWeatherData(false)
      console.error("Error in fetching weather data")
    }
  }

  useEffect(() => {
    search("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
          width="45px"
          height="45px"
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          {/* <p>{weatherData.feelsLike}</p> */}
          <p className="temperature">{weatherData.temperature}</p>
          <p className="location"> {weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" width="25px" height="25px" />
              <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" width="25px" height="25px" />
              <div>
                <p>{weatherData.windSpeed}</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Weather
