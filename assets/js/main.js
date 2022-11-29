const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const fButton = document.getElementById('fButton')
const popup = document.getElementById('popup')
const cbButtons = document.querySelectorAll('#cbButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

fButton.addEventListener('click', () => {
    fButton.style.display = "none"
    popup.style.display = "flex"
})

cbButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        var filter = pokemonList.getElementsByClassName(`pokemon ${button.className}`)
        var list = pokemonList.getElementsByTagName('li')[0]
        for (i = 0; i < filter.length; i++) {
            filter[i].parentNode.insertBefore(filter[i], list)
        }
        popup.style.display = "none"
        fButton.style.display = "flex"
    })
})