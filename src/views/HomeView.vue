<script setup lang="ts">
import PicachuSvg from '@/components/svg/PicachuSvg.vue'
import CustomButton from '@/components/CustomButtton.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const gotoToPokemeonList = () => {
  router.push({ name: 'pokemons-list' })
}
</script>

<template>
  <main class="flex flex-col items-center justify-center min-h-screen p-4">
    <div class="w-full max-w-xl p-8 text-center md:flex md:flex-col md:items-center">
      <div class="flex justify-center mb-6">
        <PicachuSvg class="mx-auto" />
      </div>
      <h1 class="mb-2 text-2xl font-bold text-[#353535]">Welcome to Pokédex</h1>
      <p class="mb-6 text-lg text-[#5E5E5E] md:text-base">
        The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.
      </p>
      <CustomButton text="Get started" @click="gotoToPokemeonList"/>
    </div>
  </main>
</template>
