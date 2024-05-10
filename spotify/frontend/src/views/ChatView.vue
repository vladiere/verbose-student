<template>
  <div>
    {{ routeQuery.q }}
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const routeQuery = ref(router.currentRoute.value.query)
    
</script>
