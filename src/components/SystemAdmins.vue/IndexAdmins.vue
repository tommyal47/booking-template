<template>
    <v-data-table :headers="headers" :items="storeAdmin.admins" density="compact" item-key="name">
        <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex justify-space-around flex-wrap pa-2 ml-30">
                <v-btn class="ma-2" color="green-lighten-1" size="33px" icon="mdi-eye"></v-btn>
                <v-btn class="ma-2" color="green-lighten-1" size="33px" icon="mdi-pencil"></v-btn>
                <v-btn class="ma-2" color="orange-lighten-1" size="33px" icon="mdi-delete"></v-btn>
            </div>
        </template>
    </v-data-table>


</template>


<script setup>


import { computed } from 'vue';
import { useAdminStore } from '@/stores/storeAdmin';
// import handleDeleteUser from './DeleteUser.vue'
import { useI18n } from 'vue-i18n';

const storeAdmin = useAdminStore()
const { t } = useI18n(); // Access the translation function

// const handleDelere = handleDeleteUser()


const headers = computed(() => [
    { title: t('Name'), align: 'center', key: 'fullName' },
    { title: t('Email'), align: 'center', key: 'email' },
    { title: t('Phone'), align: 'center', key: 'phoneNumber' },
    { title: t('Role'), align: 'center', key: 'role' },
    { title: t('Actions'), align: 'center', key: 'actions' }
])

</script>


<style>
.add-btn {
    float: left;


}
</style>