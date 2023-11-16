<script setup lang="ts">
import MaterialIconVue from '../icon/MaterialIcon.vue'
import type { IListColumn } from '../list/types'
import List from '../list/List.vue'
import Badge from '../badge/Badge.vue'
import ButtonInput from '../inputs/button/ButtonInput.vue'
import TextInput from '../inputs/text/TextInput.vue'
import SelectInput from '../inputs/select/SelectInput.vue'
import type { IBill } from '@/services/types'
import BillService from '@/services/BillService'
import { ref, onMounted } from 'vue'
import { usePageNameStore } from '@/stores/pageName'
import { useRouter } from 'vue-router'
import { useBillStore } from '@/stores/billStore'
import { useCreateBillStore } from '@/stores/createBillStore'
import dateFormat from 'dateformat'

const loading = ref(true)
const bill = ref<IBill[]>([])
const filteredBills = ref<IBill[]>([])
const menuStore = usePageNameStore()
const billStore = useBillStore()
const createBillStore = useCreateBillStore()

const router = useRouter()
const selectedValue = ref('')
const filterData = ref([
  { id: '1', status: 'Paid' },
  { id: '2', status: 'Unpaid' },
  { id: '3', status: 'Draft' }
])
const column: IListColumn<IBill>[] = [
  {
    id: 'ref',
    name: 'Bill Number',
    isSortable: true,
    width: 200,
    dataFiled: 'billNumber'
  },
  {
    id: 'dueDate',
    name: 'Due Date',
    isSortable: true,
    width: 300,
    dataFiled: 'dueDate',
    cell: true
  },
  {
    id: 'customer',
    name: 'Customer',
    isSortable: true,
    width: 200,
    dataFiled: 'customerName'
  },
  {
    id: 'customerPhoneNumber',
    name: 'Customer Phone',
    isSortable: true,
    width: 200,
    dataFiled: 'customerPhoneNumber'
  },
  {
    id: 'createdOn',
    name: 'Created On',
    isSortable: true,
    width: 200,
    dataFiled: 'customerId',
    cell: true
  },
  {
    id: 'invoiceCount',
    name: 'Invoices',
    isSortable: true,
    width: 200,
    dataFiled: 'invoiceCount',
    cell: true
  },
  {
    id: 'status',
    name: 'Status',
    isSortable: true,
    width: 200,
    dataFiled: 'billId',
    cell: true
  }
]

onMounted(async () => {
  menuStore.setPageName('All Bill Items')
  menuStore.turnOffSubMenu()
  const bills = await BillService.getAll()
  bill.value = bills
  filteredBills.value = bills
  loading.value = false
})

const pushCreate = () => {
  createBillStore.clear()
  router.push('/bills/create-bill')
}

const goToInvoices = (id: string) => {
  billStore.setDetailBill(id)
  router.push(`/bills/${id}/invoices`)
}

const onFilter = (v: string) => {
  const _bill = bill.value.filter((bill) => {
    return (
      bill.billNumber.toLowerCase().includes(v.toLowerCase()) ||
      bill.customerName?.toLowerCase().includes(v.toLowerCase())
    )
  })
  filteredBills.value = _bill
}

const onFilters = (v: string) => {
  const matchingStatuses = filterData.value.filter((statusData) => {
    return statusData.status?.toLowerCase().includes(v.toLowerCase())
  })

  if (matchingStatuses.length === 0) {
    filteredBills.value = []
    return
  }

  const matchingStatus = matchingStatuses[0].status

  const _bill = bill.value.filter((bill) => {
    return bill.status?.toLowerCase() === matchingStatus.toLowerCase()
  })

  filteredBills.value = _bill
}
</script>

<template>
  <div class="pb-10">
    <div class="bg-white rounded-3xl py-5 px-8 mx-8 my-12">
      <div class="flex justify-between">
        <div>
          <p class="text-[#8E95AF] text-sm font-medium">All Bills Items</p>
        </div>
        <div>
          <span class="pe-3">
            <MaterialIconVue icon="menu" class="text-lg" />
          </span>
          <span class="">
            <MaterialIconVue icon="grid_view" class="text-lg" />
          </span>
        </div>
      </div>

      <div class="flex justify-between mt-3">
        <div class="flex">
          <TextInput
            label=""
            placeholder="Search by name or Bill Number"
            type="text"
            :onChange="onFilter"
            class="w-[345px] h-[46px] me-3"
          />

          <SelectInput
            label=""
            :onChange="onFilters"
            :selected="selectedValue"
            value="status"
            :name="['status']"
            :items="filterData"
            class="w-[120px] h-[44px]"
          />
        </div>

        <div class="flex w-1/4">
          <ButtonInput class="h-[46px] text-[13px] me-3" :onClick="pushCreate">
            New Bill
          </ButtonInput>

          <ButtonInput
            class="text-xs font-bold h-[46px] w-[133px] text-[13px] bg-color me-3"
            :onClick="console.log"
          >
            Export
          </ButtonInput>
        </div>
      </div>

      <div>
        <List
          @onRowClick="((item: IBill) => goToInvoices(item.id))"
          :data="filteredBills"
          :columns="column"
          :pagination="true"
          :loading="loading"
        >
          <template #status="{ status }">
            <Badge :class="status === 'Unpaid' ? 'warning' : 'success'">
              <template v-slot:content> {{ status }}</template>
            </Badge>
          </template>
          <template #dueDate="{ dueDate }">
            {{ dateFormat(dueDate, 'dd/mm/yy') }}
          </template>
          <template #createdOn="{ createdOn }">
            {{ dateFormat(createdOn.split('T')[0], 'dd/mm/yy') }}
          </template>
          <template #invoiceCount="{ invoiceCount, id }">
            <div
              @click="() => goToInvoices(id)"
              class="w-20 cursor-pointer hover:text-dark_green h-7 border rounded border-[#6A8BAA] flex justify-center items-center font-satoshi text-xs font-bold text-[#6A8BAA]"
            >
              {{ invoiceCount }} {{ invoiceCount === 1 ? 'Invoice' : 'Invoices' }}
            </div>
          </template>
        </List>
      </div>
    </div>
  </div>
</template>
