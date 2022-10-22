import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css'

const App = ()=>{

    const [ robots, setRobots] = useState([]); // inicia lista vacia
    const [ searchfield, setSearchfield ] = useState(''); // inicia campo vacio

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>response.json())
        .then(users=>{setRobots(users)})
     },[])  // si se vacia los usuarios se vuelve a cargar desde api


    const onSearchChange = (event)=>{
        setSearchfield(event.target.value)
    }

    const filteredRobots = robots.filter(robot=>{
        return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })

    return !robots.length ? 
        <h1>Cargando robots ...</h1> :
        (
            <div  className='tc'>
                <h1 className="f2">RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <CardList robots={filteredRobots}/>
                </Scroll>
            </div>
        );
}


export default App;
