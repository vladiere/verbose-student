<template>
  <div class="grid sm:grid-cols-3 lg:grid-cols-5 gap-5 p-5 ">
    <SongComponent v-for="(item, index) in savedTracks" :key="index" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, onBeforeUnmount, onMounted } from 'vue';

  import { Tracks } from '../components/models';
  import useSongStore from '../stores/song.store';
  import SongComponent from '../components/SongComponent.vue';

  const songStore = useSongStore();
  const savedTracks = computed<Tracks>(() => {
    return songStore.getUserPlaylist;
  })

  onMounted(async () => {
    await songStore.fetchCurrentUser();
    await songStore.fetchUserPlaylist(20, 1);
    await songStore.fetchDevices();

    console.log(savedTracks.value);
  });
</script>
