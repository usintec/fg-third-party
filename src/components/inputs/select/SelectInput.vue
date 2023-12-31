<script setup lang="ts">
import MaterialIcon from '@/components/icon/MaterialIcon.vue'
import SpinnerComponent from '@/components/loader/SpinnerComponent.vue'

interface ISelectProps {
  selected?: string
  onChange: (v: string) => void
  value: string
  name: string[]
  label: string
  items: any[]
  important?: boolean | string
  errorMessage?: string
  noPadding?: boolean
  placeholder?: string
  loading?: boolean
  noDataMessage?: string
}
const props = defineProps<ISelectProps>()

const onChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  props.onChange(target.value)
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <label class="font-satoshi text-[#3B579E] text-sm font-medium"
      >{{ props.label }} <span v-if="important" class="text-red-600">*</span></label
    >
    <div
      v-if="!!noDataMessage"
      class="w-full h-full flex justify-center items-center py-4 bg-input_mint rounded-lg"
    >
      {{ noDataMessage }}
    </div>
    <div v-else-if="!loading" class="w-full h-full relative">
      <select
        @change="onChange"
        :value="selected"
        class="w-full appearance-none h-full bg-input_mint rounded-lg px-4 focus:outline-green_regular"
        :class="{
          'border border-red-600 focus:outline-red-500': errorMessage,
          'focus:outline-green_regular': !errorMessage,
          'p-0': noPadding,
          'p-4': !noPadding
        }"
      >
        <option v-if="placeholder" selected disabled>{{ placeholder }}</option>
        <option v-else selected disabled>Choose a {{ label }}</option>
        <option :value="item[props.value]" :key="i" v-for="(item, i) in props.items">
          {{ props.name.map((n) => item[n]).join(' ') }}
        </option>
      </select>
      <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <MaterialIcon class="text-green_regular" icon="expand_more" outline />
      </span>
    </div>
    <div
      v-else
      class="w-full h-full flex justify-center items-center py-4 bg-input_mint rounded-lg"
    >
      <SpinnerComponent />
    </div>
  </div>
</template>

<style scoped></style>
