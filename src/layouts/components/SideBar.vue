<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer expand-on-hover rail>
                <v-divider></v-divider>
                <v-list density="compact" nav class="mt-16">
                    <v-list-item color="primary" rounded="shaped" prepend-icon="mdi-home" :title="$t('Home')" value="Home"
                        @click="goToHome" :active="isActive('/')">
                    </v-list-item>
                    <v-list-item color="primary" rounded="shaped" prepend-icon="mdi-account-multiple" :title="$t('Users')"
                        value="Users" @click="goToUseres" :active="isActive('/users')">
                    </v-list-item>
                    <v-list-item color="primary" rounded="shaped" prepend-icon="mdi-account-key" :title="$t('RolesLable')"
                        value="Roles" @click="$router.push('/roles')" :active="isActive('/roles')">
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-layout>
    </v-card>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

// const active = ref(true);
const router = useRouter();
const route = useRoute();
const goToHome = () => {
    // Navigate to the Home page
    router.push('/');
}
const goToUseres = () => {
    // Navigate to the Users page
    router.push('/users');
}
const isActive = (routePath) => {
    return route.path === routePath
}

</script>