<script setup>
// import { ref } from 'vue';
import { RouterView } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue';
import { getCookie } from './services/cookies';

// const loggedIn = ref(localStorage.getItem('auth'));
const authanticated = getCookie('auth');
console.log(authanticated);



</script>

<template>
  <MainLayout v-if="authanticated" />
  <RouterView />
</template>

<style>
.log-btn {
  margin-left: 407px;

}
</style>



<!-- <template>
  <v-app>
    <v-app-bar color="green-darken-1" :title="$t('ApplicationName')" app>
      <NavBar />
    </v-app-bar>
    <v-navigation-drawer expand-on-hover rail app>
      <SideBar />
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template> -->
