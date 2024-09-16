<template>
    <v-data-table :headers="headers" :items="userStore.users" density="compact" item-key="name">
        <template v-slot:item.actions>
            <div class="d-flex justify-space-around flex-wrap pa-2 ml-30">
                <v-btn class="ma-2" @click="showUser" color="green-lighten-1" size="33px" icon="mdi-eye"></v-btn>
                <v-btn class="ma-2" color="green-lighten-1" size="33px" icon="mdi-pencil"></v-btn>
                <v-btn class="ma-2" color="orange-lighten-1" size="33px" icon="mdi-delete"></v-btn>
            </div>
        </template>
    </v-data-table>
    <v-btn @click="router.push('/add_user')">back</v-btn>
    <div v-if="openShowDialog">
        <ShowUser @handleCloseDialog="handleCloseDialog" />
    </div>
</template>


<script setup>

import { useUserStore } from '@/stores/storeUser';
import ShowUser from './ShowUser.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()


const userStore = useUserStore();
const headers = ref([
    { title: 'name', align: 'center', key: 'fullName' },
    { title: 'email', align: 'center', key: 'email' },
    { title: 'phone', align: 'center', key: 'phoneNumber' },
    { title: 'actions', align: 'center', key: 'actions' }
])

const openShowDialog = ref(false);

const showUser = () => {
    openShowDialog.value = true;
}
console.log(userStore.users);

const handleCloseDialog = () => {
    openShowDialog.value = false;
}

</script>
