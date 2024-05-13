<template>
  <div v-if="props.user_id !== decode.user_id" class="flex gap-5 items-center bg-neutral-700 p-3 rounded-lg">
    <img :src="`https://picsum.photos/id/${props.user_id}/200/300`" class="h-8 w-8 rounded-full" />
    <span class="text-md font-normal capitalize">{{ props.username }}</span>
  </div>
</template>

<script setup lang="ts">
  import { UserConnect } from './models';
  import { jwtDecode } from 'jwt-decode';
  import { useAuthStore } from '../stores/auth.store';

  const auth = useAuthStore();
  const decode = jwtDecode(auth.getAccessToken);
  const props = defineProps<UserConnect>();
</script>
