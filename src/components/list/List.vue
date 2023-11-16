<script setup lang="ts" generic="T extends Record<string, any>">
import { reactive, computed } from 'vue'
import type { IListColumn, IListState } from './types'
import MaterialIconVue from '@/components/icon/MaterialIcon.vue'
import CheckBox from '@/components/inputs/check/CheckBox.vue'
import SelectInput from '@/components/inputs/select/SelectInput.vue'
import Pagination from './Pagination.vue'
import SpinnerComponent from '../loader/SpinnerComponent.vue'

const defaultPages = [5, 10, 15, 20, 30]

const props = defineProps<{
  columns: IListColumn<T>[]
  data: T[]
  pagination: boolean
  perPage?: number[]
  loading?: boolean
}>()

defineEmits<{
  (e: 'onRowClick', row: T, index: number): void
}>()

const state = reactive<IListState<T>>({
  page: 1,
  perPage: 5,
  totalPage: 0,
  data: props.data
})

const stateUpdate = (key: keyof IListState<T>, value: any) => {
  state[key] = value
}

const totalPage = computed(() => {
  return Math.ceil(props.data.length / state.perPage)
})

const displayData = computed(() => {
  const start = (state.page - 1) * state.perPage
  const end = start + state.perPage
  return props.data.slice(start, end)
})

const perPageValue = (i: number[]) => {
  return [...i].splice(1, i.length - 1).map((page) => ({
    label: page.toString(),
    value: page
  }))
}
</script>
<template>
  <slot name="header"></slot>
  <table class="w-full bg-white font-satoshi">
    <thead class="border-b border-[#EAEFFC]">
      <tr>
        <th class="py-2 text-[#6A8BAA] text-sm font-medium w-28">
          <div class="flex items-center"><CheckBox :checked="false" />All</div>
        </th>
        <th
          class="py-6 text-[#6A8BAA] text-sm font-medium mx-6"
          v-for="column in columns"
          :key="column.id"
          :style="{
            width: `${column.width}px`
          }"
        >
          <div class="flex gap-2">
            {{ column.name }}
            <MaterialIconVue class="text-sm" icon="unfold_more" outline />
          </div>
        </th>
      </tr>
    </thead>
    <tbody v-if="!loading" class="text-dark_green text-sm">
      <tr
        class="hover:bg-[#F6FAFF] hover:rounded"
        v-for="(row, index) in displayData"
        :key="index"
        @click="$emit('onRowClick', row, index)"
      >
        <td><CheckBox :checked="false" /></td>
        <td v-for="column in columns" :key="column.id">
          <span v-if="column.cell">
            <slot :name="column.id" v-bind="row" />
          </span>
          <span v-else> {{ row[column.dataFiled] }}</span>
        </td>
      </tr>
    </tbody>
    <div v-else class="w-full h-[30vh] justify-center items-center flex">
      <SpinnerComponent />
    </div>
  </table>
  <div
    v-if="pagination"
    class="border-t border-[#EAEFFC] font-satoshi w-full flex justify-between items-center h-24 bg-white px-5"
  >
    <div class="flex gap-2 items-center">
      <span class="text-dark_green text-xs font-medium">Display per page</span>
      <SelectInput
        class="w-20 h-10 text-xs p-0 px-0"
        :items="perPageValue(perPage ?? defaultPages)"
        :name="['label']"
        label=""
        value="value"
        noPadding
        :placeholder="(perPage ?? defaultPages)[0].toString()"
        :selected="state.perPage.toString()"
        :onChange="(e) => stateUpdate('perPage', parseInt(e))"
      />
    </div>
    <Pagination
      :selectedPage="state.page"
      :totalPage="totalPage"
      @onPageChange="(i) => stateUpdate('page', i)"
    />
  </div>
</template>
