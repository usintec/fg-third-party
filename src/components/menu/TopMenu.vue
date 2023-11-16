<script setup lang="ts">
import { useRouter } from 'vue-router'
import dateFormat from 'dateformat'
import { usePageNameStore } from '@/stores/pageName'
import MaterialIcon from '../icon/MaterialIcon.vue'
import { onMounted, ref } from 'vue'
import UpdateToken from '@/services/UpdateToken'
import AuthService from '@/services/AuthService'
import type { IUserInfo } from '@/services/types'
import TextInput from '../inputs/text/TextInput.vue'
import { useOrganizationStore } from '@/stores/organizationStore'
import { useUserStore } from '@/stores/userStore'
import NotificationIcon from '../notification/NotificationIcon.vue'

const router = useRouter()
const pageName = usePageNameStore()
const orgStore = useOrganizationStore()

const user = ref<IUserInfo>()
const lastLogin = ref<Date>()
const userStore = useUserStore()
onMounted(async () => {
  lastLogin.value = UpdateToken.getLastLogin()
  user.value = userStore.user ?? (await AuthService.userInfo())
  console.log(user.value)
  userStore.setUser(user.value)
  orgStore.setOrganization({
    ...user.value,
    id: user.value.organizationId,
    parentOrganization: {
      organizationName: user.value.parentOrganizationName,
      organizationCode: user.value.parentOrganizationCode,
      organizationId: user.value.parentOrganizationId
    }
  })
})

const selected = ref(0)

const onRouteClick = (index: number) => {
  selected.value = index
  router.push(pages[index].path)
}

const pages = [
  {
    text: 'Dashboard',
    icon: 'home',
    path: '/'
  },
  {
    text: 'Bill / Invoices',
    icon: 'desktop_windows',
    path: '/'
  },
  {
    text: 'Customers',
    icon: 'groups',
    path: '/customers'
  },
  {
    text: 'Settings',
    icon: 'settings',
    path: '/settings'
  }
]

const getAvatar = (name: string) => {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}
</script>
<template>
  <div>
    <div class="h-[79px] bg-[#01133A] flex px-20 items-center justify-between">
      <div class="flex gap-6 items-center">
        <div class="bg-[#7585A7] rounded-lg p-2 flex items-center">
          <span class="text-3xl font-bold text-white">
            {{ getAvatar(orgStore.organization?.organizationName ?? '') }}
          </span>
        </div>
        <div class="flex gap-6">
          <div
            v-if="pageName.subMenu"
            @click="pageName.goBack()"
            class="w-7 aspect-square rounded-full bg-custom_mint flex items-center justify-center cursor-pointer"
          >
            <MaterialIcon icon="chevron_left" class="text-dark_green text-xl" />
          </div>
          <div class="flex flex-col">
            <div class="text-white font-dm-sans font-medium text-sm mt-0.5">
              {{ orgStore.organization?.organizationName }}
            </div>
            <span class="text-[#7585A7] font-dm-sans font-medium text-sm mt-0.5"
              >Signed in as <span class="font-bold">{{ user?.name ?? '' }}</span> | Last Login:
              {{ dateFormat(lastLogin, 'd mmmm, yyyy hh:mmTT') }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex gap-4 justify-center items-center">
        <div
          class="flex flex-col"
          v-if="orgStore.organization?.parentOrganization?.organizationName"
        >
          <span class="text-[#7585A7] font-dm-sans font-medium text-sm mt-0.5"
            >Parent Organization</span
          >
          <span class="text-white font-dm-sans font-medium text-sm mt-0.5">{{
            orgStore.organization?.parentOrganization?.organizationName
          }}</span>
        </div>
        <NotificationIcon />
        <div
          @click="console.log"
          class="first:flex justify-center aspect-square w-[46px] rounded-full flex items-center"
        >
          <MaterialIcon icon="account_circle" class="text-4xl text-[#6496FF]" />
        </div>
      </div>
    </div>
    <!-- divider -->
    <div class="w-full h-[1px] bg-[#152B5A]"></div>
    <!-- divider -->
    <div class="h-[79px] bg-[#01133A] flex px-20 items-center justify-between">
      <div class="flex gap-6 items-center">
        <div
          @click="() => onRouteClick(i)"
          v-for="(page, i) of pages"
          :key="i"
          class="flex gap-5 items-center rounded-md px-4 h-12 cursor-pointer"
          :class="{
            'bg-[#112758] text-white font-bold': selected === i,
            'text-[#DBE7FF] font-normal': selected !== i
          }"
        >
          <MaterialIcon
            :icon="page.icon"
            class="text-[#4266B2]"
            :class="{
              'text-[#20AFFF] ': selected === i
            }"
          />
          {{ page.text }}
        </div>
      </div>
      <div class="flex gap-4 justify-center items-center w-1/4">
        <TextInput
          class="w-full"
          dark
          icon="search"
          label=""
          :onChange="console.log"
          placeholder="Search bill or invoices"
        />
      </div>
    </div>
  </div>
</template>
