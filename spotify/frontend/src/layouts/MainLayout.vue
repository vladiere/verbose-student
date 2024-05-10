<template>
  <div class="h-screen flex flex-col bg-gray-900 text-white">
    <div class="w-full flex items-center justify-center border-b-2 border-gray-300 py-3.5 gap-14">
      <RouterLink :to="{ name: 'home_view' }" class="text-8md px-2.5 hover:underline hover:text-blue-500">Rooms</RouterLink>
      <RouterLink :to="{ name: 'musics' }" class="text-8md px-2.5 hover:underline hover:text-blue-500">Musics</RouterLink>
      <button @click="handleLogout" class="text-8md px-2.5 hover:underline hover:text-blue-500">Logout</button>
    </div>
    <div class="h-full">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '../stores/auth.store.ts'
  import { useRouter } from 'vue-router';

  const auth = useAuthStore();
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await auth.handleLogout();
      router.push({ name: 'login' })
    } catch (error) {
      console.error(error)
    }
  }
</script>
