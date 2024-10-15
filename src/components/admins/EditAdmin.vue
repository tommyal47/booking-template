<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" persistent>
            <v-row align:center justify="center" dense>
                <v-col cols="12" md="6">
                    <v-card class="mx-auto" width="400" prepend-icon="" :title="$t('EditAdmin')"
                        :subtitle="$t('ID') + ': ' + admin.id">
                        <v-card-item>
                            {{ $t('Name') }}: {{ admin.fullName }}
                        </v-card-item>
                        <v-card-item>
                            {{ $t('Email') }}: {{ admin.email }}
                        </v-card-item>
                        <v-text-field v-model="admin.phoneNumber" clearable type="number" :label="$t('Phone')"
                            variant="solo" :rules="[phoneRules]"></v-text-field>
                        <v-select v-model="admin.role" :items="allRoles" :label="$t('Role')" variant="solo"
                            :rules="[roleRules]"></v-select>
                        <v-btn class="mt-2" type="submit" @click="submit" block>{{ $t('Submit') }}</v-btn>
                        <v-btn class="mt-2" @click="$emit('handleCloseDialog')" block>{{ $t('Cancel') }}</v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoleStore } from '@/stores/storeRole';
import { useAdminStore } from '@/stores/storeAdmin';
import { useI18n } from 'vue-i18n';
import Swal from 'sweetalert2';

const { t } = useI18n()
const storeAdmin = useAdminStore()
const storeRole = useRoleStore()
const dialog = ref(true);
const emit = defineEmits(['handleCloseDialog'])
const props = defineProps({
    admin: {
        type: Object,
        required: true
    }
})

const allRoles = ref([])
const phoneRules = computed(() => {
    if (props.admin.phoneNumber?.length === 11) return true

    return t('errors.phonenumber')
});
const roleRules = computed(() => {
    if (props.admin.role) return true

    return t('errors.role')
})


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

const submit = () => {
    if (props.admin.phoneNumber && props.admin.role) {
        storeAdmin.editAdmin(props.admin)
        emit('handleCloseDialog')
        Toast.fire({
            icon: 'success',
            title: t('SucessEditAdmin')
        })
    }
}
onMounted(() => {
    allRoles.value = storeRole.roles.map(r => r.en_name); // Use map to create a new array
});

</script>