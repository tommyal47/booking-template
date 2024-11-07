<script setup lang="ts">
import { setCookie } from "@/services/cookies";
const saveAuth = () => {
    setCookie('auth', true, 1)
}
const roleString = [{
    id: 1,
    en_name: 'admin',
    ar_name: 'مدير',
    permisions: {
        user: ['access'],
        admin: ['access'],
        role: ['access'],
        permisions: ['access']
    }
}]
import {
    GoogleSignInButton,
    type CredentialResponse,
} from "vue3-google-signin";

// handle success event
const handleLoginSuccess = (response: CredentialResponse) => {
    const { credential } = response;
    saveAuth()
    localStorage.setItem('role', JSON.stringify(roleString))
    window.location.href = '/'
    console.log("Access Token", credential);
};

// handle an error event
const handleLoginError = () => {
    console.error("Login failed");
};
</script>

<template>
    <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError"></GoogleSignInButton>
</template>
