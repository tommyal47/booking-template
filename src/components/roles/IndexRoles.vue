<template>
    <v-btn class="add-btn" >{{ $t('AddRole') }}</v-btn>
    <v-data-table :headers="headers" :items="storeRole.roles" density="compact" item-key="name">
        <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex justify-space-around flex-wrap pa-2 ml-30">
                <v-btn class="ma-2" @click="showUser(item)" color="green-lighten-1" size="33px" icon="mdi-eye"></v-btn>
                <v-btn class="ma-2" @click="editUser(item)" color="green-lighten-1" size="33px"
                    icon="mdi-pencil"></v-btn>
                <v-btn class="ma-2" @click="handleDeleteUSer(item.id)" color="orange-lighten-1" size="33px"
                    icon="mdi-delete"></v-btn>
            </div>
        </template>
    </v-data-table>

</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoleStore } from '@/stores/storeRole';

const storeRole = useRoleStore()

const { t } = useI18n(); // Access the translation function

const headers = computed(() => [
    { title: t('ID'), align: 'center', key: 'id' },
    { title: t('En_Name'), align: 'center', key: 'en_name' },
    { title: t('Ar_Name'), align: 'center', key: 'ar_name' },
    { title: t('Actions'), align: 'center', key: 'actions' }
])

</script>