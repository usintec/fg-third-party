<script setup lang="ts">
import ButtonInput from '../inputs/button/ButtonInput.vue'
import TextInput from '@/components/inputs/text/TextInput.vue'
import MaterialIcon from '@/components/icon/MaterialIcon.vue'


</script>
<template>
  <div>
    <div>
      <div class="px-4 flex justify-between items-center">
        <div></div>
      </div>
      <div class="w-full">
        <div class="mx-3 rounded-lg pb-8">
          <div class="flex flex-col w-full">
            <div class="flex justify-between mb-5 border-b px-5 pb-3">
              <div>
                <p class="text-[#123770] text-sm flex justify-center gap-2 items-center">
                  Public Key
                  <span class=""
                    ><MaterialIcon icon="help" class="text-base text-[#119AE7]"
                  /></span>
                </p>
              </div>
              <div>
                <p class="text-[#123770] text-sm flex justify-center gap-2 items-center">
                  Secret Key
                  <span class=""
                    ><MaterialIcon icon="help" class="text-base text-[#119AE7]"
                  /></span>
                </p>
              </div>
              <div></div>
            </div>

            <div
              class="text-sm text-dark_green px-5 py-3 flex mb-3 gap-4 justify-between items-center border rounded-lg"
              
            >
              <div class="w-full relative">
                <TextInput
                  :onChange="console.log"
                  placeholder="Type here"
                  label=""
                  value="aswwwwwwwwwqqqqqssssssaassddwwee"
                  disabled
                  type="text"
                  copy
                />
              </div>

              <div class="w-full relative">
                <TextInput
                  :onChange="console.log"
                  placeholder="Type here"
                  label=""
                  value="**********************************"
                  disabled
                  type="password"
                  copy
                />
              </div>
              <div class="w-2/5 mt-1">
                <ButtonInput
                  class="text-sm !text-[#204458] h-11"
                  :onClick="console.log"
                  :bg="'bg-[#DEEFFA]'"
                >
                  Re-Generate Keys
                </ButtonInput>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>