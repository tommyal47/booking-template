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

// let token = null;
// handle success event
const handleLoginSuccess = (response: CredentialResponse) => {
    const { credential } = response;
    // token = credential

    saveAuth()
    localStorage.setItem('role', JSON.stringify(role))
    localStorage.setItem('token', credential)
    localStorage.setItem('token', credential)
    window.location.href = '/'
    console.log("Access Token", credential);
};

// handle an error event
const handleLoginError = () => {
    console.error("Login failed");
};


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

</script>

<template>
    <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError"></GoogleSignInButton>
</template>
