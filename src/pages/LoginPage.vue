<script setup lang="ts">
import TextInput from '@/components/inputs/text/TextInput.vue'
import ButtonInput from '@/components/inputs/button/ButtonInput.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '@/services/AuthService'
import { useToast } from 'vue-toastification'
import LoginInfoVue from '@/components/login/LoginInfo.vue'
import LoginHeader from '@/components/login/LoginHeader.vue'

const loading = ref(false)
const router = useRouter()

const toast = useToast()

interface ILogin {
  username?: string
  password?: string
}

const errorMessage = ref<ILogin>()
const values = ref<ILogin>()

const setErrorMessage = (key: keyof ILogin, message: string) => {
  errorMessage.value = { ...errorMessage.value, [key]: message }
}

const validate = () => {
  let error = false
  if (!values.value?.username) {
    setErrorMessage('username', 'Username is required')
    error = true
  }
  if (!values.value?.password) {
    error = true
    setErrorMessage('password', 'Password is required')
  }
  return error
}

const setValue = (key: keyof ILogin, value: string) => {
  values.value = { ...values.value, [key]: value }
  errorMessage.value = { ...errorMessage.value, [key]: undefined }
}

const onLogin = async () => {
  if (validate()) {
    return
  } else {
    try {
      loading.value = true
      await AuthService.login(values.value?.username!, values.value?.password!)
      toast.success('Login successful')
      return router.push('/')
    } catch (error) {
      console.log(error)
      loading.value = false
      toast.error('Login failed')
    }
  }
}
</script>
<template>
  <div class="bg-[#0E2240] relative overflow-hidden">
    <div class="login-bg flex w-full flex-col items-center justify-center" />
    <div class="ng w-1/2 absolute aspect-square bottom-0 left-0 sm:-bottom-40 sm:-left-10"></div>
    <div class="absolute left-16 bottom-44">
      <LoginInfoVue />
    </div>
    <div class="absolute left-16 top-8">
      <LoginHeader />
    </div>
    <div
      class="login-input-bg absolute bottom-0 top-0 my-auto h-1/2 sm-v-h right-24 w-[90%] lg:w-1/2 md:w-2/3 xl:w-1/3 rounded-[30px] flex justify-center items-center flex-col py-9"
    >
      <span class="text-[#0D153E] text-center text-2xl font-medium">Welcome back!</span>
      <span class="text-[#0D153E] text-center text-base font-normal">Login to your dashboard</span>
      <div class="w-2/3 px-2 mt-9">
        <TextInput
          label="Username / Email address"
          placeholder="you@example.com"
          type="email"
          :onChange="(v) => setValue('username', v)"
          :errorMessage="errorMessage?.username"
          :value="values?.username"
        />
        <TextInput
          class="mt-2.5"
          label="Password"
          placeholder="Type your password"
          type="password"
          :onChange="(v) => setValue('password', v)"
          :errorMessage="errorMessage?.password"
          :value="values?.password"
        />
        <ButtonInput :loading="loading" class="mt-9" :onClick="onLogin"> Login Now </ButtonInput>
      </div>
      <span class="mt-14 opacity-0 text-dark_green text-center text-base font-normal"
        >Forgot your password?
        <span class="font-bold cursor-pointer hover:underline">Reset it here</span></span
      >
    </div>
  </div>
</template>

<style scoped>
.login-bg {
  background: url('../assets/ship.jpeg'), lightgray 50% / cover no-repeat;
  border: 1px solid #000;
  mix-blend-mode: hard-light;
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.login-input-bg {
  border-radius: 19px;
  background: rgba(241, 245, 255, 0.95);
}

.ng {
  background-image: url('../assets/ng.svg');
  background-repeat: no-repeat;
  background-size: contain;
  fill: rgba(60, 105, 130, 0.28);
  mix-blend-mode: color-dodge;
}

.text-mini {
  color: #91c1dc;
}

@media (max-height: 950px) {
  .sm-v-h {
    height: 75%;
  }
}
</style>
