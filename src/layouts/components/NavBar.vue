<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar color="green-darken-1" title="Application bar">
            <v-btn class="log-btn" @click="handleLogout">logout</v-btn>
        </v-app-bar>
    </v-layout>
</template>

<script setup>
const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
}

</script>