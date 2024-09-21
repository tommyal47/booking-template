<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar color="green-darken-1" :title="$t('ApplicationName')">
            <v-btn style="margin-right: -400px;" @click="changeLanguage()" icon="mdi-translate"
                rounded="shaped"></v-btn>
            <v-btn class="log-btn" @click="handleLogout">{{ $t('LogOut') }}</v-btn>
        </v-app-bar>
    </v-layout>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
}

const changeLanguage = () => {
    locale.value = locale.value === 'en' ? 'ar' : 'en';
}

</script>