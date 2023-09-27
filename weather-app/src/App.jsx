import { useState } from 'react'
import axios from 'axios'
import ActualDate from './component/ActualDate';

function App() {

  const [data ,setData] = useState({})
  const [location ,setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=3c9a852f446f98a41bc44a31d093ce81&lang=fr`

  const searchLocation = (event) => {
    if(event.key === 'Enter'){{
      axios.get(url).then((res) => {
        console.log(res.data)
        setData(res.data)
    })}
    setLocation('')
    }
  }

  return (
    <div className='page-container'>
      <div className='search-bar'>
        <input 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyUp={searchLocation}
          placeholder='Entrez le lieu souhaité...'
          type='text'
        />
      </div>

      {data.name != undefined && 
        <div className='container'>
          <div className='main-infos'>
            <div className='weather-infos'>
              <div className='location'>
                <h1>{data.name} / {data.sys.country}</h1>
              </div>
              <div className='temp'>
                {data.main ? <h2>{Math.floor(data.main.temp)}°C</h2> : null}
              </div>
              <div className='temp-min-max'>
                <p>{Math.floor(data.main.temp_min)}°C / {Math.floor(data.main.temp_max)}°C</p>
              </div>
              <div className='description'>
                {data.weather ? <h3 style={{textTransform: 'capitalize'}}>{data.weather[0].description}</h3> : null}
              </div>
            </div>
            <div className='weather-icons'>
              <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}/>  
              <ActualDate/>
            </div>
            
          </div>
          

          <div className='additional-infos'>
            <div className='feels'>
              {data.main ? <h3>{Math.floor(data.main.feels_like)}°C</h3> : null}
              <p>Ressenti</p>
            </div>
            <div className='humidity'>
              {data.main ? <h3>{data.main.humidity}%</h3> : null}
              <p>Humidité</p>
            </div>
            <div className='wind'>
              {data.wind ? <h3>{Math.floor(data.wind.speed)} km/h</h3> : null}
              <p>Vent</p>
            </div>
          </div>
        </div>
      }
      
    </div>
  )
}

export default App
