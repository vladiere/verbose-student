<template>
  <div class="grid grid-cols-4 gap-5 p-5 h-full">
    <div class="grow overflow-y-auto flex flex-col gap-2 h-full">
      <div class="flex justify-between items-center">
        <span class="text-2xl font-semibold">Online Users</span>
        <button @click="leave_room" class="text-sm rounded-lg font-semibold border-2 border-neutral-400 px-2 py-1.5">Leave Room</button>
      </div>
      <div v-if="users.length !== 1" class="grow overflow-y-auto flex flex-col gap-2 h-full px-2">
        <OnlineUsersComponent v-for="(item, index) in users" :key="index" v-bind="item" />
      </div>
      <div v-else class="grow overflow-y-auto flex flex-col gap-2 h-full px-2 items-center justify-center">
        <span class="text-lg font-semibold">No users available</span>
      </div>
    </div>
    <div class="col-span-3 grow overflow-y-auto h-full">
      <ChatComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { jwtDecode } from 'jwt-decode';

  import socket from '../socket';
  import { JoinRoom, UsersJoin, UserConnect } from '../components/models';
  import { useAuthStore } from '../stores/auth.store';
  import { useSocketStore } from '../stores/socket.store';

  import OnlineUsersComponent from '../components/OnlineUsersComponent.vue';
  import ChatComponent from '../components/ChatComponent.vue';

  const socketStore = useSocketStore();
  const auth = useAuthStore();
  const router = useRouter();
  const decode = jwtDecode(auth.getAccessToken);
  const room_name = ref('');
  const user_join = ref<UsersJoin>();
  const users = ref<UserConnect[]>([]);
  const join_room = ref<JoinRoom>({
    user: {
      username: decode.username,
      socketId: socketStore.getSocketId,
      user_id: decode.user_id,
    },
    room: '',
  })

  const leave_room = () => {
    socket.emit('leave room', { user_id: decode.user_id, username: decode.username, room: room_name.value });
    router.push({ name: 'home_view' })
  }

  socket.on('user leave', data => {
    users.value = users.value.filter((item) => item.user_id !== data.user_id);
  });

  socket.on('has joined', data => {
    user_join.value = data;
  })

  onMounted(() => {
    room_name.value = router.currentRoute.value.query.q;

    join_room.value.room = room_name.value;
    socket.emit('join room', join_room.value);

    socket.on('users', data => {
      console.log(data)
      if (data.room_name === join_room.value.room) {
        users.value = data.users;
      }
    })
  })
</script>
