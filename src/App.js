import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function App() {
    const WEATHER_API = "https://weatherdbi.herokuapp.com/data/weather/";
    const CHUCK_API = "https://api.chucknorris.io/jokes/random";

    const [count, setCount] = useState(0);
    const [drawing, setDrawing] = useState("");
    const [title, setTitle] = useState("");
    const [frase, setFrase] = useState("");
    const [icon, setIcon] = useState("");
    const [cityName, setCityName] = useState("barcelona");



    function updateDrawing() {
        if (count === 0) {
            setDrawing("✨");
        } else {
            setDrawing("⭐️".repeat(count));
        }
    }

    function updateWeatherData( data ) {
        const temperature = data.currentConditions.temp.c
        const iconURL = data.currentConditions.iconURL
        setTitle(`Buenos días, hoy tenemos ${temperature} grados en ${cityName}`)
        setIcon(iconURL)
    }

    function updateChuckSentence( jokes ) {
        const sentence = jokes.categories.random
        const icon_url = jokes.categories.icon_url
        setFrase(`La frase de Chuck de hoy es  ${sentence} `)
        setIcon(icon_url)
    }


    useEffect( () => {
        fetch(WEATHER_API + cityName) // saco el JSON de datos
            .then(r => r.json()) //
            .then( updateWeatherData )
    }, [cityName]);

    useEffect( () => {
        fetch(CHUCK_API ) // saco el JSON de datos
            .then(response => response.json()) //
            .then( updateChuckSentence )
    }, []);

    useEffect( () => console.log(
        "Hola, llevamos "+ count),
        [count]);

    useEffect(updateDrawing, [count]);

    function increaseCounter() {
        setCount(count + 1);

    }

    return (
        <div className="App">
            <h2>{ title }</h2>
            <img src={icon} alt="weather icon"/>
            <input type={"text"} onChange={(e) => setCityName(e.target.value) } />
            <h2>{frase}</h2>
            <p>{`La frase de Chuck de hoy es ${sentence}`}</p>
            <p> {`La cuenta es ${count}`}</p>
            <p> { drawing } </p>
            <button onClick={increaseCounter}>Incrementar</button>
        </div>
    );
}

export default App;
