<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar color="green-darken-1" title="Application bar">
            <v-btn style="margin-right: -400px;" @click="changeLanguage" icon="mdi-translate" rounded="shaped"></v-btn>
            <v-btn class="log-btn" @click="handleLogout">logout</v-btn>
        </v-app-bar>
    </v-layout>
</template>

<script setup>
const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
}

const changeLanguage = () => {
    console.log('change language');
    
}

</script>