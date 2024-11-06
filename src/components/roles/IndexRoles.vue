<template>
    <v-btn v-if="can('role', 'add')" class="add-btn" @click="handleAddRole">{{ $t('AddRole') }}</v-btn>
    <v-data-table style="width: 3000px;" class="centerlize" :headers="headers" :items="storeRole.roles"
        density="compact" item-key="name">
        <template v-slot:[`item.permisions.user`]="{ item }">
            <div>
                {{ item.permisions.user.join(' , ') }}
            </div>
        </template>
        <template v-slot:[`item.permisions.admin`]="{ item }">
            <div>
                {{ item.permisions.admin.join(' , ') }}
            </div>
        </template>
        <template v-slot:[`item.permisions.role`]="{ item }">
            <div>
                {{ item.permisions.role.join(' , ') }}
            </div>
        </template>
        <template v-slot:[`item.permisions.permisions`]="{ item }">
            <div>
                {{ item.permisions.permisions.join(' , ') }}
            </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex justify-space-around flex-wrap pa-2 ml-30">
                <v-btn v-if="can('role', 'access')" class="ma-2" @click="showRole(item)" color="green-lighten-1"
                    size="33px" icon="mdi-eye"></v-btn>
                <v-btn v-if="can('role', 'edit')" class="ma-2" @click="editRole(item)" color="green-lighten-1"
                    size="33px" icon="mdi-pencil"></v-btn>
                <v-btn v-if="can('role', 'delete')" class="ma-2" @click="handleDeleteRole(item.id)"
                    color="orange-lighten-1" size="33px" icon="mdi-delete"></v-btn>
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
import { usePolicy } from '@/composables/usePolicy';
const { can } = usePolicy();
const storeRole = useRoleStore()

const { t } = useI18n(); // Access the translation function

const headers = computed(() => [
    { title: t('ID'), align: 'center', key: 'id' },
    { title: t('En_Name'), align: 'center', key: 'en_name' },
    { title: t('Ar_Name'), align: 'center', key: 'ar_name' },
    {
        title: t('Permisions'), align: 'center', key: 'Permisions'
        , children: [
            { title: t('Users'), align: 'center', key: 'permisions.user' },
            { title: t('Admins'), align: 'center', key: 'permisions.admin' },
            { title: t('RolesLable'), align: 'center', key: 'permisions.role' },
            { title: t('Permisions'), align: 'center', key: 'permisions.permisions' },
        ]
    },
    { title: t('Actions'), align: 'center', key: 'actions', width: '200px' }
])
const openShowDialog = ref(false)
const openAddDialog = ref(false)
const openEditDialog = ref(false)
const role = ref(null)
const showRole = (item) => {
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
