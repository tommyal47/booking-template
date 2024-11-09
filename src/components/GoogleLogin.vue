<script setup lang="ts">
import { useRoleStore } from "@/stores/storeRole";
import { setCookie } from "@/services/cookies";
const saveAuth = () => {
    setCookie('auth', true, 1)
}
const role = useRoleStore().getRoleData('vesitor')
import {
    GoogleSignInButton,
    type CredentialResponse,
} from "vue3-google-signin";

// handle success event
const handleLoginSuccess = (response: CredentialResponse) => {
    const { credential } = response;
    saveAuth()
    localStorage.setItem('role', JSON.stringify(role))
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
