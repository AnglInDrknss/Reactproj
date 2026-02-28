import { useState } from "react";
import Header from "./components/Header";

function App() {
  const [name, setName] = useState("Artemii")
  const [pokemon, setPokemon] = useState(null)

  const loadPokemon =async nameOrId => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    const data = await response.json();

    setPokemon({
      name: data.name,
      image: data.sprites.front_default,
      height: data.height,
      weight: data.weight,
      types: data.types.map(t => t.type.name),
    });
  }
  
  const HandleSearchPokemon = async() => {
    loadPokemon(name)
  } 

  const HandleRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 1025) + 1
    loadPokemon(randomId)
  }
  return (
    <>
      <Header/>

      <div className='controls'>
        <input id='pokemonInput' type='text' placeholder='Например: pikachu' onChange={(e) => setName(e.target.value)}/>
        <button id='loadBtn' onClick={HandleSearchPokemon}>Загрузить</button>
        <button id='randomBtn' onClick={HandleRandomPokemon}>🎲 Random</button>
      </div>

      <p id='status' className='status'></p>

      <div id='card' className='card-container'>
        {pokemon ? (
          <div className='card'>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.image} />

            <p>Рост: {pokemon.height}</p>
            <p>Вес: {pokemon.weight}</p>

            <div className='types'>
              {pokemon.types.map(type => (
                <span key = {type} className="type">{type}</span>
              ))}
            </div>
          </div>
        ) : (
          "null"
        )}
      </div>
    </>
  );
}


export default App
