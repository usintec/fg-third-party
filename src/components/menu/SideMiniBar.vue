<script setup lang="ts">
import { ref } from 'vue'
import MaterialIcon from '../icon/MaterialIcon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const menus = [
  {
    label: 'Dashboard',
    link: '/'
  },
  {
    label: 'Bill/Invoices',
    link: '/'
  },
  {
    label: 'Customers',
    link: '/customers'
  },
  {
    label: 'Settings',
    link: '/settings'
  }
]

const localStorage = () => {
  window.localStorage.clear()
  window.location.reload()
  onRouteClick(4)
}

const selected = ref(0)

const onRouteClick = (index: number) => {
  selected.value = index
  router.push(menus[index].link)
}
</script>
<template>
  <div class="bg-white rounded-lg flex flex-col px-6 py-5 w-44 gap-8">
    <div
      @click="() => onRouteClick(i)"
      v-for="(menu, i) of menus"
      :key="i"
      class="flex justify-between cursor-pointer text-sm"
      :class="[selected === i ? 'text-[#119AE7] font-bold ' : 'text-[#92A1C9] font-medium']"
    >
      <span>
        {{ menu.label }}
      </span>
      <MaterialIcon icon="chevron_right" />
    </div>
    <div
      @click="localStorage"
      class="flex justify-between cursor-pointer text-sm mt-7"
      :class="[selected === 4 ? 'text-[#119AE7] font-bold ' : 'text-[#92A1C9] font-medium']"
    >
      <span> Logout </span>
      <MaterialIcon icon="chevron_right" />
    </div>
  </div>
</template>
