<template>
  <div class="flex flex-col sm:w-52 md:w-52 rounded-lg overflow-hidden shadow-lg bg-neutral-800">
    <div class="w-full relative">
      <img :src="props.image" class="w-full h-56" />
      <button @click="play(props.uri)" class="absolute -bottom-4 right-2 rounded-full bg-green-500 p-2">
        <svg-icon type="mdi" :path="mdiPlay" class="text-neutral-950"></svg-icon>
      </button>
    </div>
    <div class="py-2 px-4 flex flex-col">
      <span class="text-lg font-bold">{{ props.name }}</span>
      <span class="text-sm font-semibold">
        <p v-for="(item, index) in props.artists" :key="index">
          {{ item }}
        </p>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiPlay, mdiSkipNext, mdiSkipPrevious, mdiShareVariant } from '@mdi/js' 
  import axios from 'axios';

  import { Tracks } from '../components/models';
  import { formattedString } from '../utils/formatted';
  import useSongStore from '../stores/song.store';
  import useSpotifyStore from '../stores/spotify.store';

  const spotifyStore = useSpotifyStore();
  const props = defineProps<Tracks>();
  const songStore = useSongStore();

  const play = async (uri: string) => {
    await songStore.playMusic();
  }
</script>
