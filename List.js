import { useEffect, useState } from 'react';
import Carta from './Carta';
import Grid from '@mui/material/Grid';
import background from  './img/backgroundtarjet.jpg';


const List =({listaPokemon,tpantalla, SearchPokemon})=>{

        return (
            <Grid container spacing={3} > 
                {listaPokemon.length>0? 
                    listaPokemon.map((pokemon)=>
                    tpantalla.alto>0 && tpantalla.ancho>0?
                   
                        <Grid item  xs={12} md={3} lg={3}> 
                              <div style ={{padding:'10px', border: 'solid 2px ', backgroundImage:'url('+ background+')'}}>
                                <Carta pokemon={pokemon} key={pokemon.name} tpantalla={tpantalla} SearchPokemon={SearchPokemon}/>
                                </div>
                        </Grid>
                     
                    : <p key={pokemon.name}>cargando...</p>
                    ) : "" 
                   
                }
            </Grid>
           

        )

}

export default List;