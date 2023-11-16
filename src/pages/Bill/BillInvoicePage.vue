<script setup lang="ts">
import BillInvoice from '@/components/invoice/BillInvoice.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const billId = route.params.billId
</script>

<template>
  <div>
    <BillInvoice :v-if="billId" :billId="(billId as string)" />
  </div>
</template>
