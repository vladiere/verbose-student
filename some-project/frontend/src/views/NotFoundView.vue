<template>
  <div class="h-screen flex flex-col items-center justify-center gap-5 bg-neutral-100 dark:bg-neutral-900 dark:text-white">
    <span class="text-4xl font-bold">404 | Not Found</span>
    <RouterLink :to="{ name: 'home' }" class="px-3 py-2 border-2 border-neutral-900 dark:border-neutral-100 rounded-md">Return</RouterLink>
  </div>
</template>
