<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar color="green-darken-1" :title="$t('ApplicationName')">
            <v-btn :style="{ marginRight: loggedIn ? '-400px' : '20px' }" @click="changeLanguage()" icon="mdi-translate"
                rounded="shaped"></v-btn>
            <v-btn v-if="loggedIn" class="log-btn" @click="handleLogout">{{ $t('LogOut') }}</v-btn>
        </v-app-bar>
    </v-layout>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { computed, onMounted } from 'vue';
import { deleteCookie } from '@/services/cookies';
const loggedIn = computed(() => {
    return localStorage.getItem('auth') ? true : false;
})

const { locale } = useI18n();

const handleLogout = () => {
    localStorage.clear();
    deleteCookie('auth');
    window.location.href = '/login';
}

const changeLanguage = () => {
    locale.value = locale.value === 'en' ? 'ar' : 'en';
    document.documentElement.setAttribute('dir', locale.value === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('lang', locale.value);

}
onMounted(() => {
    const language = localStorage.getItem('lang');
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
})

</script>