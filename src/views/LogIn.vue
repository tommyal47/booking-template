<template>
    <v-sheet class="mx-auto" width="300">
        <v-form validate-on="submit lazy" @submit.prevent="logIn">
            <v-text-field v-model="admin.userName" :rules="[nameRules]" label="User name" variant="solo"></v-text-field>
            <v-text-field v-model="admin.userPassword" :rules="[passwordRules]" label="Password" type="password"
                variant="solo"></v-text-field>

            <v-btn class="mt-2" text="Submit" type="submit" block></v-btn>
        </v-form>
    </v-sheet>
    <div>
        <v-alert color="#2A3B4D" density="compact" icon="mdi-firework" theme="dark" v-model="active">
            Invalid username or password
        </v-alert>
    </div>
</template>


<script setup>

import { ref, computed } from 'vue'

const admin = ref({})
const active = ref(false)

const data = {
    user_name: 'admin',
    user_password: '12345'
}

const nameRules = computed(() => {
    if (admin.value.userName) return true

    return 'User name is required'
})

const passwordRules = computed(() => {
    if (admin.value.userPassword) return true

    return 'Password is required'
})

const logIn = () => {
    if (admin.value.userName === data.user_name && admin.value.userPassword === data.user_password) {
        localStorage.setItem('auth', true)
        window.location.href = '/users'
    } else {
        active.value = true
        setTimeout(() => {
            active.value = false
        }, 3000)
    }
}

</script>
