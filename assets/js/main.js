const pokemonOl = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton")
const limit = 10
let offset = 0
let maxPokemon = 151




function convertPokemonToLi(pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">
        <ol class="types">
        ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        <img src="${pokemon.photo}" alt="Imagem ${pokemon.name}">
    </div>
    </li>`;
}

function loadPokemonItens(offset,limit){
    pokeApi.getPokemons(offset,limit).then(pokemons => {
        pokemonOl.innerHTML += pokemons.map(pokemon => convertPokemonToLi(pokemon)).join('');
    });        
}

loadPokemonItens(offset,limit)
loadMoreButton.addEventListener("click",()=>{
    offset+=limit; 
    const qtdPokemonNextPage = offset+limit
    if (qtdPokemonNextPage>= maxPokemon){
        const newLimit = maxPokemon-offset
        loadPokemonItens(offset,newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{

        loadPokemonItens(offset,limit)
    }
})