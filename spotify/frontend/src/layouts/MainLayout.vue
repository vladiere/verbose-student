<template>
  <div class="h-screen flex flex-col bg-neutral-900 text-white">
    <div class="w-full flex items-center justify-center border-b-2 border-gray-300 py-3.5 gap-14">
      <RouterLink :to="{ name: 'home_view' }" class="text-8md px-2.5 hover:underline hover:text-blue-500">Home</RouterLink>
      <RouterLink :to="{ name: 'musics' }" class="text-8md px-2.5 hover:underline hover:text-blue-500">Musics</RouterLink>
      <button @click="handleLogout" class="text-8md px-2.5 hover:underline hover:text-blue-500">Logout</button>
    </div>
    <div class="h-full grow overflow-y-auto">
      <RouterView />
    </div>
    <MusicPlayComponent />
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import { jwtDecode } from 'jwt-decode';

  import { useAuthStore } from '../stores/auth.store';
  import socket from '../socket';
  import { UserConnect } from '../components/models';
  import { useSocketStore } from '../stores/socket.store';
  import MusicPlayComponent from '../components/MusicPlayComponent.vue';
  import useSpotifyStore from '../stores/spotify.store';
  import { Client } from 'spotify-api.js';

  const spotifyStore = useSpotifyStore();
  const auth = useAuthStore();
  const socketStore = useSocketStore();
  const decode = jwtDecode(auth.getAccessToken);
  const user_connect = ref<UserConnect>({
    username: decode.username,
    socketId: '',
    user_id: decode.user_id,
  });

  const router = useRouter()

  const handleLogout = async () => {
    try {
      await auth.handleLogout();
      router.push({ name: 'login' })
    } catch (error) {
      console.error(error)
    }
  }

  onMounted(async () => {
    socket.on('connect', () => {
      console.log("You are connected")
    });

    socket.on('get_socketId', data => {
      socketStore.setSocketId(data);
      user_connect.socketId = data;
    });
    if (router.currentRoute.value.query.code) {
      await spotifyStore.handleGetTokens(router.currentRoute.value.query.code);
    }

    const client = new Client({ token: { clientID: '4871b59efd5449328229b5e6b51bc393', clientSecret: 'efcc186afead49b58c7ea5a8d6610bc3' } }) 
    const device_id = await client.tracks.get('id')
    console.log(device_id);
  })
</script>
