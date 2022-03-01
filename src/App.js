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
    const [cityName, setCityName] = useState("Barcelona");




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
        setTitle(`Good Morning people! today we have ${temperature} º in ${cityName}`)
        setIcon(iconURL)
    }

    function updateChuckSentence( jokes ) {
        const sentence = jokes.value
        const icon_url = jokes.categories.icon_url

        setFrase(sentence)
        setIcon(icon_url)
    }


    useEffect( () => {
        fetch(WEATHER_API + cityName) // saco el JSON de datos
            .then(r => r.json()) //
            .then( updateWeatherData )
    }, [cityName]);

    useEffect( () => {
        fetch(CHUCK_API) // saco el JSON de datos
            .then(response => response.json()) //
            .then(updateChuckSentence);
    }, []);

    useEffect( () => console.log(
        "Hola, llevamos "+ count),
        [count]);

    useEffect(updateDrawing, [count]);

    function increaseCounter() {
        if (count <5)
            setCount(count + 1);
        else (setCount (0));

    }


    return (
        <div className="App">
            <h2>{ title }</h2>
            <h4>Today is a</h4><img src={icon} alt="weather icon"/><h4>day</h4>
            <input type={"text"} onChange={(e) => setCityName(e.target.value) } />


<h1>Chuck´s phrase for today is: </h1>
            <h4>{`${frase}`}</h4>



            <p> {`Rating: ${count}`}</p>
            <p> { drawing } </p>
            <button onClick={increaseCounter}>Rate Us!</button>
        </div>
    );
}

export default App;
