<template>
    <v-btn class="add-btn" @click="handleAddRole">{{ $t('AddRole') }}</v-btn>
    <v-data-table class="centerlize" :headers="headers" :items="storeRole.roles" density="compact" item-key="name">
        <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex justify-space-around flex-wrap pa-2 ml-30">
                <v-btn class="ma-2" @click="showUser(item)" color="green-lighten-1" size="33px" icon="mdi-eye"></v-btn>
                <v-btn class="ma-2" @click="editRole(item)" color="green-lighten-1" size="33px"
                    icon="mdi-pencil"></v-btn>
                <v-btn class="ma-2" @click="handleDeleteRole(item.id)" color="orange-lighten-1" size="33px"
                    icon="mdi-delete"></v-btn>
            </div>
        </template>
    </v-data-table>
    <div v-if="openShowDialog">
        <ShowRole :role="role" @handleCloseDialog="handleCloseDialog" />
    </div>
    <div v-if="openAddDialog">
        <AddRole :role="role" @handleAddDialog="handleAddDialog" />
    </div>
    <div v-if="openEditDialog">
        <EditRole :role="role" @handleEditDialog="handleEditDialog" />
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoleStore } from '@/stores/storeRole';
import ShowRole from './ShowRole.vue';
import AddRole from './AddRole.vue';
import EditRole from './EditRole.vue';
import Swal from 'sweetalert2';

const storeRole = useRoleStore()

const { t } = useI18n(); // Access the translation function

const headers = computed(() => [
    { title: t('ID'), align: 'center', key: 'id' },
    { title: t('En_Name'), align: 'center', key: 'en_name' },
    { title: t('Ar_Name'), align: 'center', key: 'ar_name' },
    { title: t('Actions'), align: 'center', key: 'actions' }
])
const openShowDialog = ref(false)
const openAddDialog = ref(false)
const openEditDialog = ref(false)
const role = ref(null)
const showUser = (item) => {
    openShowDialog.value = true
    role.value = item
}
const editRole = (item) => {
    openEditDialog.value = true
    role.value = item
}

const handleCloseDialog = () => {
    openShowDialog.value = false
}

const handleAddDialog = () => {
    openAddDialog.value = false
}
const handleEditDialog = () => {
    openEditDialog.value = false
}

const handleAddRole = () => {
    openAddDialog.value = true
}


const handleDeleteRole = (id) => {
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
            storeRole.deleteRole(id)
            swalWithBootstrapButtons.fire({
                title: t('ConfirmTitle'),
                text: t('ConfirmBodyRole'),
                icon: "success",
                confirmButtonText: t('Ok')
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: t('CancelledTitle'),
                text: t('CancelBody'),
                icon: "error",
                confirmButtonText: t('Ok')
            });
        }
    });
}


</script>

