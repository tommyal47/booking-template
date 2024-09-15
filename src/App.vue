<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useLoggedIn } from './use/useLoggedIn';

const loggedIn = useLoggedIn()
// console.log(loggedIn.logged.value);
// loggedIn.toggleLogin()
// console.log(loggedIn.logged.value);


</script>

<template>
  <v-btn v-if="loggedIn.logged.value">logout</v-btn>
  <RouterView />
</template>
