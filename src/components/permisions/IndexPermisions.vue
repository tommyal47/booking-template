<template>
    <v-btn v-if="can('permisions', 'add')" class="add-btn" @click="handleAddPermision">{{ $t('AddPermision') }}</v-btn>
    <v-data-table class="centerlize" :headers="headers" :items="storPermisions.permisions" density="compact"
        item-key="name">
        <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex justify-space-around flex-wrap pa-2 ml-30">
                <v-btn v-if="can('permisions', 'access')" class="ma-2" @click="showPermision(item)"
                    color="green-lighten-1" size="33px" icon="mdi-eye"></v-btn>
                <v-btn v-if="can('permisions', 'edit')" class="ma-2" @click="editPermision(item)" color="green-lighten-1"
                    size="33px" icon="mdi-pencil"></v-btn>
                <v-btn v-if="can('permisions', 'delete')" class="ma-2" @click="handleDeletePermision(item.id)"
                    color="orange-lighten-1" size="33px" icon="mdi-delete"></v-btn>
            </div>
        </template>
    </v-data-table>

    <div v-if="openShowDialog">
        <ShowPermision :permision="permision" @handleCloseDialog="handleCloseDialog" />
    </div>
    <div v-if="openAddDialog">
        <AddPermision @handleAddDialog="handleAddDialog" />
    </div>
    <div v-if="openEditDialog">
        <EditPermision :permision="permision" @handleEditDialog="handleEditDialog" />
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePermisionStore } from '@/stores/storePermisions';
import ShowPermision from './ShowPermision.vue';
import AddPermision from './AddPermision.vue';
import EditPermision from './EditPermision.vue';

import Swal from 'sweetalert2';

import { usePolicy } from '@/composables/usePolicy';
const { can } = usePolicy();

const storPermisions = usePermisionStore()

const { t } = useI18n(); // Access the translation function

const headers = computed(() => [
    { title: t('ID'), align: 'center', key: 'id' },
    { title: t('En_Name'), align: 'center', key: 'en_name' },
    { title: t('Ar_Name'), align: 'center', key: 'ar_name' },
    { title: t('Actions'), align: 'center', key: 'actions', width: '200px'}
])
const openShowDialog = ref(false)
const openAddDialog = ref(false)
const openEditDialog = ref(false)
const permision = ref(null)
const showPermision = (item) => {
    openShowDialog.value = true
    permision.value = item
}
const editPermision = (item) => {
    openEditDialog.value = true
    permision.value = item
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

const handleAddPermision = () => {
    openAddDialog.value = true
}


const handleDeletePermision = (id) => {
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
            storPermisions.deletePermission(id)
            swalWithBootstrapButtons.fire({
                title: t('ConfirmTitle'),
                text: t('ConfirmBodyPermision'),
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
