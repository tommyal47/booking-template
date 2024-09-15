<template>
    <v-data-table :headers="headers" :items="userStore.users" density="compact" item-key="name"></v-data-table>
    <v-btn @click="router.push('/add_user')">back</v-btn>
</template>


<script setup>

import { useUserStore } from '@/stores/storeUser';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()


const userStore = useUserStore();
const headers = ref([
    { title: 'name', align: 'center', key: 'fullName' },
    { title: 'email', align: 'center', key: 'email' },
    { title: 'phone', align: 'center', key: 'phoneNumber' },
])

console.log(userStore.users);

</script>
