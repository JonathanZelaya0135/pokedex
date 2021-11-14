import { useEffect, useState } from "react";
import Pokedex from "./Components/Pokedex/Pokedex";
import Party from './Components/Party/Party';
import Search from './Components/Search/Search';
import Card from './Components/Card/Card';
import Pages from "./Components/Pages/Pages";
import { pokemonServices } from "./Services/Pokemon.services";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [party, setParty] = useState([]);
  const [searchedPokemon, setSearchedPokemon] = useState(undefined);
  const [offset, setOffset] = useState(0);

  const nextPage = (value=20) => {
    setOffset(offset + 20);
  }

  /*const previousPage = () => {
    setOffset(offset - 20)
  }*/

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await pokemonServices.getAllPokemon(offset);
      setPokemons(response);
    };

    fetchPokemons();
  }, [offset]);

  const onAddToPartyHandler = (id) => {
    const pokemon = id ? pokemons.find(poke => { return poke.id === id }) : searchedPokemon;

    if(pokemon && party.length < 6) {
      const newParty = [...party, {...pokemon, partyId: `${pokemon.id}_${new Date().getTime() / 100}`}];
      setParty(newParty);
    }
  }

  const onDeleteInPartyHandler = (partyId) => {
    const newParty = party.filter(poke => { return poke.partyId !== partyId });
    setParty(newParty);
  }

  const onSearchHandler = async (name) => {
    const pokemon = await pokemonServices.getPokemon(name);
    setSearchedPokemon(pokemon);

    //setOffset(offset + 20);
  }

  return (
    <main className="p-8 flex flex-col justify-center items-center gap-8">
      <Party party={party} onDeleteInParty={onDeleteInPartyHandler}/>

      <Search onSearch={onSearchHandler} />
      { searchedPokemon && 
        <Card
          onAdd={()=> { onAddToPartyHandler() }}
          id={searchedPokemon.id}
          thumbnail= {searchedPokemon.thumbnail}
          abilities={searchedPokemon.abilities}
          types={searchedPokemon.types}
          name={searchedPokemon.name}/> }

      <Pokedex pokemons={pokemons} onAddToParty={ (id) => { onAddToPartyHandler(id) } } />
      <Pages OnPage={nextPage}/>
    </main>
  );
}

export default App;
