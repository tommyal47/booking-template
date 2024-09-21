<template>
    <v-btn class="add-btn" @click="router.push('/add-user')">{{ $t('AddUser') }}</v-btn>
    <v-data-table :headers="headers" :items="userStore.users" density="compact" item-key="name">
        <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex justify-space-around flex-wrap pa-2 ml-30">
                <v-btn class="ma-2" @click="showUser(item)" color="green-lighten-1" size="33px" icon="mdi-eye"></v-btn>
                <v-btn class="ma-2" @click="editUser(item)" color="green-lighten-1" size="33px"
                    icon="mdi-pencil"></v-btn>
                <v-btn class="ma-2" @click="handleDeleteUSer(item.id)" color="orange-lighten-1" size="33px"
                    icon="mdi-delete"></v-btn>
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
import { computed, ref } from 'vue';
import Swal from 'sweetalert2';
// import handleDeleteUser from './DeleteUser.vue'
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n(); // Access the translation function
const router = useRouter()

// const handleDelere = handleDeleteUser()

const userStore = useUserStore();
// console.log(userStore.users[0].id);

const headers = computed(() => [
    { title: t('Name'), align: 'center', key: 'fullName' },
    { title: t('Email'), align: 'center', key: 'email' },
    { title: t('Phone'), align: 'center', key: 'phoneNumber' },
    { title: t('Actions'), align: 'center', key: 'actions' }
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
    // console.log('item', item);

}
// console.log(userStore.users);

const handleCloseDialog = () => {
    openShowDialog.value = false;
}
const handleEditDialog = () => {
    openEditDialog.value = false;
}


// handle delete user
////////////////////////////////////////////////////////////////////////////////////////////////

const handleDeleteUSer = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success text-white",
            cancelButton: "btn btn-danger text-white"
        },
        buttonsStyling: true
    });
    swalWithBootstrapButtons.fire({
        title: t('DeleteQuestion'),
        text: t('DeleteDescription'),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t('DeleteConfirm'),
        cancelButtonText: t('DeleteCancel'),
        reverseButtons: true,
        // customClass: {
        //     // confirmButton: 'swal-confirm-button', // Add a custom class to the confirm button
        //     // cancelButton: 'swal-cancel-button',   // Optional: add a class to the cancel button if needed
        // },
    }).then((result) => {
        if (result.isConfirmed) {
            userStore.deleteUser(id)
            swalWithBootstrapButtons.fire({
                title: t('ConfirmTitle'),
                text: t('ConfirmBody'),
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: t('CancelledTitle'),
                text: t('CancelBody'),
                icon: "error"
            });
        }
    });
}


////////////////////////////////////////////////////////////////////////////////////////////////
</script>


<style>
.add-btn {
    float: left;


}
</style>