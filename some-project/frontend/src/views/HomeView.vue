<template>
  <div v-if="!router.currentRoute.value.query.edit">
    <div class="h-full grow overflow-y-auto flex flex-col">
      <div class="h-full grow overflow-y-scroll">
        <div class="grid grid-cols-4 gap-5">
          <ThingsCardComponent v-for="(item, index) in things" :key="index" v-bind="item" @modal-state="modalState" />
        </div>
      </div>
    </div>
    <ModalComponent v-if="show" @modal-state="modalState" :id="id" />
  </div>

  <div v-else class="h-full w-full flex justify-center items-center grow overflow-y-scroll py-8">
      <div v-if="!showEdit" class="w-full md:w-1/2 flex flex-col items-center gap-5" autocomplete="off" >
        <h1 class="text-center text-2xl font-bold text-neutral-600 mb-6">UPDATE TODO</h1>
        <div class="flex flex-col gap-3 w-full">
          <label for="name" class="text-2xl font-semibold">Name</label>
          <input type="text" name="name" id="name" class="w-full py-4 px-8 bg-neutral-200 dark:bg-neutral-600 placeholder:font-semibold rounded hover:ring-1 outline-blue-500" placeholder="Input name" v-model="thing.name" />
        </div>
        <div class="flex flex-col gap-3 w-full">
          <label for="name" class="text-2xl font-semibold">Description</label>
          <textarea rows="4" name="description" id="description" class="w-full py-4 px-8 bg-neutral-200 dark:bg-neutral-600 placeholder:font-semibold rounded hover:ring-1 outline-blue-500" placeholder="Input description" v-model="thing.description" >
          </textarea>
        </div>
        <div class="flex flex-col gap-3 w-full">
          <span class="text-2xl font-semibold text-neutral-900 dark:text-white">Status</span>
          <ul class="items-center w-full text-sm font-medium text-neutral-900 bg-white border border-neutral-200 rounded sm:flex dark:bg-neutral-700 dark:border-neutral-600 dark:text-white">
              <li class="w-full border-b border-neutral-200 sm:border-b-0 sm:border-r dark:border-neutral-600">
                  <div class="flex items-center ps-3">
                      <input id="horizontal-list-radio-license" type="radio" v-model="thing.status" value="active" name="status" class="w-4 h-4 text-blue-600 bg-neutral-100 border-neutral-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-neutral-700 dark:focus:ring-offset-neutral-700 focus:ring-2 dark:bg-neutral-600 dark:border-neutral-500">
                      <label for="horizontal-list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-neutral-900 dark:text-neutral-300">Active</label>
                  </div>
              </li>
              <li class="w-full dark:border-neutral-600">
                  <div class="flex items-center ps-3">
                      <input id="horizontal-list-radio-passport" type="radio" v-model="thing.status" value="done" name="status" class="w-4 h-4 text-blue-600 bg-neutral-100 border-neutral-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-neutral-700 dark:focus:ring-offset-neutral-700 focus:ring-2 dark:bg-neutral-600 dark:border-neutral-500">
                      <label for="horizontal-list-radio-passport" class="w-full py-3 ms-2 text-sm font-medium text-neutral-900 dark:text-neutral-300">Done</label>
                  </div>
              </li>
          </ul>
        </div>

        <button :disabled="btn_state" @click="handleUpdate" type="button" class="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700 mt-4">SAVE CHANGES</button>
      </div>
      <LoaderComponent v-else />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, defineAsyncComponent, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';

  import { Things } from '../components/models';
  import ThingSkeletonComponent from '../components/ThingSkeletonComponent.vue';
  import ToastComponent from '../components/toast';
  import ModalComponent from '../components/ModalComponent.vue';
  import LoaderComponent from '../components/LoaderComponent.vue';
  import useAuthStore from '../stores/auth.store';
  import useUserStore from '../stores/user.store';

  const ThingsCardComponent  = defineAsyncComponent({
    loader: () => import('../components/ThingsCardComponent.vue'),
    loadingComponent: ThingSkeletonComponent,
    delay: 500,
    timeout: 2300,
    suspensible: true,
  });

  const showEdit = ref(false);
  const btn_state = ref(false);
  const router = useRouter();
  const auth = useAuthStore();
  const user = useUserStore();
  const things = ref<Things[]>([]);
  const thing = ref<Things>({
    id: 0,
    name: '',
    description: '',
    status: 'active',
    created_at: '',
    updated_at: '',
  });
  const show = ref(false);
  const id = ref(0);

  const getThings = async () => {
    things.value = [];

    try {
      const response = await axios.get(`/api/todos/${user.getUserId}`);
      things.value = response.data;
    } catch (error) {
      console.error(error)
    }
  }

  const filterThings = async (filter) => {
    try {
      const response = await axios.get(`/api/filter/${filter}`);
      things.value = response.data;
    } catch (error) {
      console.error(error);
    }
  }

  const getOneThing = async (id) => {
    try {
      const response = await axios.get(`/api/todo/${id}`);
      thing.value = response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  const modalState = async (data) => {
    id.value = data.id;
    if (data.confirm) {
      await handleRemove({ id: id.value });
      show.value = data.state;
    } else {
      show.value = data.state;
    }
  }

  const handleRemove = async (data) => {
    try {
      const response = await axios.post('/api/remove', data);
      if (response.data.success) {
        new ToastComponent('Successfully removed todo', 'top-right').success();
        await getThings();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdate = async () => {
    try {
      const response = await axios.post('/api/update', thing.value);
      if (response.data.stats) {
        btn_state.value = true;
        new ToastComponent('Todo updated', 'top-right').success();
        await getThings();
      }
    } catch (error) {
      console.error(error);
    }
  }

  onMounted(async () => {
    await getThings();

    if (router.currentRoute.value.query.edit) {
      await getOneThing(router.currentRoute.value.query.id);
    } else {
      thing.value.id = 0;
      thing.value.name = '';
      thing.value.description = '';
      thing.value.created_at = '';
      thing.value.updated_at = '';
    }
  })

  watch(router.currentRoute, async (newVal, oldVal) => {
    if (newVal.query.edit) {
      await getOneThing(newVal.query.id);
    } else if (newVal.query.filter) {
      await filterThings(newVal.query.filter);
    } else {
      await getThings();
      btn_state.value = false;
      thing.value.id = 0;
      thing.value.name = '';
      thing.value.description = '';
      thing.value.created_at = '';
      thing.value.updated_at = '';
    }
  });
</script>
