<template>
  <div class="mx-auto flex min-h-screen w-full items-center justify-center bg-neutral-900 text-white">
    <!-- component -->
    <form @submit.prevent="handleLogin" class="flex w-[30rem] flex-col space-y-10">
      <div class="text-center text-4xl font-medium">Log In</div>
      <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
        <input type="text" placeholder="Username" id="username" class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" v-model="form.username" />
      </div>
      <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500" >
        <input type="password" placeholder="Password" id="password" class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" v-model="form.password" />
      </div>
      <button class="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400" > LOG IN </button>
      <p class="text-center text-lg">
        No account?
        <RouterLink to="/register" class="font-medium text-indigo-500 underline-offset-4 hover:underline" >Create One</RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/auth.store';
  import { useToast } from 'vue-toast-notification';

  const router = useRouter()
    
  const auth = useAuthStore();
  const toast = useToast();

  const btn_state = ref(false);
  const form = ref<{
    username: string,
    password: string,
  }>({
    username: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      btn_state.value = true;

      const result = await auth.handleLogin(form.value);
      console.log(result)
      if (result.stats === 0) {
        toast.open({
          message: result.msg,
          type: 'warning',
          dismissible: true,
          position: 'top-right',
        })
        btn_state.value = false;
      } else {
        router.push({ name: 'home_view' })
      }
    } catch (error) {
      toast.open({
        message: "Something is wrong try again.",
        type: 'warning',
        dismissible: true,
        position: 'top-right',
      })
      btn_state.value = false;
    }
  }
</script>
