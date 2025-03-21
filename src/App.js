import React, {useEffect, useState} from "react";
import './App.css';
import Chuck from './chuck.jpeg';
import axios from "axios";

function App() {

    const WEATHER_API = "https://weatherdbi.herokuapp.com/data/weather/";
    const CHUCK_API = "https://api.chucknorris.io/jokes/random";

    const [count, setCount] = useState(0);
    const [drawing, setDrawing] = useState("");
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const [cityName, setCityName] = useState("Barcelona");

    const [frase, setFrase] = useState("");

    const [state, setState] = useState({joke: ''})
    const [phrase, setPhrase] = useState({joke: ''})


    function updateDrawing() {
        if (count === 0) {
            setDrawing("✨");
        } else {
            setDrawing("⭐️".repeat(count));
        }
    }

    function updateWeatherData(data) {
        const temperature = data.currentConditions.temp.c
        const iconURL = data.currentConditions.iconURL
        setTitle(`Good Morning people! today we have ${temperature} º in ${cityName}`)
        setIcon(iconURL)
    }

    useEffect(() => {
        fetch(WEATHER_API + cityName) // saco el JSON de datos
            .then(r => r.json()) //
            .then(updateWeatherData)
    }, [cityName]);

    useEffect(() => console.log(
            "Hola, llevamos " + count),
        [count]);

    useEffect(updateDrawing, [count]);

    function increaseCounter() {
        if (count < 5)
            setCount(count + 1);
        else (setCount(0));
    }

    function updateChuckSentence(jokes) {
        const sentence = jokes.value
        const icon_url = jokes.categories.icon_url

        setFrase(sentence)
        setIcon(icon_url)
    }

    useEffect(() => {
        fetch(CHUCK_API) // saco el JSON de datos
            .then(response => response.json()) //
            .then(updateChuckSentence);
    }, []);


    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        const result = await axios.get(CHUCK_API);
        console.log(result.data.value);
        setState({
            ...state,
            joke: result.data.value
        });
    }

    /*   function updateChuckSentence(jokes) {
            const sentence = jokes.categories.value
            const icon_url = jokes.icon_url
            setSentence(`Chuck de hoy es  ${sentence}`)
            setIcon(icon_url)
        }*/

    return (
        <div className="App">
            <h2>{title}</h2>
            <h4>Today is a</h4><img src={icon} alt="weather icon"/><h4>day</h4>
            <input type={"text"} onChange={(e) => setCityName(e.target.value)}/>


            <h1>Chuck´s phrase for today is: </h1>
            <h4>{`${frase}`}</h4>


            <p> {`La cuenta es ${count}`}</p>
            <p> {drawing} </p>
            <button onClick={increaseCounter}>Puntúanos!</button>


            <section>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className="col-6">
                            <h1 className="title">Chuck Norris API </h1>
                            <img src={Chuck} alt="Chuck Norris"/>
                        </div>

                        <div className="col-6 searchJokeCol">
                            <div className="card">
                                <div className="card-header">
                                    Search for a word
                                </div>
                                <div className="card-body">
                                    <input type="text"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    <button className="btn btn-warning btn-lg">Generate Joke</button>
                </div>

                <h2 className="subTitle"> Here is the Joke</h2>
                <h4>{state.joke}</h4>
            </section>

            <p> {`Rating: ${count}`}</p>
            <p> {drawing} </p>
            <button onClick={increaseCounter}>Rate Us!</button>
        </div>

    )

}

export default App;
