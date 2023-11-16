<script setup lang="ts">
import TabItems from '../tab/TabItems.vue'
import BillingCircles from '../organizations/BillingCircles.vue'
import Role from '../organizations/Role.vue'
import Profile from './Profile.vue'
import Credentials from '../integrator/Credentials.vue'

const tabs = [
  {
    name: 'Billing Settings'
  },
  {
    name: 'Roles'
  },
  {
    name: 'API Keys'
  },
  {
    name: 'Profile'
  },
]
</script>

<template>
  <div class="flex justify-center my-8 mx-8">
    <TabItems class="px-4 rounded-3xl h-full" :tabs="tabs">
      <template v-slot:tab-0>
        <BillingCircles />
      </template>
      <template v-slot:tab-1>
        <Role />
      </template>
      <template v-slot:tab-2>
        <Credentials />
      </template>
      <template v-slot:tab-3>
        <Profile />
      </template>
    </TabItems>
  </div>
</template>
