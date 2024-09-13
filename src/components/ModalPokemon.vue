<script setup lang="ts">
import {  computed } from 'vue';
import type { PokemonDetailed } from '@/types/pokemon';
import { usePokemonStore } from '@/stores/pokemonStore';
import CustomButton from './CustomButtton.vue';
import FavoriteStarContainedIcon from './svg/FavoriteStarContainedIcon.vue';
import LoadingPokemon from './LoadingPokemon.vue';
import CloseModal from './svg/CloseModal.vue';

const props = defineProps<{ pokemon: PokemonDetailed }>();

const emit = defineEmits(['close']);

const pokemonStore = usePokemonStore();

const isFavorite = computed(() => {
    return pokemonStore.isFavorite(props.pokemon.id);
});

const toggleFavorite = () => {
    if (pokemonStore.isFavorite(props.pokemon.id)) {
        pokemonStore.removeFavorite(props.pokemon.id);
    } else {
        pokemonStore.addFavorite(props.pokemon);
    }
};

const handleShare = () => {
    const pokemonDetails = `Name: ${props.pokemon.name}, Weight: ${props.pokemon.weight}, Height: ${props.pokemon.height}, Types: ${props.pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}`;
    navigator.clipboard.writeText(pokemonDetails).then(() => {
        console.log('Pokemon details copied to clipboard:', pokemonDetails);
    }).catch(err => {
        console.error('Failed to copy text:', err);
    });
}
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65">
        <div class="relative w-11/12 max-w-[570px] min-h-[506px] bg-white rounded-lg">
            <div v-if="pokemonStore.loading" class="absolute inset-0 flex items-center justify-center">
                <LoadingPokemon />
            </div>
            <div v-else>
                <button @click="emit('close')" class="absolute top-3.5 right-2.5 z-10">
                    <CloseModal />
                </button>
                <div class="relative h-[220px] rounded-t-lg overflow-hidden">
                    <div class="w-full h-full">
                        <img src="../assets/images/background-image-modal.png" alt="Background"
                            class="object-cover w-full h-full rounded-t-lg" />
                    </div>
                    <img :src="pokemon.sprites.other['official-artwork'].front_default" :alt="pokemon.name"
                        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px]" />
                </div>
                <div class="px-7 py-2.5">
                    <ul class="p-0 m-0 list-none">
                        <li class="font-lato text-lg font-bold text-[#5E5E5E]  border-b border-[#E8E8E8] py-2.5">
                            <span>Name: {{ pokemon.name }}</span>
                        </li>
                        <li class="font-lato text-lg font-bold text-[#5E5E5E]  border-b border-[#E8E8E8] py-2.5">
                            <span> Weight: {{ pokemon.weight }} </span>
                        </li>
                        <li class="font-lato text-lg font-bold text-[#5E5E5E]  border-b border-[#E8E8E8] py-2.5">
                            <span> Height: {{ pokemon.height }} </span>
                        </li>
                        <li class="font-lato text-lg font-bold text-[#5E5E5E]  border-b border-[#E8E8E8] py-2.5">
                            <span>Types: {{ pokemon.types.map(typeInfo => typeInfo.type.name).join(', ') }} </span>
                        </li>
                    </ul>
                </div>
                <div class="flex items-center justify-between px-7">
                    <div>
                        <CustomButton @click="handleShare" text="Share to my friends" />
                    </div>
                    <div class="cursor-pointer" @click="toggleFavorite()">
                        <FavoriteStarContainedIcon :starFill="isFavorite ? '#ECA539' : '#BFBFBF'" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
