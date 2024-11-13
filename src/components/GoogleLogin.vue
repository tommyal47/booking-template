<script setup lang="ts">
import { useRoleStore } from "@/stores/storeRole";
import { setCookie } from "@/services/cookies";
import Swal from 'sweetalert2';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
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
    // Use the access token to retrieve user profile data
    fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
            Authorization: `Bearer ${response}`
        }
    })
        .then(response => response.json())
        .then(data => {
            // Extract the desired user profile information (e.g., name, email)
            console.log('User profile:', data);
            localStorage.setItem('profile', data)
            localStorage.setItem('dede', 'data')
            // Use the information as needed (e.g., display on your website, store securely)
        })

    localStorage.setItem('role', JSON.stringify(role))
    localStorage.setItem('token', credential)
    Toast.fire({
        icon: "success",
        title: t('SuccessLogin')
    });
    setTimeout(() => {
        // localStorage.setItem('auth', true)
        saveAuth()
        window.location.href = '/'
    }, 1000)
};

// handle an error event
const handleLoginError = () => {
    Toast.fire({
        icon: "error",
        title: t('errors.login')
    });
};


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    localStorage.setItem('dede', 'data');
}

</script>

<template>
    <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError">
    </GoogleSignInButton>
</template>
