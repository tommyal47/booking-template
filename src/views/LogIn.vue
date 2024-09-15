<template>
    <v-sheet class="mx-auto" width="300">
        <v-form validate-on="submit lazy" @submit.prevent="logIn">
            <v-text-field v-model="admin.userName" :rules="[nameRules]" label="User name" variant="solo"></v-text-field>
            <v-text-field v-model="admin.userPassword" :rules="[passwordRules]" label="Password" type="password"
                variant="solo"></v-text-field>

            <v-btn class="mt-2" text="Submit" type="submit" block></v-btn>
        </v-form>
    </v-sheet>
</template>


<script setup>

import { ref, computed } from 'vue'

const admin = ref({})

const nameRules = computed(() => {
    if (admin.value.userName) return true

    return 'User name is required'
})

const passwordRules = computed(() => {
    if (admin.value.userPassword) return true

    return 'Password is required'
})

const logIn = () => {
    localStorage.setItem('auth', true)
}

</script>
