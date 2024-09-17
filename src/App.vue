<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router'

const loggedIn = ref(localStorage.getItem('auth'));

const handleLogout = () => {
  localStorage.clear();
  window.location.href = '/login';
}

</script>

<template>
  <v-btn class="log-btn" v-if="loggedIn" @click="handleLogout">logout</v-btn>
  <RouterView />
</template>

<style>
.log-btn {
  margin-left: 407px;

}
</style>