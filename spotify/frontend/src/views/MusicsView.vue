<template>
  <div class="grid sm:grid-cols-3 lg:grid-cols-5 gap-5 p-5 ">
    <SongComponent v-for="(item, index) in savedTracks" :key="index" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, onBeforeUnmount, onMounted } from 'vue';

  import { Tracks } from '../components/models';
  import useSongStore from '../stores/song.store';
  import useSpotifyStore from '../stores/spotify.store';
  import SongComponent from '../components/SongComponent.vue';

  const songStore = useSongStore();
  const spotifyStore = useSpotifyStore();
  const savedTracks = computed<Tracks>(() => {
    return songStore.getUserPlaylist;
  })
  const player = ref(null);

  onMounted(async () => {
    await songStore.fetchCurrentUser();
    await songStore.fetchUserPlaylist(50, 1);
//    await songStore.fetchDevices();

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      player.value = new Spotify.Player({
        name: 'Spotify Player',
        getOAuthToken: cb => { cb(spotifyStore.getAccessToken); },
        volume: 0.5
      });

      player.value.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        songStore.setDeviceId(device_id);
      });

      player.value.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.value.connect();
    };
  });
</script>
