import { useState } from "react"

export const WheatherApp = () => {

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = '5f69956ada59373350d6714b16769157'
  

  const [ciudad, setCiudad] = useState('')
  const [dataClima, setDataClima] = useState(null)

  const handleCambioCiudad =(e)=>{
    setCiudad(e.target.value)
  }
const handleSubmit =(e)=>{
  e.preventDefault()
  if (ciudad.length > 0) fetchClima()
}
  

  const fetchClima = async ()=>{
    try{
        const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
        const data =await response.json();
        setDataClima(data)
    } catch(error){
      console.error('Ocurrio el siguiente problema: ',error)
    }
      
    


  }


  return (
    <div className='container'>
      <h1>Aplicacion de Clima</h1>

      <form onSubmit={handleSubmit}>
        <input
        type="text" 
        value={ciudad}
        onChange={handleCambioCiudad}
        />
        <button type='submiti'>Buscar</button>
      </form>
      {
        dataClima && (
          <div>
            <h2>{dataClima.name},{dataClima.country}</h2>
            <p>{dataClima.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
            <p>Temperatura: {parseFloat((dataClima.main.feels_like-273.15).toFixed(1))}°C</p>
            <p>Sensación Térmica: {parseFloat((dataClima.main.temp-273.15).toFixed(1))}°C</p>
            <p>Humedad: {dataClima.main.humidity}%</p>
          </div>
        )
      }
    </div>
  )
}
