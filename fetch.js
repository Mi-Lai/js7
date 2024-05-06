// Fetch
// POST

const BASE_URL = 'https://pokeapi.co/api/v2/';
// Fetch no async

/*fetch(BASE_URL + 'pokemon/ditto')
    .then(res => res.json())
    .then(data => console.log(data));
*/
// fetch async
//PRIMERO QUEREMOS OBTENER LOS DATOS DEL POKEMON
const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}
// Manipular el DOM y agregar una tarjeta del pokemon.
// Función para agregar una tarjeta de Pokémon al DOM
const addPokemonCard = (pokemon) => {
    console.log("Adding Pokemon card:", pokemon);
    // Crear elementos HTML para la tarjeta del Pokémon
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('pokemon-card');
    //nombre del pokemon
    const nameElement = document.createElement('h2');
    nameElement.textContent = pokemon.name;
    //imagen del pokemon
    const imageElement = document.createElement('img');
    imageElement.src = pokemon.sprites.front_default;
    imageElement.alt = pokemon.name;
    //tipo del pokemon
    const typeElement = document.createElement('p');
    typeElement.textContent = `Type: ${pokemon.types.map(type => type.type.name).join(', ')}`;
    //peso del pokemon
    const weightElement = document.createElement('p');
    weightElement.textContent = `Weight: ${pokemon.weight} kg`;
    weightElement.classList.add('pokemon-weight');
    // ID del Pokémon
    const idElement = document.createElement('p');
    idElement.textContent = `ID: ${pokemon.id}`;
    idElement.classList.add('pokemon-id');

    // Agregar elementos al contenedor de la tarjeta
    cardContainer.appendChild(nameElement);
    cardContainer.appendChild(imageElement);
    cardContainer.appendChild(typeElement);
    cardContainer.appendChild(weightElement);
    cardContainer.appendChild(idElement);

    // Obtener el contenedor donde se agregarán las tarjetas de Pokémon
    const pokemonContainer = document.getElementById('pokemon-container');

    // Agregar la tarjeta del Pokémon al contenedor en el DOM
    pokemonContainer.appendChild(cardContainer);
}


// Obtener NOMBRE DEL POKEMON Y GUARDAR EN LOCAL_STORAGE
document.getElementById('get-btn').addEventListener('click', async () => {
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        localStorage.setItem('currentPokeName', pokemon.name);
        console.log(pokemon.name);
    //agregamos la tarjeta al DOM
addPokemonCard(pokemon);
});
//OBTENER EL POKEMON  cargar la pagina
document.addEventListener('DOMContentLoaded', async () => {
    const storedName= localStorage.getItem('currentPokeName');
    const initialName= storedName ? storedName: 'ditto'; // si no hay nada que salga 1 //parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialName);
    console.log(pokemon.name);
    addPokemonCard(pokemon); //agregar tarjeta
});

// obtener el anterior POKEMON
document.getElementById('previous-btn').addEventListener('click', async () => {
    const currentPokeName = localStorage.getItem('currentPokeName');
    const response = await fetch(`${BASE_URL}pokemon/${currentPokeName}`);
    if (!response.ok) {
        console.error('Network response was not ok');
        return;
    }
    const pokemon = await response.json();
    const previousPokemonId = Math.max(1, pokemon.id - 1); //declaramos el pokemonId anterior
    const previousPokemon = await fetchPokemon(previousPokemonId);
    localStorage.setItem('currentPokeName', previousPokemon.name);
    console.log(previousPokemon.name);
    addPokemonCard(previousPokemon);
});

// obtener el siguiente pokemon

document.getElementById('previous-btn').addEventListener('click', async () => {
        const currentPokeName = localStorage.getItem('currentPokeName');
        const response = await fetch(`${BASE_URL}pokemon/${currentPokeName}`);
       // const newId = Math.max(1, currentPokeId +1);
       const pokemon= await response.json();
       const nextPokemonId = pokemon.id + 1; //obtiene el siguiente pokemon
        const nextPokemon = await fetchPokemon(nextPokemonId); //lo pone aquí
        localStorage.setItem('currentPokeName', nextPokemon.name); //lo guarda en localStoroge
        console.log(nextPokemon.name); // imprime el pokemon
       //const pokemon = await fetchPokemon(newId);
       addPokemonCard(nextPokemon);
    });

document.getElementById('next-btn') .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = currentPokeId + 1;
        const pokemon = await fetchPokemon(newId);
        console.log(pokemon);
    })



////////////////// POST
//

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'title1',
        body: 'Lorem ipsum dolor sit amet',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
}).then(res => res.json())
    .then(json => console.log(json))







// - El tamaño e info de la tarjeta es a consideración personal.
// - La tarjeta debe mantenerse en la pantalla.
// - La info -> LocalStorage -> Fetch
