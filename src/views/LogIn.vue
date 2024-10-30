<template>
    <NavBar />
    <v-sheet class="mx-auto" width="300">
        <v-form @submit.prevent="logIn">
            <v-text-field v-model="admin.userName" :rules="[nameRules]" :label="$t('UserNAme')"
                variant="solo"></v-text-field>
            <v-text-field autocomplete v-model="admin.userPassword" :rules="[passwordRules]" :label="$t('Password')"
                type="password" variant="solo"></v-text-field>

            <v-btn class="mt-2" :text="$t('Login')" type="submit" block></v-btn>
        </v-form>
    </v-sheet>
</template>


<script setup>

import { ref, computed } from 'vue'
import NavBar from '@/layouts/components/NavBar.vue';
import { useI18n } from 'vue-i18n';
import Swal from 'sweetalert2';
const { t } = useI18n()
import { useAdminStore } from '@/stores/storeAdmin';
import { useRoleStore } from '@/stores/storeRole';

const storeRole = useRoleStore()
const storeAdmin = useAdminStore()

const admin = ref({})
const active = ref(false)


const nameRules = computed(() => {
    if (admin.value.userName) return true

    return t('errors.username')
})

const passwordRules = computed(() => {
    if (admin.value.userPassword) return true

    return t('errors.password')
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

const logIn = () => {
    if (admin.value.userName && admin.value.userPassword) {
        const index = storeAdmin.admins.findIndex((a) => a.fullName === admin.value.userName)
        const adminData = storeAdmin.admins[index]
        if (admin.value.userName === adminData.fullName && admin.value.userPassword === adminData.password) {
            const adminData = storeAdmin.getAdminData(admin.value.userName)
            const roleData = storeRole.getRoleData(adminData[0].role);
            const roleString = JSON.stringify(roleData);
            localStorage.setItem('role', roleString)

            Toast.fire({
                icon: "success",
                title: t('SuccessLogin')
            });
            setTimeout(() => {
                localStorage.setItem('auth', true)
                window.location.href = '/'
            }, 1000)
        } else {
            active.value = true
            Toast.fire({
                icon: "error",
                title: t('errors.login')
            });
        }
    }
}

</script>

<style>
.alert-error {
    margin-left: 0%;
    position: absolute;
    margin-top: -320px;
}

.v-alert__content {
    padding-right: 36px;
}
</style>