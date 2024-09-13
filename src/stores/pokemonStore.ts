import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getPokemonList, getPokemonDetails } from '@/api/pokemon'
import { capitalizeFirstLetter } from '@/utils/helpers'
import type { PokemonBasic, PokemonDetailed } from '@/types/pokemon'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemons = ref<PokemonBasic[]>([])
  const detailedPokemons = ref<PokemonDetailed[]>([])
  const favorites = ref<PokemonDetailed[]>([])
  const search = ref('')
  const loading = ref(false)
  const error = ref('')

  const filteredPokemons = computed(() => {
    return pokemons.value.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.value.toLowerCase())
    )
  })

  const filteredFavorites = computed(() => {
    return favorites.value.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.value.toLowerCase())
    )
  })

  async function fetchPokemons() {
    loading.value = true
    try {
      const pokemonList: PokemonBasic[] = await getPokemonList()
      pokemonList.forEach((pokemon) => {
        pokemon.id = Number(pokemon.url.split('/')[6])
        pokemon.name = capitalizeFirstLetter(pokemon.name)
      })
      pokemons.value = pokemonList
    } catch (err) {
      error.value = 'Error fetching Pokemon list'
    } finally {
      loading.value = false
    }
  }

  async function fetchPokemonDetails(pokemonName: string) {
    const pokemonNameSafe = pokemonName.toLowerCase()
    const existingPokemon = detailedPokemons.value.find((p) => p.name === pokemonNameSafe)
    if (existingPokemon) {
      return existingPokemon
    }

    const details = await getPokemonDetails(pokemonNameSafe)
    const detailedPokemon = {
      id: details.id,
      name: capitalizeFirstLetter(details.name),
      sprites: details.sprites,
      types: details.types.map((type) => ({
        type: {
          name: capitalizeFirstLetter(type.type.name)
        }
      })),
      weight: details.weight,
      height: details.height
    }

    detailedPokemons.value.push(detailedPokemon)
    return detailedPokemon
  }

  function addFavorite(pokemon: PokemonDetailed) {
    if (!favorites.value.some((fav) => fav.id === pokemon.id)) {
      favorites.value.push(pokemon)
    }
  }

  function removeFavorite(pokemonId: number) {
    favorites.value = favorites.value.filter((fav) => fav.id !== pokemonId)
  }

  function isFavorite(pokemonId: number) {
    return favorites.value.some((fav) => fav.id === pokemonId)
  }

  function setSearchQuery(newQuery: string) {
    search.value = newQuery
  }

  return {
    pokemons,
    detailedPokemons,
    favorites,
    search,
    loading,
    error,
    filteredPokemons,
    filteredFavorites,
    fetchPokemons,
    fetchPokemonDetails,
    addFavorite,
    removeFavorite,
    isFavorite,
    setSearchQuery
  }
})
