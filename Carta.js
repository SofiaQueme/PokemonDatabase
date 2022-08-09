import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Carta =({pokemon, tpantalla, SearchPokemon})=>{
  
  
return (
 
    <Card  
    style={{border:'solid black 1px'}}
    > 
    {typeof tpantalla !== 'undefined' &&  tpantalla !=='' && typeof pokemon!=='undefined' && pokemon !=='' ? 
      <img src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
        style = {{minHeight:(tpantalla.alto), maxHeight:(tpantalla.alto), minWidth:'90%', maxWidth:'90%' ,margin:'10px'}}
        alt={pokemon.name}
      /> : 
      ""
     } 
         
        
        <CardContent>
            <Typography gutterBottom  component="div" style={{textAlign:'center'}}>
             <strong>  {pokemon.name} </strong>
            </Typography>
          </CardContent>
          <CardActions>
             <Button variant="contained" color="success" size="small"  onClick={()=>SearchPokemon(pokemon.name)}>Ir a Pokedex</Button>
        </CardActions>

    </Card>
  
)


}

export default Carta; 