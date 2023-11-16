<script setup lang="ts">
import ButtonInput from '../inputs/button/ButtonInput.vue'
import Breadcrumb from '../breadcrumb/Breadcrumb.vue'
import OrganizationList from '@/components/organizations/OrganizationList.vue'
import MaterialIconVue from '../icon/MaterialIcon.vue'
import TextInput from '../inputs/text/TextInput.vue'
import SelectInput from '../inputs/select/SelectInput.vue'
import { ref, watch } from 'vue'
import { usePageNameStore } from '@/stores/pageName'
import SubOrgForm from '../sub-organization/SubOrgForm.vue'
import { useOrganizationStore } from '@/stores/organizationStore'

const selectedValue = ref('')
const peopleData = ref([{ id: '1', firstName: 'Flat Rate Fee' }])

const showForm = ref(false)

const menuStore = usePageNameStore()
const orgStore = useOrganizationStore()

watch(
  () => menuStore._goBack,
  () => {
    showForm.value = false
    menuStore.setPageName('Sub Organization')
  }
)

const show = () => {
  showForm.value = true
  menuStore.setSubMenu('Create Sub Organization')
}
</script>

<template>
  <div class="pb-10">
    <div class="h-[68px] flex px-8 py-12 items-center justify-between">
      <Breadcrumb
        title="Create a new sub-organization"
        :name="orgStore.organization?.organizationName ?? ''"
      />
    </div>

    <div v-if="!showForm" class="bg-white rounded-3xl py-5 px-8 mx-8 font-satoshi">
      <div class="flex justify-between">
        <div>
          <p class="text-[#8E95AF] text-sm font-medium">All Sub Organizations</p>
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
          ></SelectInput>
        </div>

        <div class="flex">
          <ButtonInput
            class="text-xs font-bold w-[185px] h-[46px] bg-[#204458] me-3"
            :onClick="show"
          >
            New Sub Organization
          </ButtonInput>
        </div>
      </div>

      <div>
        <OrganizationList :orgId="orgStore.getId()" />
      </div>
    </div>
    <SubOrgForm v-else />
  </div>
</template>
