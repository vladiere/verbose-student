<template>
  <div role="status" class="h-full w-full flex items-center justify-center">
      <div class="w-14 h-14 text-neutral-700 dark:text-neutral-500 fill-neutral-900">
        <svg-icon type="mdi" :path="mdiLoading" class="animate-spin"></svg-icon>
      </div>
      <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup lang="ts">
  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiLoading } from '@mdi/js'
</script>
