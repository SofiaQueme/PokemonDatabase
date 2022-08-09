import { useEffect, useState } from 'react';
import Header from "./Heade";
import List from './List';
import Pokemon from './Pokemon';

import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';

  

function App() {

  const [listaPokemon,setlistaPokemon] = useState([]);
  const [pokemon, setpokemon] = useState('');
  const [tpantalla, settpantalla] =useState({'alto':0, 'ancho':0});

  const SearchPokemon=(SearchPokemon)=>{
    
      if (SearchPokemon !==null &&  typeof SearchPokemon !=='undefined'){
        let detallepokemon = listaPokemon.filter(detail=> detail.name === SearchPokemon);
        if (detallepokemon.length>0){
          setpokemon(detallepokemon);
        }
        else {
          <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              No se encuentran resultados para el pokemon buscado, por favor intente con otra búsqueda
            </Alert>
        }
      }else{
        
          <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              No se encuentran resultados para el pokemon buscado, por favor intente con otra búsqueda
            </Alert>
        
      }
  }

  useEffect (()=>{

    let tamanopantalla = {'ancho':0, 'alto':0};
    let tamanoScreen =  JSON.parse(localStorage.getItem('TamanoScreen'));
    const wheight = window.screen.height;
    const wwidth = window.screen.width;
    
    if (tamanoScreen.ancho===0 && !tamanoScreen.alto===0 ){
      console.log('igual a cero')
      tamanopantalla.ancho =  wwidth/2;
      tamanopantalla.alto =  wheight/4;  
      localStorage.removeItem("TamanoScreen");
      localStorage.setItem('TamanoScreen',JSON.stringify(tamanopantalla))
      settpantalla(tamanopantalla);
      
    }
    else
     {
        let auxancho = 0; 
        auxancho =(wwidth/2);
        let auxalto = 0;
        auxalto =  (wheight/4);
        
        if ((tamanoScreen.ancho !== auxancho) || (tamanoScreen.alto !== auxalto)){
          tamanopantalla.alto = auxalto; 
          tamanopantalla.ancho= auxancho; 
          localStorage.removeItem("TamanoScreen");
          localStorage.setItem('TamanoScreen',JSON.stringify(tamanopantalla))
          settpantalla(tamanopantalla);
          
        }
      
         if((tamanoScreen.ancho === auxancho) && (tamanoScreen.alto === auxalto) ){
          tamanopantalla.alto = auxalto; 
          tamanopantalla.ancho= auxancho; 
          settpantalla(tamanopantalla);
        }
        
      }
    
    let pokemonlist =  JSON.parse(localStorage.getItem('ListaPokemons'));
    if (!pokemonlist.results && listaPokemon.length===0){
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=100`)
      .then(response => response.json())
      .then(json => setlistaPokemon(json));
      localStorage.setItem('ListaPokemons',JSON.stringify(listaPokemon));
    }
    else {
        if(pokemonlist.results.length>0 && listaPokemon.length===0 ){
        setlistaPokemon(pokemonlist.results);
      }
      
    }
  },[listaPokemon]);



  return (
    <div>
      <Header/>
      {pokemon? <Pokemon  item={pokemon} tpantalla={tpantalla} SearchPokemon={SearchPokemon}/>: 
        <List listaPokemon = {listaPokemon} tpantalla={tpantalla} SearchPokemon={SearchPokemon}/>
      }
    </div>
  );
}

export default App;
