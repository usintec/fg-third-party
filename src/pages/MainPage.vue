<script setup lang="ts">
import SideMiniBar from '@/components/menu/SideMiniBar.vue'
import TopMenu from '@/components/menu/TopMenu.vue'
</script>

<template>
  <header class="w-full h-screen flex items-center">
    <!-- <SideBar /> -->
    <div class="h-full bg-[#EEF3FF] w-full flex flex-col">
      <TopMenu />
      <div class="h-full flex my-16 mx-20 overflow-scroll">
        <div>
          <SideMiniBar />
        </div>
        <div class="h-full w-full overflow-scroll">
          <RouterView />
        </div>
      </div>
    </div>
  </header>
</template>
