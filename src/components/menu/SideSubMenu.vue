<script setup lang="ts">
import { useRouter } from 'vue-router'
import MaterialIcon from '../icon/MaterialIcon.vue'
import type { IMenu } from './types'
import { ref } from 'vue'
import { usePageNameStore } from '@/stores/pageName'

interface ISubMenuProps {
  parent: IMenu
  subMenu: string[]
}
const menuStore = usePageNameStore()

const props = defineProps<ISubMenuProps>()
const selected = ref<string>(props.subMenu[0])

const router = useRouter()

const onSelect = (menu: string) => {
  selected.value = menu
  menuStore.setPageName(menu)
  menuStore.turnOffSubMenu()
  router.push({
    path: `${props.parent.link}/${menu.toLowerCase().replace(' ', '-')}`
  })
}
</script>
<template>
  <div class="flex text-sm border-l border-[#315468] w-[70%] overflow-hidden h-[90vh] px-6 py-4">
    <div class="flex flex-col w-full gap-8">
      <div class="flex justify-between pb-1">
        <div class="text-[#709AB0]">{{ props.parent.label }}</div>
        <MaterialIcon outline class="text-white" icon="close" :size="24" />
      </div>
      <div
        @click="onSelect(menu)"
        v-for="menu of subMenu"
        :key="menu"
        class="flex justify-between cursor-pointer hover:scale-105"
      >
        <div
          :class="{
            'text-white font-bold': selected === menu,
            'text-custom_mint': selected !== menu
          }"
          class=""
        >
          {{ menu }}
        </div>
        <MaterialIcon
          outline
          :class="{
            'text-white': selected === menu,
            'text-custom_mint': selected !== menu
          }"
          icon="keyboard_arrow_right"
          :size="24"
        />
      </div>
    </div>
  </div>
</template>
