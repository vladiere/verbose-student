<template>
  <div v-if="props.user_id !== decode.user_id" class="grid grid-cols-3 items-center w-full">
    <div class="border-[1px] border-gray-400 w-full"></div>
    <span class="text-h5 text-semibold text-center">{{ `${props.username.charAt(0).toUpperCase()}${props.username.slice(1)}`}} {{ props.message }}</span>
    <div class="border-[1px] border-gray-400 w-full"></div>
  </div>
</template>

<script setup lang="ts">
  import { jwtDecode } from 'jwt-decode';
  import { useAuthStore } from '../stores/auth.store';

  import { RoomNotify } from './models';

  const auth = useAuthStore();
  const decode = jwtDecode(auth.getAccessToken);
  const props = defineProps<RoomNotify>();
</script>
