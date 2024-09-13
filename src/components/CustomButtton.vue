<script setup lang="ts">
defineProps({
    text: {
        type: String,
        required: true
    },
    icon: {
        type: Object
    },
    isActive: {
        type: Boolean,
        default: true
    },
    textColor: {
        type: String,
        default: 'white'
    },
    fullWidth: {
        type: Boolean,
        default: false
    }
    
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}

</script>

<template>
     <button 
    @click="handleClick" 
    :class="[
            isActive ? `bg-[#F22539]` : 'bg-[#BFBFBF]',
            fullWidth ? 'w-full' : 'px-4',
            `hover:bg-[${isActive} ? '#C00E20' : '#BFBFBF']`,
            'text-white',
            'py-2 font-bold transition-colors duration-200 rounded-full',
            'focus:outline-none focus:ring-2 focus:ring-red-300'
        ]"
  >
    <span class="flex items-center justify-center">
      <component v-if="icon" :is="icon" class="mr-2" />
      {{ text }}
    </span>
  </button>
</template>