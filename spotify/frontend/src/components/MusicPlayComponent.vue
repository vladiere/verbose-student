<template>
  <div class="w-full p-3 flex items-center">
    <div class="grid grid-cols-3 items-center justify-center gap-5 w-full bg-neutral-800 p-2 rounded-lg">
      <!-- <div class="col-span-2 flex flex-col gap-2 items-center justify-center"> -->
      <!--   <span class="text-sm font-semibold">Music title</span> -->
      <!--   <div class="flex gap-2 items-center"> -->
      <!--     <button class="p-2"> -->
      <!--       <svg-icon type="mdi" :path="mdiSkipPrevious"></svg-icon> -->
      <!--     </button> -->
      <!--     <button class="p-2"> -->
      <!--       <svg-icon type="mdi" :path="`${ songStore.getIsPlaying ? mdiPause : mdiPlay }`"></svg-icon> -->
      <!--     </button> -->
      <!--     <button class="p-2"> -->
      <!--       <svg-icon type="mdi" :path="mdiSkipNext"></svg-icon> -->
      <!--     </button> -->
      <!--   </div> -->
      <!-- </div> -->
      <div class="col flex items-center justify-end">
        <!-- Volume and other utilities bar -->
        <svg-icon
          type="mdi"
          :path="currentVolume === 0 ? mdiVolumeOff : (currentVolume < 31 ? mdiVolumeLow : (currentVolume < 61 ? mdiVolumeMedium : mdiVolumeHigh))"
          class="text-white text-md mr-2"
        ></svg-icon>
        <input
          type="range"
          v-model="currentVolume"
          class="max-w-md h-1 slider"
          min="0"
          max="100"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiPlay, mdiSkipNext, mdiSkipPrevious, mdiPause, mdiVolumeMedium, mdiVolumeLow, mdiVolumeHigh, mdiVolumeOff } from '@mdi/js' 

  import useSongStore from '../stores/song.store';

  const songStore = useSongStore();

  const currentVolume = computed({
    get() {
      return songStore.getVolume;
    },
    set(payload) {
      songStore.setNewVolume(payload);
    },
  });

  const volumeIconPath = computed({
    get() { return currentVolume },
    set(val) {
      if (val === 0) {
        return mdiVolumeOff
      } else if (val < 31) {
        return mdiVolumeLow;
      } else if (val < 61) {
        return mdiVolumeMedium;
      } else {
        return mdiVolumeHigh;
      }
    }
  });

  const isPlaying = computed({
    get() { return songStore.getIsPlaying },
    set(val) {
      if (val) {
        mdiPause
      } else {
        mdiPlay
      }
    }
  })

</script>
