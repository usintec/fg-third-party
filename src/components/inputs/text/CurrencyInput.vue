<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LookUpService from '@/services/LookUpService'
import useDetectOutsideClick from '@/hooks/useClickOutSide'
import TextInput from './TextInput.vue'

interface IInputProps {
  label: string
  onChange: (v: string) => void
  selectItem: (v: string) => void
  type?: string
  placeholder?: string
  important?: string
  errorMessage?: string
  value?: string
  whiteBackground?: boolean
  border?: boolean
  description?: string
  disabled?: boolean
  min?: string
  readonly?: boolean
  preventClick?: boolean
  item?: {
    image: string
    name: string
  }
}
const props = defineProps<IInputProps>()
const showPassword = ref(false)
const flags = ref<{ name: string; image: string }[]>([])
const filteredFlags = ref<{ name: string; image: string }[]>([])
const isOpen = ref(false)
const el = ref()

const onChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  props.onChange(target.value)
}

const selectedItem = ref<{
  image: string
  name: string
}>({
  name: '',
  image: ''
})

const toggleDropdown = () => {
  if (props.preventClick) {
    return
  }

  isOpen.value = !isOpen.value
}

const selectItem = (item: any) => {
  selectedItem.value = item
  props.selectItem(item.name)

  useDetectOutsideClick(el, () => {
    isOpen.value = false
  })
}

const onFilter = (v: string) => {
  const res = flags.value.filter((code) => {
    return code.name.toLowerCase().includes(v.toLowerCase())
  })
  filteredFlags.value = res
}

onMounted(async () => {
  const response = await LookUpService.currency()
  flags.value = Object.values(response).map((item: any) => ({
    name: item.name,
    image: item.image
  }))

  filteredFlags.value = Object.values(response).map((item: any) => ({
    name: item.name,
    image: item.image
  }))
  if (props.item) selectedItem.value = props.item
  else
    selectedItem.value = {
      image: 'https://statics.fr-par-1.linodeobjects.com/currencies/ngn.svg',
      name: 'NGN'
    }

  selectItem(selectedItem.value)
})
</script>
<template>
  <div class="flex flex-col gap-1">
    <label class="text-dark_green text-sm font-medium"
      >{{ label }} <span class="text-red-600">{{ important }}</span></label
    >

    <div class="w-full h-14">
      <div class="w-full h-full flex items-center relative">
        <div class="absolute left-3 w-14">
          <div class="flag-dropdown" @click="toggleDropdown">
            <div class="selected-option gap-2">
              <img :src="selectedItem.image" class="w-8 h-8" alt="Flag" />
            </div>
            <ul v-if="isOpen" class="options px-2 py-1">
              <li class="mb-2">
                <TextInput
                  label=""
                  placeholder="Name"
                  type="text"
                  :onChange="onFilter"
                  class="w-full h-[40px] me-3"
                  @click.stop
                />
              </li>

              <li
                v-for="(dd, i) in filteredFlags"
                :key="i"
                @click="selectItem(dd)"
                class="flex py-1"
              >
                <img :src="dd.image" alt="Flag" class="w-8 h-8 me-2" />
                <span class="text-sm">{{ dd.name }}</span>
              </li>
              <li v-if="filteredFlags.length === 0" class="text-center py-1">
                <span class="text-sm">No Data Found!</span>
              </li>
            </ul>
          </div>
        </div>
        <input
          :disabled="disabled"
          class="w-full h-full rounded-lg pl-16 pr-8 focus:outline-green_regular bg-[#DEF3FF]"
          :class="{
            'border border-red-600 focus:outline-red-500': errorMessage,
            'focus:outline-green_regular': !errorMessage,
            'bg-white': whiteBackground,
            'bg-input_mint': !whiteBackground,
            border: border
          }"
          @change="onChange"
          :value="selectedItem.name"
          :type="showPassword ? 'text' : type"
          :min="type === 'date' ? min : undefined"
          :readonly="readonly"
        />
      </div>
      <span v-if="description" class="text-[#747EA1] text-sm font-thin">{{ description }}</span>
    </div>
  </div>
</template>

<style scoped>
::placeholder {
  color: #a6bac5;
  font-family: 'Satoshi';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.flag-dropdown {
  position: relative;
  cursor: pointer;
  width: 50px;
}

.selected-option {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
}

.options {
  position: absolute;
  bottom: calc(100% + 5px);
  left: 0;
  width: 150px;
  max-height: 200px; /* Set a maximum height for scrollability */
  overflow-y: auto; /* Enable vertical scrolling when options overflow */
  list-style: none;
  background-color: white;
  border: 1px solid #ccc; /* Add a border to make it look like a select dropdown */
  border-bottom: none; /* Remove the bottom border to match select dropdown style */
  border-radius: 4px 4px 0 0; /* Adjust the border-radius for top corners */
  box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1); /* Adjust the shadow direction */
  z-index: 99;
}

.options li {
  align-items: center;
  cursor: pointer;
}

.flag-icon {
  width: 20px;
  height: auto;
  margin-right: 8px;
}
</style>
