<script setup lang="ts">
import MaterialIcon from '@/components/icon/MaterialIcon.vue'
import { ref } from 'vue'

interface IInputProps {
  label: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  important?: string
  errorMessage?: string
  value?: string | number
  dark?: boolean
  disabled?: boolean
  icon?: string
  copy?: boolean
  absolute?: boolean
  copyCallback?: () => void
}

const props = defineProps<IInputProps>()
const showPassword = ref(false)

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  props.onChange(target.value)
}
const toggleShowPassword = () => (showPassword.value = !showPassword.value)
const handleCopyClick = () => {
  if (props.copyCallback) {
    props.copyCallback()
  }
}
</script>
<template>
  <div class="flex flex-col gap-1">
    <label class="font-satoshi text-[#3B579E] text-sm font-medium"
      >{{ props.label }} <span class="text-red-600">{{ props.important }}</span></label
    >
    <div class="w-full h-14">
      <div class="w-full h-full flex items-center"
      :class="{'flex-row-reverse': !absolute}">
        <input
          :disabled="disabled"
          class="w-full h-full rounded-lg px-4 focus:outline-[#3B579E]"
          :class="{
            'border border-red-600 focus:outline-red-500': errorMessage,
            'focus:outline-[#3B579E]': !errorMessage,
            'bg-[#112758] dark placeholder:text-[#95abda]': dark,
            'placeholder:text-[#a6bac5] bg-input_mint': !dark
          }"
          :placeholder="props.placeholder"
          @change="onChange"
          :value="value"
          :type="showPassword ? 'text' : props.type"
        />
        <MaterialIcon
          :absolute="absolute"
          class="m-7 cursor-pointer hover:scale-105 text-[#3B579E]"
          :class="{'absolute': !absolute}"
          v-if="props.type === 'password'"
          :onClick="toggleShowPassword"
          :icon="!showPassword ? 'visibility' : 'visibility_off'"
          outline
        />
        <MaterialIcon
          class="absolute m-4 cursor-pointer hover:scale-105"
          :class="[dark ? 'text-[#8BABEF]' : 'text-[#3B579E]']"
          v-if="icon"
          :onClick="toggleShowPassword"
          :icon="icon"
          outline
        />
        <MaterialIcon
          class="absolute m-2 cursor-pointer hover:scale-105 text-[#119AE7] text-lg"
          v-if="props.copy"
          :onClick="handleCopyClick"
          icon="content_copy"
          outline
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
::placeholder {
  font-family: 'Satoshi';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
</style>
