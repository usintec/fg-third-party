<script setup lang="ts">
import dateFormat from 'dateformat'
import type { IListColumn } from '@/components/list/types'
import type { IOrganization } from '@/services/types'
import List from '@/components/list/List.vue'
import Badge from '@/components/badge/Badge.vue'
import { onMounted, ref } from 'vue'
import OrganizationService from '@/services/OrganizationService'
import { useRouter } from 'vue-router'
import { usePageNameStore } from '@/stores/pageName'
import { useOrganizationStore } from '@/stores/organizationStore'

const props = defineProps<{
  orgId?: string
}>()

const column: IListColumn<IOrganization>[] = [
  {
    id: 'createdAt',
    name: 'Created on',
    isSortable: true,
    dataFiled: 'createdOn',
    width: 200,
    cell: true
  },
  {
    id: 'code',
    name: 'Organization Code',
    isSortable: true,
    width: 200,
    dataFiled: 'organizationCode'
  },
  {
    id: 'OrganizationName',
    name: 'Organization Name',
    isSortable: true,
    width: 200,
    dataFiled: 'organizationName'
  },
  {
    id: 'organizationEmail',
    name: 'Organization Email',
    isSortable: true,
    width: 200,
    dataFiled: 'organizationEmail'
  },
  {
    id: 'status',
    name: 'Status',
    isSortable: true,
    width: 200,
    dataFiled: 'organizationStatus',
    cell: true
  },
  {
    id: 'action',
    name: 'Action',
    isSortable: true,
    width: 200,
    dataFiled: 'organizationStatus',
    cell: true
  }
]

const data = ref<IOrganization[]>([])
const loading = ref(true)

const pageName = usePageNameStore()
const orgStore = useOrganizationStore()

const router = useRouter()

const goDetail = (id: string) => {
  const org = data.value.find((org) => org.organizationId === id)
  if (org) {
    orgStore.setOrganization(org)
    pageName.setSubMenu('Organization Detail')
    router.push(`/organizations/detail/${id}`)
  }
}

onMounted(async () => {
  const api = props.orgId
    ? OrganizationService.getAllSubOrganizations(props.orgId)
    : OrganizationService.getAll()

  const res = await api
  data.value = res
  loading.value = false
})
</script>
<template>
  <div>
    <List :data="data" :columns="column" :pagination="true" :loading="loading">
      <template #status="{ id }">
        <Badge class="success">
          <template v-slot:content> <span @click="() => console.log(id)"> Active </span> </template>
        </Badge>
      </template>
      <template #action="{ organizationId }">
        <div
          @click="goDetail(organizationId)"
          class="w-16 h-7 border pointer-cursor hover:scale-105 rounded border-[#6A8BAA] flex justify-center items-center font-satoshi text-xs font-bold text-[#6A8BAA]"
        >
          View
        </div>
      </template>
      <template #createdAt="{ createdOn }">
        {{ dateFormat(createdOn, 'dd mmm, yyyy') }}
      </template>
    </List>
  </div>
</template>
