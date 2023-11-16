<script setup lang="ts">
import MaterialIcon from '../icon/MaterialIcon.vue'
import eto from '@/assets/eto.svg'

const menuItems = [
  {
    text: 'Customer Portal',
    icon: 'account_circle'
  },
  {
    text: 'Shipping Position',
    icon: 'fast_forward'
  },
  {
    text: 'Public Tender',
    icon: 'description'
  },
  {
    text: 'Process ETO',
    icon: 'ETO',
    img: 'eto.png'
  }
]
</script>
<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col uppercase font-dm-sans text-white">
      <span class="text-xl font-medium letter-3">Nigerian</span>
      <span class="font-black text-7xl">ports</span>
      <span class="text-xl font-medium letter-3">authority</span>
    </div>
    <div class="flex gap-8">
      <div v-for="item of menuItems" :key="item.text" class="flex flex-col gap-2">
        <div
          class="flex items-center justify-center w-12 h-12 bg-[#E6F2FD] bg-opacity-25 rounded-md"
        >
          <img v-if="item.img" :src="eto" />
          <MaterialIcon v-else class="text-white" outline :icon="item.icon" />
        </div>
        <span class="text-white text-xs break-words w-14 text-center font-medium">{{
          item.text
        }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.letter-3 {
  letter-spacing: 3.4px;
}
</style>
