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
    <!-- <div>
        <v-alert class="alert-error" color="red" type="error" density="compact" icon="mdi-firework" theme="dark"
            v-model="active">
            {{ $t('errors.login') }}
        </v-alert>
    </div> -->
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

const data = {
    user_name: 'admin',
    user_password: '12345'
}

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
        if (admin.value.userName === data.user_name && admin.value.userPassword === data.user_password) {
            const adminData = storeAdmin.getAdminData(admin.value.userName)
            console.log(adminData[0].role);
            const roleData = storeRole.getRoleData(adminData[0].role);
            const roleString = JSON.stringify(roleData);
            localStorage.setItem('role', roleString)

            Toast.fire({
                icon: "success",
                title: t('SuccessLogin')
            });
            setTimeout(() => {
                localStorage.setItem('auth', true)
                window.location.href = '/users'
            }, 1000)
            // localStorage.setItem('auth', true)
            // window.location.href = '/users'
        } else {
            active.value = true
            Toast.fire({
                icon: "error",
                title: t('errors.login')
            });
            // setTimeout(() => {
            //     active.value = false
            // }, 3000)
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