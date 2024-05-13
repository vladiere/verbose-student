<template>
  <div class="grow overflow-y-auto flex flex-col h-full">
    <div class="grow overflow-y-auto h-full p-2 flex flex-col-reverse gap-2">
      <UserDividerComponent v-bind="room_notify" />
      <div class="flex flex-col gap-2">
        <ChatBubbleComponent v-for="(item, index) in messages" :key="index" v-bind="item" />
      </div>
    </div>
    <div class="flex items-center border-t-2 border-neutral-500 py-2">
      <input class="w-full bg-transparent px-3 outline-none" placeholder="Type something..." v-model="msg.data.message" @keyup.enter="send_message" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { jwtDecode } from 'jwt-decode';
  import { useRouter } from 'vue-router';

  import socket from '../socket';
  import { useAuthStore } from '../stores/auth.store';
  import { useSocketStore } from '../stores/socket.store';
  import { SendMessage, Messages, RoomNotify } from '../components/models';
  import { timestamp } from '../utils/formatted';

  import ChatBubbleComponent from './ChatBubbleComponent.vue';
  import UserDividerComponent from './UserDividerComponent.vue';

  const auth = useAuthStore();
  const socketStore = useSocketStore();
  const decode = jwtDecode(auth.getAccessToken);
  const router = useRouter();
  
  const room_notify = ref<RoomNotify>({
    user_id: 0,
    username: '',
    message: '',
  });
  const messages = ref<Messages[]>([]);
  const msg = ref<SendMessage>({
    room: '',
    data: {
      user: {
        username: decode.username,
        socketId: socketStore.getSocketId,
        user_id: decode.user_id,
      },
      timestamp: timestamp(),
      message: '',
    }
  })

  const send_message = () => {
    if (msg.value.data.message === '') {
      return;
    }

    socket.emit('send message', msg.value);  
    msg.value.data.message = '';
  }

  socket.on('user leave', data => {
    console.log('User leave: ',data);
    room_notify.value.user_id = data.data.user_id;
    room_notify.value.username = data.data.username;
    room_notify.value.message = data.user_state;
  });

  socket.on('has joined', data => {
    console.log('User joined: ', data)
    room_notify.value.user_id = data.user.user_id;
    room_notify.value.username = data.user.username;
    room_notify.value.message = data.user_state;
  })

  onMounted(() => {
    msg.value.room = router.currentRoute.value.query.q;

    socket.emit('get messages', msg.value.room);
    socket.on('get messages', data => {
      console.log(data)
      if (data !== 0) {
        messages.value = data.data;
      }
    })
  })
</script>
