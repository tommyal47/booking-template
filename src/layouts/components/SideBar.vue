<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer expand-on-hover rail>
                <!-- <v-list>
                    <v-list-item></v-list-item>
                </v-list> -->
                <v-divider></v-divider>
                <v-list density="compact" nav class="mt-16">
                    <v-list-item color="primary" rounded="shaped" prepend-icon="mdi-home" title="Home" value="Home"
                        @click="goToHome">
                    </v-list-item>
                    <v-list-item color="primary" rounded="shaped" prepend-icon="mdi-account-multiple" title="Users"
                        value="Users" @click="goToUseres">
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-layout>
    </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router';
// import { onMounted, ref } from 'vue';

// const active = ref(true);
const router = useRouter();
const goToHome = () => {
    // Navigate to the Users page
    // active.value = true;
    // console.log(router.currentRoute.value.path);

    router.push('/');
}
const goToUseres = () => {
    // Navigate to the Users page
    // active.value = true;
    // console.log(router.currentRoute.value.path);

    router.push('/users');
}
// onMounted(() => {
//     if (router.currentRoute.value.path !== '/users') active.value = false;

// })

console.log(router.currentRoute.value);
</script>