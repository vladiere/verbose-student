<template>
  <div class="flex items-start gap-2.5">
    <img class="w-8 h-8 rounded-full" :src="`http://picsum.photos/id/${props.user.user_id + 40}/200/300`" :alt="props.user.username">
     <div class="flex flex-col w-full leading-1.5 px-4 py-2 border-gray-200 bg-neutral-700 rounded-e-xl rounded-es-xl">
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="text-sm font-semibold text-white">{{ props.user.username }}</span>
          <span class="text-sm font-normal text-gray-400">{{ props.timestamp }}</span>
        </div>
        <p class="text-sm font-normal py-2 text-white">{{ props.message }}</p>
     </div>
  </div>
</template>

<script setup lang="ts">
  import { Messages } from './models';

  const props = defineProps<Messages>();

  console.log(props)
</script>
