<script setup lang="ts">
import Modal from '../modal/Modal.vue'
import TextInput from '../inputs/text/TextInput.vue'
import CheckBox from '../inputs/check/CheckBox.vue'
import ButtonInput from '../inputs/button/ButtonInput.vue'
import { ref, onMounted, computed, watch } from 'vue'
import type { IPermission, IRole } from '@/services/types'
import PermissionService from '@/services/PermissionService'
import RoleService from '@/services/RoleService'
import { useToast } from 'vue-toastification'
import { useRoleStore } from '@/stores/roleStore'
import { getRandomCharacter } from './randomCharacter'

const toast = useToast()
const permit = ref<IPermission[]>([])
const isChecked = ref<Record<string, boolean>>({})
const loading = ref(false)
const roleStore = useRoleStore()

interface Ipermits {
  permits: { code: string; group: string; description: string } | null
  show: boolean
  name: IRole | undefined
  roleId: string
}

const props = defineProps<Ipermits>()

const emit = defineEmits<{
  (e: 'closeModal'): void
}>()

const groupedPermissions = computed(() => {
  const grouped: Record<string, IPermission[]> = {}
  permit.value.forEach((permission) => {
    if (!grouped[permission.group]) {
      grouped[permission.group] = []
    }
    grouped[permission.group].push(permission)
  })
  return grouped
})

const state = ref<Partial<IRole>>({})
const errorMessage = ref<Partial<IRole>>()
const permitState = ref<IPermission>({} as IPermission)

const setState = (key: keyof IRole, value: string) => {
  state.value = { ...state.value, [key]: value }
  errorMessage.value = { ...errorMessage.value, [key]: undefined }
}

const setErrorMessage = (key: keyof IRole, message: string) => {
  errorMessage.value = { ...errorMessage.value, [key]: message }
}

const errorMessages = (keys: (keyof IRole)[]) => {
  let error = false
  for (const key of keys) {
    if (!state.value[key]) {
      setErrorMessage(key, `${key} is required`)
      error = true
    }
  }
  return error
}

const onCheck = (code: string) => {
  isChecked.value = {
    ...isChecked.value,
    [code]: !isChecked.value[code]
  }
}

const role: (keyof IRole)[] = ['name']

const next = () => {
  if (errorMessages(role)) {
    return
  } else {
    return submit()
  }
}

const randomValue = getRandomCharacter()

const submit = async () => {
  loading.value = true
  state.value.permissions = Object.keys(isChecked.value).filter((code) => isChecked.value[code])
  state.value.uniqueRequestId = randomValue
  try {
    await RoleService.update(`${props.roleId}`, state.value)

    const data = await RoleService.getAll()
    roleStore.setRole(data)

    toast.success('Role updated successfully')
    loading.value = false

    permitState.value = {} as IPermission
    emit('closeModal')
  } catch (error) {
    loading.value = false
  }
}

const pull = async () => {
  loading.value = true
  const data = await PermissionService.getAll()
  permit.value = data
  loading.value = false

  isChecked.value = {}
}

onMounted(() => {
  pull()

  watch(
    () => props.permits,
    (newPermits) => {
      isChecked.value = {}

      if (newPermits) {
        if (Array.isArray(newPermits)) {
          newPermits.forEach((permission) => {
            if (permission && typeof permission === 'object') {
              const code = permission.code
              isChecked.value[code] = true
            }
          })
        } else if (typeof newPermits === 'object') {
          Object.values(newPermits).forEach((group) => {
            if (Array.isArray(group)) {
              group.forEach((permission) => {
                if (permission && typeof permission === 'object') {
                  const code = permission.code
                  isChecked.value[code] = true
                }
              })
            }
          })
        }
      }
    },
    { immediate: true }
  )

  watch(
    () => props.name,
    (newName) => {
      state.value = {
        name: newName?.name,
        description: newName?.description
      }
    },
    { immediate: true }
  )
})
</script>

<template>
  <div>
    <Modal
      :shows="show"
      @closeModal="() => emit('closeModal')"
      title="Edit role"
      width="w-11/12 lg:w-1/2 xl:w-1/3 2xl:w-1/4"
    >
      <template v-slot:content>
        <div class="mt-5">
          <div class="mb-5">
            <TextInput
              label="Role name"
              :onChange="(v) => setState('name', v)"
              placeholder="Ex. Custom Role"
              type="text"
              class="mb-3"
              :errorMessage="errorMessage?.name"
              :value="state?.name"
            />

            <TextInput
              label="Role description"
              :onChange="(v) => setState('description', v)"
              placeholder="Ex. This role allows for permission in the platform"
              type="text"
              class="mb-3"
              :errorMessage="errorMessage?.description"
              :value="state?.description"
            />
          </div>

          <div class="mb-7" v-for="(Permissions, groupName) in groupedPermissions" :key="groupName">
            <h3 class="text-sm font-medium text-[#2BAAF0]">{{ groupName }}</h3>

            <div class="grid grid-cols-2 md:grid-cols-2">
              <div
                class="flex items-center mt-3 gap-3"
                v-for="permission in Permissions"
                :key="permission.code"
              >
                <CheckBox
                  :checked="isChecked[permission.code]"
                  :activeGreen="isChecked[permission.code]"
                  @onChecked="onCheck(permission.code)"
                />

                <p class="text-sm">{{ permission.description }}</p>
              </div>
            </div>
          </div>

          <div class="w-full mt-5 flex justify-end">
            <div class="w-2/5">
              <ButtonInput class="text-sm bg-[#D8E8F2]" :onClick="next" :loading="loading">
                Edit Role
              </ButtonInput>
            </div>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>
