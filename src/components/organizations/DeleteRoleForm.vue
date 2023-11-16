<script setup lang="ts">
import Modal from '../modal/Modal.vue'
import ButtonInput from '../inputs/button/ButtonInput.vue'
import { ref, watch } from 'vue'
import RoleService from '@/services/RoleService'
import { useToast } from 'vue-toastification'
import { useRoleStore } from '@/stores/roleStore'
import { getRandomCharacter } from './randomCharacter'
import type { IRole, IPermission } from '@/services/types'
import PermissionService from '@/services/PermissionService'

const toast = useToast()
const loading = ref(false)
const roleStore = useRoleStore()
const permit = ref<IPermission[]>([])
const activeRole = ref<IRole | undefined>()
const activeRoleId = ref('')
const permission = ref<IPermission | null>(null)

interface Ipermits {
  show: boolean
  roleId: string
}

const props = defineProps<Ipermits>()
const state = ref<Partial<IRole>>({})

const emit = defineEmits<{
  (e: 'closeModal'): void
}>()

const randomValue = getRandomCharacter()

const pull = async () => {
  const data = await RoleService.getAll()
  roleStore.setRole(data)

  watch(
    () => data,
    (newRole) => {
      activeRoleId.value = newRole[0].id
    },
    { immediate: true }
  )

  const datas = await PermissionService.getAll()
  permit.value = datas

  activeRole.value = await RoleService.getOne(activeRoleId.value)

  const permissionData = await PermissionService.getPermissions(activeRoleId.value)
  permission.value = permissionData
}

const submit = async () => {
  loading.value = true
  state.value.uniqueRequestId = randomValue
  try {
    await RoleService.delete(`${props.roleId}`, state.value)

    pull()

    toast.success('Role deleted successfully')
    loading.value = false
    emit('closeModal')
  } catch (error) {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <Modal
      :shows="show"
      @closeModal="() => emit('closeModal')"
      title="Delete role"
      width="w-11/12 lg:w-1/2 xl:w-1/3 2xl:w-1/4"
    >
      <template v-slot:content>
        <div class="mt-5">
          <div>
            <p class="text-base font-medium">Are you sure?</p>
          </div>
          <div class="w-full mt-5 flex gap-3">
            <div class="w-1/5">
              <ButtonInput
                class="text-sm h-11"
                :onClick="submit"
                :loading="loading"
                bg="bg-[#DA0722]"
              >
                Yes
              </ButtonInput>
            </div>

            <div class="w-1/5">
              <ButtonInput
                class="text-sm h-11 !text-[#204458]"
                bg="bg-[#DEEFFA]"
                :onClick="() => emit('closeModal')"
              >
                Cancel
              </ButtonInput>
            </div>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>
