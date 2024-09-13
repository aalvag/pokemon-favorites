<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { usePokemonStore } from '@/stores/pokemonStore';
import CustomButton from '../components/CustomButtton.vue';
import FavoriteStarIcon from '@/components/svg/FavoriteStarIcon.vue';
import FavoriteStarContainedIcon from '@/components/svg/FavoriteStarContainedIcon.vue';
import LoadingPokemon from '@/components/LoadingPokemon.vue';
import MagnifierIcon from '@/components/svg/MagnifierIcon.vue';
import MenuListIcon from '@/components/svg/MenuListIcon.vue';
import type { PokemonBasic, PokemonDetailed } from '@/types/pokemon';
import ModalPokemon from '@/components/ModalPokemon.vue';

const pokemonStore = usePokemonStore();
const searchQuery = ref('');
const showFavorites = ref(false);
const selectedPokemon = ref<PokemonDetailed | null>(null);

onMounted(async () => {
  await pokemonStore.fetchPokemons();
});

const filteredPokemons = computed(() => {
  if (showFavorites.value) {
    return pokemonStore.filteredFavorites;
  }
  return pokemonStore.filteredPokemons;
});

const updateSearchQuery = (newQuery: Event) => {
  const target = newQuery.target as HTMLInputElement;
  searchQuery.value = target.value;
  pokemonStore.setSearchQuery(target.value);
};

const toggleFavorite = (pokemon: PokemonBasic) => {
  if (pokemonStore.isFavorite(pokemon.id)) {
    pokemonStore.removeFavorite(pokemon.id);
  } else {
    pokemonStore.addFavorite(pokemon);
  }
};

const toggleView = (showFav: boolean) => {
  showFavorites.value = showFav;
};

const selectPokemon = async (pokemon: PokemonBasic) => {
  selectedPokemon.value = await pokemonStore.fetchPokemonDetails(pokemon.name);
};

const closeModal = () => {
  selectedPokemon.value = null;
};

const goBackHome = () => {
  searchQuery.value = '';
  pokemonStore.setSearchQuery('');
  showFavorites.value = false;
};

</script>

<template>
  <div>
    <LoadingPokemon v-if="pokemonStore.loading" class="fixed inset-0 z-50 flex items-center justify-center" />
    <div v-else class="relative flex flex-col min-h-screen">
      <div class="relative flex justify-center flex-grow pt-4 overflow-hidden">
        <div class="w-full max-w-[570px] sm:max-w-[315px] md:max-w-[570px] flex flex-col h-full">
          <div class="p-4">
            <div class="relative mb-4">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifierIcon />
              </div>
              <input type="text" placeholder="Search" v-model="searchQuery" @input="updateSearchQuery"
                class="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
            </div>
          </div>
          <div class="flex-grow px-4 pb-4 overflow-y-auto">
            <ul v-if="filteredPokemons.length > 0" class="space-y-2">
              <li v-for="pokemon in filteredPokemons" :key="pokemon.id" @click="selectPokemon(pokemon)"
                class="flex items-center justify-between p-2 bg-white rounded-md shadow cursor-pointer">
                <span class="text-xl">{{ pokemon.name }}</span>
                <button @click.stop="toggleFavorite(pokemon)" class="focus:outline-none">
                  <FavoriteStarContainedIcon :starFill="pokemonStore.isFavorite(pokemon.id) ? '#ECA539' : '#BFBFBF'" />
                </button>
              </li>
            </ul>
            <div v-else class="text-center">
              <p class="mb-4 text-4xl font-bold">Uh-oh!</p>
              <p class="mb-4 text-xl font-medium" > You lost on your journey</p>
              <CustomButton text="Go back home" @click="goBackHome"/>
            </div>
          </div>
        </div>
      </div>
      <div v-if="filteredPokemons.length > 0" class="fixed bottom-0 left-0 w-full bg-white shadow-lg">
        <div class="max-w-[570px] sm:max-w-[315px] md:max-w-[570px] mx-auto p-4">
          <div class="flex space-x-2">
            <CustomButton text="All" :icon="MenuListIcon" :isActive="!showFavorites" @click="toggleView(false)" :fullWidth="true" />
            <CustomButton text="Favorites" :icon="FavoriteStarIcon" :isActive="showFavorites" @click="toggleView(true)" :fullWidth="true" />  
          </div>
        </div>
      </div>
      <ModalPokemon v-if="selectedPokemon" :pokemon="selectedPokemon" @close="closeModal" />
    </div>
  </div>
</template>
