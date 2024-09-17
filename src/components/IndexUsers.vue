<template>
    <v-btn class="add-btn" @click="router.push('/add_user')">add user</v-btn>
    <v-data-table :headers="headers" :items="userStore.users" density="compact" item-key="name">
        <template v-slot:item.actions="{ item }">
            <div class="d-flex justify-space-around flex-wrap pa-2 ml-30">
                <v-btn class="ma-2" @click="showUser(item)" color="green-lighten-1" size="33px" icon="mdi-eye"></v-btn>
                <v-btn class="ma-2" @click="editUser(item)" color="green-lighten-1" size="33px"
                    icon="mdi-pencil"></v-btn>
                <v-btn class="ma-2" color="orange-lighten-1" size="33px" icon="mdi-delete"></v-btn>
            </div>
        </template>
    </v-data-table>

    <div v-if="openShowDialog">
        <ShowUser :user="user" @handleCloseDialog="handleCloseDialog" />
    </div>
    <div v-if="openEditDialog">
        <EditUser :user="user" @handleEditDialog="handleEditDialog" />
    </div>
</template>


<script setup>

import { useUserStore } from '@/stores/storeUser';
import ShowUser from './ShowUser.vue';
import EditUser from './EditUser.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()



const userStore = useUserStore();
// console.log(userStore.users[0].id);

const headers = ref([
    { title: 'name', align: 'center', key: 'fullName' },
    { title: 'email', align: 'center', key: 'email' },
    { title: 'phone', align: 'center', key: 'phoneNumber' },
    { title: 'actions', align: 'center', key: 'actions' }
])

const openShowDialog = ref(false);
const openEditDialog = ref(false);

const user = ref(null);

const showUser = (item) => {
    openShowDialog.value = true;
    user.value = item;
    // console.log(id);

}

const editUser = (item) => {
    openEditDialog.value = true;
    user.value = item;
}
// console.log(userStore.users);

const handleCloseDialog = () => {
    openShowDialog.value = false;
}
const handleEditDialog = () => {
    openEditDialog.value = false;
}

</script>


<style>
.add-btn {
    float: left;


}
</style>