<script setup lang="ts">
import MaterialIconVue from '@/components/icon/MaterialIcon.vue'
import type { IListColumn } from '@/components/list/types'
import List from '@/components/list/List.vue'
import Badge from '@/components/badge/Badge.vue'
import ButtonInput from '@/components/inputs/button/ButtonInput.vue'
import TextInput from '@/components/inputs/text/TextInput.vue'
import type { ICustomer } from '@/services/types'
import CustomerService from '@/services/CustomerService'
import { ref, onMounted, computed } from 'vue'
import { currencyEnum } from '@/components/card/types'
import CardItem from '@/components/card/CardItem.vue'
import { usePageNameStore } from '@/stores/pageName'
import CustomerForm from './CustomerForm.vue'

const customer = ref<ICustomer[]>([])
const menuStore = usePageNameStore()
const loading = ref(true)

const showCustomerModal = ref(false)

const column: IListColumn<ICustomer>[] = [
  {
    id: 'name',
    name: 'Name',
    isSortable: true,
    width: 300,
    dataFiled: 'name'
  },
  {
    id: 'email',
    name: 'Email Address',
    isSortable: true,
    width: 200,
    dataFiled: 'email'
  },
  {
    id: 'phone',
    name: 'Phone Number',
    isSortable: true,
    width: 200,
    dataFiled: 'phoneNumber'
  },
  {
    id: 'type',
    name: 'Customer Type',
    isSortable: true,
    width: 200,
    dataFiled: 'customerType'
  },
  {
    id: 'action',
    name: 'Action',
    isSortable: true,
    width: 200,
    dataFiled: 'id',
    cell: true
  }
]

const myCardData1 = {
  title: 'All Customers',
  icon: '',
  currency: currencyEnum.NONE,
  amount: '0',
  itemCount: '5',
  itemPercentage: '80'
}

const pull = async () => {
  loading.value = true
  const data = await CustomerService.getAll()
  customer.value = data
  loading.value = false
}

onMounted(() => {
  menuStore.setPageName('All Customers')
  pull()
})

const close = () => {
  showCustomerModal.value = false
  pull()
}

const searchTerm = ref<string>('')

const updateSearchTerm = (newTerm: string) => {
  searchTerm.value = newTerm
}

const handleInput = (event: Event) => {
  const newTerm = (event.target as HTMLInputElement).value
  updateSearchTerm(newTerm)
}

const filteredCustomers = computed(() => {
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  return customer.value.filter((item) => item.name.toLowerCase().includes(lowerCaseSearchTerm))
})
</script>

<template>
  <div class="pb-10">
    <div
      class="h-[213px] hidden px-2 py-12 items-center justify-between bg-white rounded-[23px] mx-8 my-8"
    >
      <div class="flex gap-5">
        <CardItem :card="myCardData1" class="bg-[#EFFAE1]" />
      </div>
    </div>

    <div class="bg-white rounded-3xl py-5 px-8 mx-8 font-satoshi my-12">
      <div class="flex justify-between">
        <div>
          <p class="text-[#8E95AF] text-sm font-medium">All Customers</p>
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
            placeholder="Search by first name or last name"
            type="text"
            :onChange="console.log"
            @input="handleInput"
            class="w-[345px] h-[46px] me-3"
          />
        </div>

        <div class="flex">
          <ButtonInput
            class="h-[46px] w-[133px] text-[13px] me-3"
            :onClick="() => (showCustomerModal = true)"
          >
            New Customer
          </ButtonInput>
        </div>
      </div>

      <div>
        <List :loading="loading" :data="filteredCustomers" :columns="column" :pagination="true">
          <template #status="{}">
            <Badge class="success">
              <template v-slot:content> {{ 'active' }}</template>
            </Badge>
          </template>
          <template #action="{ id }">
            <div
              @click="console.log(id)"
              class="w-16 h-7 border rounded border-[#6A8BAA] flex justify-center items-center font-satoshi text-xs font-bold text-[#6A8BAA]"
            >
              View
            </div>
          </template>
        </List>
      </div>
      <CustomerForm :show="showCustomerModal" @closeModal="close" />
    </div>
  </div>
</template>
