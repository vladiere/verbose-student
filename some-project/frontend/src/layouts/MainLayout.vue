<template>
  <div class="h-screen w-screen bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-100 flex flex-col">
    <div class="grid grid-cols-2 items-center justify-center py-5 border-b border-neutral-900 dark:border-neutral-100 gap-5 px-5">
      <div class="flex gap-5 justify-end items-center">
        <RouterLink :to="{ name: 'home' }" class="text-2xl font-semibold hover:underline hover:text-neutral-100">Home</RouterLink>
        <RouterLink :to="{ name: 'create' }" class="text-2xl font-semibold hover:underline hover:text-neutral-100">New Todo</RouterLink>
        <div class="flex flex-col gap-2 relative">
          <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-2xl font-semibold hover:underline hover:text-neutral-100 flex items-center gap-2" type="button" @click="show_dd = !show_dd">
            Filter
            <svg-icon type="mdi" :path="mdiChevronDown" class="w-10 h-10"></svg-icon>
          </button>

          <!-- Dropdown menu -->
          <div v-if="show_dd" id="dropdown" class="z-10 bg-neutral-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-neutral-700 absolute top-10 border border-neutral-900 dark:border-neutral-100">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <RouterLink :to="{ name: 'home', query: { filter: 'active' } }" @click="show_dd = false" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Active</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'home', query: { filter: 'done' } }" @click="show_dd = false" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Done</RouterLink>
                </li>
                <li>
                  <RouterLink :to="{ name: 'home', query: { filter: 'remove' } }" @click="show_dd = false" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Removed</RouterLink>
                </li>
              </ul>
          </div>
        </div>
      </div>
      <div class="flex w-full justify-end">
        <button @click="handleLogout" class="text-2xl font-semibold hover:underline hover:text-neutral-100">Logout</button>
      </div>
    </div>
    <div class="grow overflow-y-auto flex p-5 h-full w-full">
      <RouterView />
    </div>
    <div class="flex justify-start text-neutral-500">
      <span class="text-sm font-semibold">©</span>
      <span class="text-sm font-semibold">vladiere</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiChevronDown } from '@mdi/js'

  import useAuthStore from '../stores/auth.store';
  import useUserStore from '../stores/user.store';

  const user = useUserStore();
  const auth = useAuthStore();
  const router = useRouter();
  const show_dd = ref(false);

  const handleLogout = async () => {
    await auth.handleLogout();
    user.clearUser();
    router.push({ name: 'login' });
  }

  onMounted(async () => {
    const response = await auth.getUserDetails();
    user.setUserDetails(response.data);
  })
</script>
