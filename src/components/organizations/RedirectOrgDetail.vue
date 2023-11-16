<template>
  <div></div>
</template>

<script setup lang="ts">
import { useOrganizationStore } from '@/stores/organizationStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const orgStore = useOrganizationStore()
const userStore = useUserStore()

onMounted(() => {
  const orgId = orgStore?.organization?.organizationId
  router.push(`/organizations/detail/${orgId ?? userStore.user?.organizationId}`)
})
</script>
