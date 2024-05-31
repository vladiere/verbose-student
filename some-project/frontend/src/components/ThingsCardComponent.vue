<template>
  <div class="rounded-lg bg-white p-6 text-surface shadow-secondary-1 bg-neutral-400 dark:bg-neutral-700 dark:text-white relative">
    <div class="grow overflow-y-scroll h-52 flex flex-col gap-2">
      <h5 class="mb-2 text-xl font-medium leading-tight capitalize">{{ props.name }}</h5>
      <p class="mb-4 text-base text-ellipsis overflow-hidden ...">{{ props.description }}</p>
    </div>
    <span class="my-auto sr-only"></span>
    <div class="flex gap-2 items-center justify-end">
      <RouterLink :to="{ name: 'home', query: { edit: true, id: props.id }}" type="button" class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong" data-twe-ripple-init data-twe-ripple-color="light"> Update </RouterLink>
      <button type="button" class="text-red-500 font-sm" data-twe-ripple-init data-twe-ripple-color="light" @click="$emit('modalState', { state: true, id: props.id })"> Remove </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import { Things } from './models';
  import ToastComponent from './toast';

  const show = ref(false);
  const props = defineProps<Things>();
</script>
