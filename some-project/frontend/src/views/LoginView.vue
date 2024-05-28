<template>
   <div class="bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-100 flex justify-center h-screen w-screen items-center">
      <form class="w-full md:w-1/2 flex flex-col items-center" @submit.prevent="handleLogin" autocomplete="off" >
          <h1 class="text-center text-2xl font-bold text-neutral-600 mb-6">LOGIN</h1>
          <div class="w-3/4 mb-6">
              <input type="email" name="email" id="email" class="w-full py-4 px-8 bg-neutral-200 dark:bg-neutral-600 placeholder:font-semibold rounded hover:ring-1 outline-blue-500" placeholder="User Name" v-model="form.email" autocomplete="off" />
          </div>
          <div class="w-3/4 mb-6">
              <input type="password" name="password" id="password" class="w-full py-4 px-8 bg-neutral-200 dark:bg-neutral-600 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 " placeholder="Password" v-model="form.password" autocomplete="off" />
          </div>
          <div class="w-3/4 mt-4">
              <button :disabled="btn_state" type="submit" class="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700">LOGIN</button>
          </div>
          <div class="w-3/4 mt-2 flex items-center gap-2">
            <span class="text-neutral-900 dark:text-neutral-100">Don't have an account?</span>
            <RouterLink :to="{ name: 'register' }" class="hover:text-blue-600 hover:underline dark:text-neutral-100 text-neutral-900">Register Now</RouterLink>
          </div>
      </form>
   </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  import { UserForLogin } from '../components/models';
  import useAuthStore from '../stores/auth.store';

  const btn_state = ref(false);
  const router = useRouter();
  const auth = useAuthStore();
  const form = ref<UserForLogin>({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    btn_state.value = true;
    if (!form.value.email && !form.value.name && !form.value.password) {
      btn_state.value = false;
      return
    }

    await auth.handleLogin(form.value);
    btn_state.value = false;
    router.push({ name: 'home' });
  }

  onMounted(async () => {
    await auth.getCSRFToken();
  })
</script>
