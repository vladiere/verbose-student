<template>
   <div class="h-full w-full flex justify-center items-center">
      <div class="w-full md:w-1/2 flex flex-col items-center gap-5" autocomplete="off" >
        <h1 class="text-center text-2xl font-bold text-neutral-600 mb-6">ADD NEW TODO</h1>
        <div class="flex flex-col gap-3 w-full">
          <label for="name" class="text-2xl font-semibold">Name</label>
          <input type="text" name="name" id="name" class="w-full py-4 px-8 bg-neutral-200 dark:bg-neutral-600 placeholder:font-semibold rounded hover:ring-1 outline-blue-500" placeholder="Input name" v-model="form.name" />
        </div>
        <div class="flex flex-col gap-3 w-full">
          <label for="name" class="text-2xl font-semibold">Description</label>
          <textarea rows="4" name="description" id="description" class="w-full py-4 px-8 bg-neutral-200 dark:bg-neutral-600 placeholder:font-semibold rounded hover:ring-1 outline-blue-500" placeholder="Input description" v-model="form.description" >
          </textarea>
        </div>
        <button @click="handleCreateTodo" type="button" class="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700 mt-4">ADD</button>
      </div>
   </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';

  import { ThingsForCreate } from '../components/models';
  import ToastComponent from '../components/toast';
  import useUserStore from '../stores/user.store';

  const user = useUserStore();
  const form = ref<ThingsForCreate>({
    name: '',
    description: '',
    id: user.getUserId,
  });

  const handleCreateTodo = async () => {
    try {
      if (!form.value.name && !form.value.description) {
        return;
      }
      
      const response = await axios.post('/api/add', form.value);
      if (response.data.success) {
        form.value.name = '';
        form.value.description = '';
        
        new ToastComponent('Successfully created todo', 'top-right').success();
      }
    } catch (error) {
      console.error(error);
    }
  }
  
</script>
