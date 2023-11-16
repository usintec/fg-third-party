<script setup lang="ts">
import ButtonInput from '../inputs/button/ButtonInput.vue'
import MaterialIcon from '../icon/MaterialIcon.vue'
import Card from '../card/Card.vue'
import { ref, onMounted, computed } from 'vue'
import RoleForm from './RoleForm.vue'
import EditRoleForm from './EditRoleForm.vue'
import DeleteRoleForm from './DeleteRoleForm.vue'
import type { IRole, IPermission } from '@/services/types'
import RoleService from '@/services/RoleService'
import PermissionService from '@/services/PermissionService'
import { useRoleStore } from '@/stores/roleStore'
import SpinnerComponent from '../loader/SpinnerComponent.vue'

const addNew = ref(false)
const editRole = ref(false)
const deleteRole = ref(false)
const loading = ref(false)
const activeRoleId = ref<string>('')
const activeRoleIdss = ref<string>('')
const activeRole = ref<IRole | undefined>()
const permission = ref<IPermission | null>(null)
const dispermission = ref<IPermission | null>(null)
const permit = ref<IPermission[]>([])
const roleStore = useRoleStore()
const role = computed(() => roleStore.role)
const permissions = computed(() => roleStore.permission)
const dispermissions = computed(() => roleStore.dispermission)
const roleOne = computed(() => roleStore.roleOne)
const roleIds = ref('')

const close = () => {
  addNew.value = false
}

const closeedit = () => {
  editRole.value = false
}

const closedelete = () => {
  deleteRole.value = false
}

function isActive(id: string) {
  return activeRoleId.value === id
}

const change = async (id: string) => {
  loading.value = true

  roleIds.value = id

  activeRoleId.value = activeRoleId.value === id ? '' : id

  const getOne = await RoleService.getOne(id)
  activeRole.value = getOne
  roleStore.setRoleOne(getOne)

  const datas = await PermissionService.getAll()
  permit.value = datas

  const getPermission = await PermissionService.getPermissions(id)
  permission.value = getPermission
  roleStore.setPermission(getPermission)

  const getDisPermission = await PermissionService.getDisallowedPermissions(id)
  dispermission.value = getDisPermission
  roleStore.setDisPermission(getDisPermission)

  loading.value = false
}

const pull = async () => {
  loading.value = true

  const data = await RoleService.getAll()
  roleStore.setRole(data)

  roleIds.value = data[0].id

  const datas = await PermissionService.getAll()
  permit.value = datas

  activeRoleId.value = data.length > 0 ? data[0].id : ''
  activeRole.value = await RoleService.getOne(data[0].id)
  roleStore.setRoleOne(activeRole.value)

  activeRoleIdss.value = data.length > 0 ? data[0].id : ''

  const permissionData = await PermissionService.getPermissions(data[0].id)
  permission.value = permissionData
  roleStore.setPermission(permissionData)

  const getDisPermission = await PermissionService.getDisallowedPermissions(data[0].id)
  dispermission.value = getDisPermission
  roleStore.setDisPermission(getDisPermission)

  loading.value = false
}

onMounted(() => {
  pull()
})

const selectDefaultRole = async () => {
  if (roleStore.role && roleStore.role.length > 0) {
    loading.value = true

    const defaultRoleId = roleStore.role[0].id

    activeRoleId.value = defaultRoleId
    activeRole.value = await RoleService.getOne(defaultRoleId)
    roleStore.setRoleOne(activeRole.value)

    const permissionData = await PermissionService.getPermissions(defaultRoleId)
    permission.value = permissionData

    const getDisPermission = await PermissionService.getDisallowedPermissions(defaultRoleId)
    dispermission.value = getDisPermission
    roleStore.setPermission(permissionData)
    roleStore.setDisPermission(getDisPermission)

    loading.value = false
  }
}
</script>

