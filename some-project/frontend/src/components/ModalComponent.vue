<template>
  <div class="absolute top-0 left-0 h-screen w-screen flex items-center justify-center">
    <div class="absolute h-full w-full bg-black opacity-80 z-10"></div>
    <div class="w-6/12 p-5 flex flex-col gap-5 z-50 bg-neutral-700 rounded-lg">
      <div class="flex items-center justify-between border-b-2 border-neutral-700 dark:border-neutral-400 pb-5">
        <span class="text-2xl font-semibold">Removing</span>
        <button @click="$emit('modalState', false)">
          <svg-icon type="mdi" :path="mdiClose"></svg-icon>
        </button>
      </div>
      <div class="flex flex-col items-center justify-center">
        <span class="text-md">Are you sure you want to remove this item</span>
      </div>
      <div class="flex items-center gap-5 justify-left border-t-2 border-neutral-700 dark:border-neutral-400 pt-5">
        <button class="text-blue-500 text-md font-bold" @click="$emit('modalState', false)">Cancel</button>
        <button class="text-red-500 text-md font-bold" @click="$emit('modalState', { state: false, confirm: true, id: props.id })">Confirm</button> 
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiClose } from '@mdi/js'

  const props = defineProps<{id: number;}>();
</script>
