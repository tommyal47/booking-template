<template>
    <v-btn class="add-btn" @click="handleAddPermision">{{ $t('AddPermision') }}</v-btn>
    <v-data-table class="centerlize" :headers="headers" :items="storPermisions.permissions" density="compact"
        item-key="name">
        <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex justify-space-around flex-wrap pa-2 ml-30">
                <v-btn class="ma-2" @click="showPermision(item)" color="green-lighten-1" size="33px" icon="mdi-eye"></v-btn>
                <v-btn class="ma-2" @click="editPermision(item)" color="green-lighten-1" size="33px"
                    icon="mdi-pencil"></v-btn>
                <v-btn class="ma-2" @click="handleDeletePermision(item.id)" color="orange-lighten-1" size="33px"
                    icon="mdi-delete"></v-btn>
            </div>
        </template>
    </v-data-table>

</template>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePermisionStore } from '@/stores/storePermisions';

import Swal from 'sweetalert2';

const storPermisions = usePermisionStore()

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
const showPermision = (item) => {
    openShowDialog.value = true
    role.value = item
}
const editPermision = (item) => {
    openEditDialog.value = true
    role.value = item
}

// const handleCloseDialog = () => {
//     openShowDialog.value = false
// }

// const handleAddDialog = () => {
//     openAddDialog.value = false
// }
// const handleEditDialog = () => {
//     openEditDialog.value = false
// }

const handleAddPermision = () => {
    openAddDialog.value = true
}


const handleDeletePermision = () => {
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
            // storeRole.deleteRole(id)
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
