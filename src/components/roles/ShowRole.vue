<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" persistent>
            <v-row align:center justify="center" dense>
                <v-col cols="12" md="6">
                    <v-card class="mx-auto" width="400" prepend-icon="" title="User data"
                        :subtitle="$t('ID') + ': ' + role.id">
                        <v-card-item>
                            {{ $t('En_Name') }}: {{ role.en_name }}
                        </v-card-item>
                        <v-card-item>
                            {{ $t('Ar_Name') }}: {{ role.ar_name }}
                        </v-card-item>
                        <v-card-item>
                            {{ 'permisions' }}:
                            <div class="ma-1" v-for="m in storeRole.modules" :key="m">

                                <v-chip variant="outlined" color="green">{{ m }}:</v-chip>
                                <div v-if="role.permisions[m]">
                                    <v-chip v-for="permission in role.permisions[m]" :key="permission" color="secondary"
                                        class="ma-1">
                                        {{ permission }}
                                    </v-chip>
                                </div>
                            </div>
                        </v-card-item>
                        <template v-slot:actions>
                            <v-btn class="ms-auto" :text="$t('Close')" @click="$emit('handleCloseDialog')"></v-btn>
                        </template>
                    </v-card>
                </v-col>
            </v-row>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useRoleStore } from '@/stores/storeRole';
const storeRole = useRoleStore()

const dialog = ref(true)

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    role: {
        type: Object,
        required: true
    }
})

defineEmits(['handleCloseDialog'])
</script>