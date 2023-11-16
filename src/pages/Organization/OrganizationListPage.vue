<script setup lang="ts">
import OrganizationList from '@/components/organizations/OrganizationList.vue'
import { usePageNameStore } from '@/stores/pageName'
import { ref, watch } from 'vue'
import OrganizationForm from './OrganizationForm.vue'

const showForm = ref(false)

const menuStore = usePageNameStore()

watch(
  () => menuStore._goBack,
  () => {
    showForm.value = false
    menuStore.setPageName('Organization')
  }
)

const show = () => {
  showForm.value = true
  menuStore.setSubMenu('Create Organization')
}
</script>
<template>
  <div class="mt-9 px-9 w-full">
    <div class="w-full flex justify-between mb-6">
      <div class="flex flex-col">
        <span class="text-dark_green font-bold text-base">Organization List</span>
        <span class="text-[#4E8385] font-medium text-sm">List of organizations</span>
      </div>
    </div>
    <div v-if="!showForm" class="bg-white rounded-3xl flex flex-col p-6">
      <div class="flex justify-between mb-4">
        <span class="text-[#8E95AF] font-medium text-sm">All Organization</span>
        <div>
          <div
            class="text-sm font-bold rounded-lg bg-dark_green text-white py-3 px-6 cursor-pointer hover:scale-105"
            @click="show"
          >
            New Organization
          </div>
        </div>
      </div>
      <OrganizationList />
    </div>
    <OrganizationForm v-else />
  </div>
</template>
