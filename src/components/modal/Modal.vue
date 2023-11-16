<script setup lang="ts">
interface show {
  shows: boolean
  title?: string
  class?: string
  width?: string
}

const props = defineProps<show>()
</script>

<template>
  <!-- Main modal -->
  <div v-if="props.shows" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-black opacity-50" @click="$emit('closeModal')"></div>
    <div
      class="modal-container bg-white mx-auto max-h-full rounded-2xl shadow-lg z-50 overflow-y-auto"
      :class="[props.width ? width : 'w-1/2']"
    >
      <!-- Modal content -->
      <div class="rounded-lg shadow dark:bg-gray-700 modal-content py-8 text-left px-6">
        <!-- Modal header -->
        <div class="flex justify-between items-center pb-8 px-8">
          <p class="text-base font-bold text-[#204458]">{{ props.title }}</p>
          <span class="cursor-pointer z-50" @click="$emit('closeModal')"> &times; </span>
        </div>
        <!-- Modal body -->
        <div class="modal-body px-8 gap-8">
          <div :class="`${props.class}`">
            <slot name="content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
