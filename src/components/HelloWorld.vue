<script setup lang="ts">
const props = defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div class="text-3xl">
      <h1 class="text-green-500">{{ props.msg }}</h1>
      <h3 class="text-xl font-medium relative text-white">
        You’ve successfully created a project with
        <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      </h3>
    </div>
  </div>
</template>
