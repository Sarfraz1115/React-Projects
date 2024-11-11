
import { useEffect, useState } from "react"
import "./App.css"
function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [city, setcity] = useState('');
  const [error, seterror] = useState(null);
  const [Loading, setLoading] = useState(false);


  const search = async (city) => {
    try {
      setLoading(true)
      seterror(null)
      const url = (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=67670bd9c968f43487d496d018e0e609`)
      let response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found OR Please check spelling")
        }
        else {
          throw new Error("something problem in fetching")
        }
      }
      let data = await response.json();
      setWeatherData({
        tempreture: Math.floor(data?.main?.temp),
        city: data.name,
        humidity: data?.main?.humidity,
        windSpeed: data?.wind?.speed,
      })
      // console.log(data)

    } catch (err) {
      console.log("Something error" + err);
      seterror(err.message);
    }finally{
      setLoading(false);
    }
  }


  const handleinput = (e) => {
    setcity(e.target.value);
  }

  const handleclick =  (e) => {
    e.preventDefault();
    setLoading(true)
    search(city);
  }



  return (
    < >
      <div className="container w-1/3  bg-transparent border-solid border-2 border-black rounded-2xl mx-auto text-center my-20">
        <div className="content">
          <h1 className="heading text-xl font-bold font-serif">Weather App </h1>
          <input onChange={handleinput} type="text" value={city} placeholder="search your city" className="inpt w-2/3 p-2 bg-transparent placeholder-black 
              border-solid border-2 border-black rounded-xl my-6"/>
          <button onClick={handleclick} className="w-18 p-2 bg-transparent border-solid border-2 border-black rounded-xl ml-1 ">
            {Loading ? "Loading..." : "Search"}
          </button>

          {error && <p className="text-red-600 font-bold text-xl">{error}</p>}

          {!error && weatherData && (

            <div className="weather-derails mt-7">
              <h1 className="text-5xl font-bold mb-3">{weatherData.tempreture}°C</h1>
              <h3 className="text-2xl">{weatherData.city}</h3>
              <div className="details flex justify-around mt-8 mb-4">
                <h4 className="text-xl font-mono">Humidity :{weatherData.humidity}</h4>
                <h5 className="text-xl font-mono">Wind Speed : {weatherData.windSpeed}km/h</h5>
              </div>
            </div>
          )}
          {!weatherData && !error && !Loading && (
            <p className="text-xl font-bold">Search the city</p>
          )}
        </div>
      </div>
    </>
  )
}

export default App
