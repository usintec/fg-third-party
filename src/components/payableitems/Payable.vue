<script setup lang="ts">
import ButtonInput from '../inputs/button/ButtonInput.vue'
import MaterialIconVue from '../icon/MaterialIcon.vue'
import TextInput from '../inputs/text/TextInput.vue'
import SelectInput from '../inputs/select/SelectInput.vue'
import CardItem from '../card/CardItem.vue'
import { currencyEnum } from '../card/types'
import { onMounted, ref } from 'vue'
import { usePageNameStore } from '@/stores/pageName'
import { useRouter } from 'vue-router'
import type { PayableItemModel } from '@/services/types'
import type { IListColumn } from '../list/types'
import List from '../list/List.vue'
import PayableItemService from '@/services/PayableService'
import Badge from '../badge/Badge.vue'
import { useOrganizationStore } from '@/stores/organizationStore'
import PayableItemActivation from './PayableItemActivation.vue'

interface status {
  payableItemId: string
  status: boolean
}
const selectedValue = ref('')
const peopleData = ref([{ id: '1', firstName: 'GIFMIS' }])
const menuStore = usePageNameStore()
const loading = ref(false)

const router = useRouter()

const column: IListColumn<PayableItemModel>[] = [
  {
    id: 'GIFIMS',
    name: 'GIFIMS Code',
    isSortable: true,
    dataFiled: 'gifmisCode',
    width: 200
  },
  {
    id: 'code',
    name: 'Item Code',
    isSortable: true,
    width: 200,
    dataFiled: 'code'
  },
  {
    id: 'payableItem',
    name: 'Payable Item Name',
    isSortable: true,
    width: 200,
    dataFiled: 'name'
  },
  {
    id: 'currency',
    name: 'Currency',
    isSortable: true,
    width: 200,
    dataFiled: 'currencyCode'
  },
  {
    id: 'price',
    name: 'Price',
    isSortable: true,
    width: 200,
    dataFiled: 'price',
    cell: true
  },
  {
    id: 'status',
    name: 'Status',
    isSortable: false,
    width: 200,
    dataFiled: 'isLocked',
    cell: true
  },
  {
    id: 'action',
    name: 'Action',
    isSortable: true,
    width: 200,
    dataFiled: 'payableItemId',
    cell: true
  }
]

const data = ref<PayableItemModel[]>([])

const myCardData = {
  title: 'All Collections',
  icon: '',
  currency: currencyEnum.NGN,
  amount: '1000',
  itemCount: '5',
  itemPercentage: '80'
}

const myCardData1 = {
  title: 'Payable Items',
  icon: '',
  currency: currencyEnum.NONE,
  amount: '0',
  itemCount: '5',
  itemPercentage: '80'
}
const orgStore = useOrganizationStore()

const goToCreate = () => {
  menuStore.setSubMenu('Create Payable Item')
  router.push('payable-items/create')
}

const goToDetail = (id: string, organizationId: string = orgStore.fg_id ?? '') => {
  router.push({ path: 'payable-items/details', query: { id: id, organizationId: organizationId } })
}

onMounted(async () => {
  const res = await PayableItemService.getAll(orgStore.fg_id ?? '')
  data.value = res
})
const itemStatusCallBack = (payableItemStatus: status) => {
  data.value.forEach((item) => {
    if (item.payableItemId == payableItemStatus.payableItemId) {
      item.isLocked = payableItemStatus.status
    }
  })
}
</script>

<template>
  <div class="pb-10">
    <div
      class="h-[213px] flex px-2 py-12 items-center justify-between bg-white rounded-[23px] mx-8 my-8"
    >
      <div class="flex gap-5">
        <CardItem :card="myCardData" />

        <CardItem :card="myCardData1" class="bg-[#E1E1FA]" />
      </div>
    </div>

    <div class="bg-white rounded-3xl py-5 px-8 mx-8 font-satoshi">
      <div class="flex justify-between">
        <div>
          <p class="text-[#8E95AF] text-sm font-medium">All Payable Items</p>
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
            placeholder="Search by name"
            type="text"
            :onChange="console.log"
            class="w-[345px] h-[46px] me-3"
          />

          <SelectInput
            label=""
            :onChange="console.log"
            :selected="selectedValue"
            value="id"
            :name="['firstName', 'lastName']"
            :items="peopleData"
            class="w-[120px] h-[44px]"
            noPadding
          ></SelectInput>
        </div>

        <div class="flex">
          <ButtonInput
            class="text-xs font-bold w-[200px] h-[46px] bg-[#204458] me-3"
            :onClick="goToCreate"
          >
            New Payable Item
          </ButtonInput>
        </div>
      </div>

      <div>
        <List :data="data" :columns="column" :pagination="true" :loading="loading">
          <template #status="{ isLocked, payableItemId }">
            <Badge class="success">
              <template v-slot:content>
                <PayableItemActivation
                  class="hover:scale-105 cursor-pointer"
                  :isLocked="isLocked"
                  :organizationId="orgStore.fg_id"
                  :payableItemId="payableItemId"
                  @statusUpdated="itemStatusCallBack"
                >
                </PayableItemActivation>
              </template>
            </Badge>
          </template>
          <template #price="{ price, priceRange }">
            <div v-if="price">{{ `${price}` }}</div>
            <div v-else-if="priceRange">
              {{ `${priceRange.min} - ${priceRange.max}` }}
            </div>
          </template>
          <template #action="{ payableItemId }">
            <div
              @click="() => goToDetail(payableItemId)"
              class="w-16 h-7 border pointer-cursor hover:scale-105 rounded border-[#6A8BAA] flex justify-center items-center font-satoshi text-xs font-bold text-[#6A8BAA]"
            >
              View
            </div>
          </template>
        </List>
      </div>
    </div>
  </div>
</template>
