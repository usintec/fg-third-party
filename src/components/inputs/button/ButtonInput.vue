<script setup lang="ts">
interface IButtonProps {
  onClick: () => void
  icon?: string
  loading?: boolean
}
const props = defineProps<IButtonProps>()
import MaterialIcon from '../../icon/MaterialIcon.vue'
import SpinnerComponent from '@/components/loader/SpinnerComponent.vue'
</script>

<template>
  <button
    class="bg-[#119AE7] py-4 px-2 rounded-lg flex gap-2 w-full justify-center items-center"
    v-bind="props"
  >
    <template v-if="!!props.loading"> <SpinnerComponent /> </template>
    <template v-else>
      <div class="text-white text-center txt-small font-semibold font-satoshi"><slot></slot></div>
      <MaterialIcon outline v-if="props.icon" :icon="props.icon" class="text-white" />
    </template>
  </button>
</template>

<style scoped>
.txt-small {
  font-weight: 700;
  line-height: normal;
}
</style>
