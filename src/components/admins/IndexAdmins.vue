<template>
    <v-btn v-if="can(userRole, 'admin', 'add')" class="add-btn" @click="addAdmin">{{ $t('AddAdmin') }}</v-btn>
    <v-data-table class="centerlize" :headers="headers" :items="storeAdmin.admins" density="compact" item-key="name">
        <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex justify-space-around flex-wrap pa-2 ml-30">
                <v-btn v-if="can(userRole, 'admin', 'access')" class="ma-2" color="green-lighten-1"
                    @click="showAdmin(item)" size="33px" icon="mdi-eye"></v-btn>
                <v-btn v-if="can(userRole, 'admin', 'edit')" class="ma-2" color="green-lighten-1" size="33px"
                    @click="editAdmin(item)" icon="mdi-pencil"></v-btn>
                <v-btn v-if="can(userRole, 'admin', 'delete')" class="ma-2" color="orange-lighten-1"
                    @click="handleDeleteAdmin(item.id)" size="33px" icon="mdi-delete"></v-btn>
            </div>
        </template>
    </v-data-table>
    <div v-if="openShowDialog">
        <ShowAdmin :admin="admin" @handleCloseDialog="handleCloseDialog" />
    </div>
    <div v-if="openAddDialog">
        <AddAdmin @handleCloseDialog="handleCloseDialog" />
    </div>
    <div v-if="openEditDialog">
        <EditAdmin :admin="admin" @handleCloseDialog="handleCloseDialog" />
    </div>

</template>


<script setup>


import { computed, ref } from 'vue';
import { useAdminStore } from '@/stores/storeAdmin';
import ShowAdmin from './ShowAdmin.vue';
import AddAdmin from './AddAdmin.vue';
// import handleDeleteUser from './DeleteUser.vue'
import { useI18n } from 'vue-i18n';
import Swal from 'sweetalert2';
import EditAdmin from './EditAdmin.vue';
import { usePolicy } from '@/composables/usePolicy';
const { can } = usePolicy();
const userRole = 'permisions'
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

const openShowDialog = ref(false);
const openAddDialog = ref(false);
const openEditDialog = ref(false);
const admin = ref({})
const showAdmin = (item) => {
    openShowDialog.value = true;
    admin.value = item
}

const handleCloseDialog = () => {
    openShowDialog.value = false;
    openAddDialog.value = false;
    openEditDialog.value = false;
}

const addAdmin = () => {
    openAddDialog.value = true
}

const editAdmin = (item) => {
    openEditDialog.value = true;
    admin.value = item
}

const handleDeleteAdmin = (id) => {
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
    }).then((result) => {
        if (result.isConfirmed) {
            storeAdmin.deleteAdmin(id);
            swalWithBootstrapButtons.fire({
                title: t('ConfirmTitle'),
                text: t('ConfirmBodyAdmin'),
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
