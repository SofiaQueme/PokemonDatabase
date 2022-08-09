import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Carta from "./Carta";
import background from  './img/backgroundtarjet.jpg';
import pokeball from  './img/pokeball.png';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import typepokemon from './img/typepokemon.png';

const Pokemon =({item,tpantalla,SearchPokemon})=>{

debugger
    const [pokemondetail, setpokemondetail]=useState('');
    const [pokemondetalle, setpokemondetalle] = useState('');
    const [evolucionpokemon, setevolucionpokemon]= useState('');
    let tamano = tpantalla/1.5;
    useEffect (()=>{
        debugger
        
        let pokemonstorage =  JSON.parse(localStorage.getItem('DetallePokemon'));
        
        if (typeof pokemonstorage ==='undefined' || pokemonstorage === ''){
          fetch(`https://pokeapi.co/api/v2/pokemon/${item[0].name}`)
          .then(response => response.json())
          .then(json => setpokemondetail(json));
           localStorage.setItem('DetallePokemon',JSON.stringify(pokemondetail));

           fetch(`https://pokeapi.co/api/v2/pokemon-species/${item[0].name}`)
          .then(response => response.json())
          .then(json => setpokemondetalle(json));
           localStorage.setItem('CaracteristicasPokemon',JSON.stringify(pokemondetalle));
        }
        else {
            if(pokemonstorage!=='' && typeof pokemonstorage !== 'undefined' && item !==''){
                if (pokemondetail===''  ||typeof pokemondetail==='undefined' || (pokemonstorage.name !== item[0].name)){
                    
                    fetch(`https://pokeapi.co/api/v2/pokemon/${item[0].name}`)
                    .then(response => response.json())
                    .then(json => setpokemondetail(json));
                    localStorage.removeItem("DetallePokemon");
                    localStorage.setItem('DetallePokemon',JSON.stringify(pokemondetail));

                    fetch(`https://pokeapi.co/api/v2/pokemon-species/${item[0].name}`)
                    .then(response => response.json())
                    .then(json => {
                        setpokemondetalle(json);
                        localStorage.removeItem("CaracteristicasPokemon");
                        localStorage.setItem("CaracteristicasPokemon",JSON.stringify(json));

                        fetch(`${json.evolution_chain.url}`)
                        .then(res => res.json())
                        .then(result => {
                            setevolucionpokemon(result);
                            localStorage.removeItem("EvolucionPokemon");
                            localStorage.setItem("EvolucionPokemon",JSON.stringify(result));
                        });
                        

                       });               
                    
                }
          }
          else {
            setpokemondetail('');
          }
        }
      },[pokemondetail]);

    return(
        <div style={{margin:'2%'}}>
            <Grid container spacing={3}  >
                <Grid item  xs={12} md={4} lg={4}  > 
                  <div style ={{padding:'15px', border: 'solid 2px ',borderRadius:'5px', backgroundImage:'url('+ background+')'}}>
                    <Card style={{border:'solid black 1px'}}>
                        <img src={`https://img.pokemondb.net/artwork/large/${item[0].name}.jpg`}
                        style = {{minHeight:'90%', maxHeight:'90%', minWidth:'90%', maxWidth:'90%' ,margin:'10px'}}
                        alt={item[0].name}
                        /> 
                        <CardContent>
                            <Typography gutterBottom variant="h3" component="div" style={{textAlign:'center'}}>
                             <strong> {item[0].name} </strong>
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                 </Grid>
                 <Grid item  xs={12} md={8} lg={8} >
                    <Grid container> 
                        <Grid item xs={12} md={4} lg={4}>
                            <strong>Abilities  </strong> 
                            {pokemondetail !=="" && typeof pokemondetail !=='undefined' ? 
                                pokemondetail.abilities.map((pokeitem)=>
                                <div style={{display:'block'}} key={pokeitem.ability.name}>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                          <Avatar alt="Remy Sharp" src={pokeball} style={{margin:'0px'}} />
                                     </ListItemAvatar>
                                     <strong> {pokeitem.ability.name} </strong>
                                     </ListItem>
                                     </List>
                                </div>
                                ): ""
                            }
                        </Grid>

                        <Grid item xs={12} md={4} lg={4} >
                            <strong>Pokemon Type  </strong> 
                            {pokemondetail !==""  && typeof pokemondetail !=='undefined' ? 
                                pokemondetail.types.map(type=>
                                    <div style={{display:'block'}} key={type.type.name}>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                          <Avatar alt="Remy Sharp" src={typepokemon} style={{margin:'0px'}} />
                                     </ListItemAvatar>
                                     <div style={{padding:'10px', margin:'5px', background:'#F4A43F', borderRadius:'5px'} }> 
                                        <strong> {type.type.name} </strong>
                                     </div>
                                     </ListItem>
                                     </List>
                                        </div>
                                ): ""
                            }
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} >
                           <strong> Details</strong>
                            {pokemondetalle !==""  && typeof pokemondetalle !=='undefined' ? 
                                    <p >{pokemondetalle.flavor_text_entries[0].flavor_text} </p>
                                : ""
                            }
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} >
                          <strong > Evolution</strong>
                          <div style ={{margin:"0%", padding:'8%'}}>
                          <Grid container  spacing={2} > 
                                    {evolucionpokemon !==""  && typeof evolucionpokemon !=='undefined' ? 
                                         <>
                                            {evolucionpokemon.chain.evolves_to.map(type=> 
                                                <Grid item xs={12} md={4} lg={4} key={type.species.name} >
                                                    <Carta  pokemon ={type.species} tpantalla={(tpantalla)} SearchPokemon={SearchPokemon}/>
                                                </Grid>
                                            )} 

                                            {evolucionpokemon.chain.evolves_to.map(type=> 
                                             <>
                                                {type.evolves_to.length>0?
                                                    type.evolves_to.map(p =>
                                                        <Grid item xs={12} md={4} lg={4} key={p.species.name} >
                                                            <Carta  pokemon ={p.species} tpantalla={(tpantalla)} SearchPokemon={SearchPokemon}/>
                                                      </Grid>
                                                   )
                                                :""}
                                             </>
                                            )}
                                            
                                        </>  
                                    : "" }
                            </Grid>
                            </div>
                        </Grid>
                        </Grid>
                 </Grid>
            </Grid>

        </div>
    )

}

export default Pokemon;