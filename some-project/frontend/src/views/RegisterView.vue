<template>
   <div class="bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-100 flex justify-center h-screen w-screen items-center">
      <form @submit.prevent="handleRegister" class="w-full md:w-1/2 flex flex-col items-center" autocomplete="off" >
          <h1 class="text-center text-2xl font-bold text-neutral-600 mb-6">REGISTER</h1>
          <div class="w-3/4 mb-6">
              <input type="text" name="fullname" id="name" class="w-full py-4 px-8 bg-neutral-200 dark:bg-neutral-600 placeholder:font-semibold rounded hover:ring-1 outline-blue-500" placeholder="Full name" v-model="form.fullname" />
          </div>
          <div class="w-3/4 mb-6">
              <input type="email" name="email" id="email" class="w-full py-4 px-8 bg-neutral-200 dark:bg-neutral-600 placeholder:font-semibold rounded hover:ring-1 outline-blue-500" placeholder="E-mail" v-model="form.email" />
          </div>
          <div class="w-3/4 mb-6">
              <input type="password" name="password" id="password" class="w-full py-4 px-8 bg-neutral-200 dark:bg-neutral-600 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 " placeholder="Password" v-model="form.password" />
          </div>
          <div class="w-3/4 mb-6">
              <input type="password" name="confirm_password" id="confirm_password" class="w-full py-4 px-8 bg-neutral-200 dark:bg-neutral-600 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 " placeholder="Confirm Password" v-model="form.password_confirmation" />
          </div>
          <div class="w-3/4 mt-4">
              <button type="submit" class="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700">REGISTER</button>
          </div>
          <div class="w-3/4 mt-2 flex items-center gap-2">
            <span class="text-neutral-900 dark:text-neutral-100">Already have an account?</span>
            <RouterLink :to="{ name: 'login' }" class="hover:text-blue-600 hover:underline dark:text-neutral-100 text-neutral-900">Login Now</RouterLink>
          </div>
      </form>
   </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  import { UserForCreate } from '../components/models';
  import useAuthStore from '../stores/auth.store';

  const router = useRouter();
  const auth = useAuthStore();
  const form = ref<UserForCreate>({
    fullname: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleRegister = async () => {
    if (!form.value.email && !form.value.fullname && !form.value.password) {
      return
    }

    await auth.handleRegister(form.value);
    router.push({ name: 'home' });
  }
</script>