<template>
  <div class="mx-3 pb-9">
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-base text-[#204458] font-medium">TSA Accounts for group of MDAs</h3>
      </div>
      <div>
        <ButtonInput
          class="text-sm !text-[#204458] h-11 px-5"
          :onClick="() => (addNew = true)"
          :bg="'bg-[#DEEFFA]'"
        >
          Add New
        </ButtonInput>
      </div>
    </div>

    <div class="flex flex-col xl:flex-row gap-5 py-5">
      <div class="xl:w-3/12 md:w-full border rounded-lg h-full">
        <div class="px-5 py-3 border-b">
          <p class="text-sm text-[#204458[ flex items-center gap-2 font-medium">
            Default Roles
            <span class="text-[#36A55B]"><MaterialIcon icon="help" class="text-lg" /></span>
          </p>
        </div>

        <div
          class="px-5 py-3 border-b hover:cursor-pointer"
          v-for="roles in role"
          :key="roles.id"
          @click="change(roles.id)"
          :class="{ 'bg-[#E2F4FF]': isActive(roles.id) }"
        >
          <p class="text-sm text-[#204458[ flex items-center gap-2 font-medium">
            {{ roles.displayName }}
          </p>
        </div>
      </div>

      <div class="xl:w-9/12 md:w-full border rounded-lg h-full">
        <div class="px-5 py-3 border-b">
          <div class="border-b pb-3">
            <p class="text-sm text-[#204458[ flex items-center gap-2 font-medium pb-3">
              <span>
                {{ roleOne?.displayName }}
              </span>
            </p>
            <p class="text-sm text-[#8492B6]">
              {{ roleOne?.description }}
            </p>

            <div class="w-1/5 mt-3 flex gap-3">
              <ButtonInput
                class="text-sm !text-[#204458] h-9 px-5"
                :onClick="() => (editRole = true)"
                :bg="'bg-[#DEEFFA]'"
              >
                Edit
              </ButtonInput>

              <ButtonInput
                class="text-sm !text-[#204458] h-9 px-5"
                :onClick="() => (deleteRole = true)"
                :bg="'bg-[#FFD0D6]'"
              >
                Delete
              </ButtonInput>
            </div>
          </div>

          <div class="border-b py-3">
            <p class="text-sm text-[#204458[ flex items-center gap-2 font-medium">
              Members({{ activeRole?.userCount }})
            </p>
          </div>

          <div class="mt-10 flex flex-col xl:flex-row gap-10">
            <Card title="What this role can access" class="xl:w-2/4 md:w-full h-96 overflow-y-auto">
              <template v-slot:content>
                <div class="py-5 px-4" v-if="!loading">
                  <div class="pb-5" v-for="(group, groupName) in permissions" :key="groupName">
                    <h3 class="text-sm font-medium text-[#2BAAF0]">{{ groupName }}</h3>

                    <div class="pt-3 pb-3 border-b" v-for="permit in group" :key="permit">
                      <p class="text-sm">
                        {{ (permit as any).description }}
                      </p>
                    </div>
                  </div>
                </div>
                <div v-else-if="loading" class="w-full h-[30vh] justify-center items-center flex">
                  <SpinnerComponent />
                </div>
              </template>
            </Card>

            <Card
              title="What this role can’t access"
              class="xl:w-2/4 md:w-full h-96 overflow-y-auto"
              bg="bg-[#FFD0D6]"
              text="text-[#DA0722]"
            >
              <template v-slot:content>
                <div class="py-5 px-4" v-if="!loading">
                  <div class="pb-5" v-for="(group, groupName) in dispermissions" :key="groupName">
                    <h3 class="text-sm font-medium text-[#2BAAF0]">{{ groupName }}</h3>

                    <div class="pt-3 pb-3 border-b" v-for="permit in group" :key="permit">
                      <p class="text-sm">
                        {{ (permit as any).description }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="pb-5 text-center"
                    v-if="
                      dispermissions === null ||
                      (dispermissions && Object.keys(dispermissions).length === 0)
                    "
                  >
                    <h3 class="text-sm text-[#204458] pb-3 font-medium">
                      This role has full access!
                    </h3>
                    <p class="text-sm text-[#8492B6]">
                      Any team member with this role can access all the sections of the dashboard.
                    </p>
                  </div>
                </div>
                <div v-else-if="loading" class="w-full h-[30vh] justify-center items-center flex">
                  <SpinnerComponent />
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>

    <RoleForm :show="addNew" @closeModal="close" />

    <EditRoleForm
      :show="editRole"
      @closeModal="closeedit"
      :permits="permission"
      :name="activeRole"
      :roleId="roleIds"
    />

    <DeleteRoleForm
      :show="deleteRole"
      @closeModal="closedelete"
      :roleId="roleIds"
      :role="activeRole"
      @roleDeleted="selectDefaultRole"
    />
  </div>
</template>
