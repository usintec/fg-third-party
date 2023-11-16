<script setup lang="ts">
interface ITabItemProps {
  name: string
  selected: boolean
}

const props = defineProps<ITabItemProps>()
const emit = defineEmits<{
  (e: 'select'): void
}>()
</script>

<template>
  <div @click="emit('select')" class="flex flex-col justify-center items-center gap-5">
    <span
      :class="[
        props.selected
          ? 'bg-[#119AE7] rounded-full text-xs px-5 py-2 text-white font-medium'
          : ' font-medium text-xs text-[#20AFFF] px-2'
      ]"
      class="text-center text-lg font-satoshi cursor-pointer"
    >
      {{ props.name }}
    </span>
  </div>
</template>
